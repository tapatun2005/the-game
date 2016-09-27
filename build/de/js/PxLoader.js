/*global define: true */ 

(function(global) {

    /*
     * PixelLab Resource Loader
     * Loads resources while providing progress updates.
     */
    function PxLoader(settings) {

        // merge settings with defaults
        settings = settings || {};
        this.settings = settings;

        // how frequently we poll resources for progress
        if (settings.statusInterval == null) {
            settings.statusInterval = 5000; // every 5 seconds by default
        }

        // delay before logging since last progress change
        if (settings.loggingDelay == null) {
            settings.loggingDelay = 20 * 1000; // log stragglers after 20 secs
        }

        // stop waiting if no progress has been made in the moving time window
        if (settings.noProgressTimeout == null) {
            settings.noProgressTimeout = Infinity; // do not stop waiting by default
        }

        var entries = [],
            // holds resources to be loaded with their status
            progressListeners = [],
            timeStarted, progressChanged = Date.now();

        /**
         * The status of a resource
         * @enum {number}
         */
        var ResourceState = {
            QUEUED: 0,
            WAITING: 1,
            LOADED: 2,
            ERROR: 3,
            TIMEOUT: 4
        };

        // places non-array values into an array.
        var ensureArray = function(val) {
            if (val == null) {
                return [];
            }

            if (Array.isArray(val)) {
                return val;
            }

            return [val];
        };

        // add an entry to the list of resources to be loaded
        this.add = function(resource) {

            // TODO: would be better to create a base class for all resources and
            // initialize the PxLoaderTags there rather than overwritting tags here
            resource.tags = new PxLoaderTags(resource.tags);

            // ensure priority is set
            if (resource.priority == null) {
                resource.priority = Infinity;
            }

            entries.push({
                resource: resource,
                status: ResourceState.QUEUED
            });
        };

        this.addProgressListener = function(callback, tags) {
            progressListeners.push({
                callback: callback,
                tags: new PxLoaderTags(tags)
            });
        };

        this.addCompletionListener = function(callback, tags) {
            progressListeners.push({
                tags: new PxLoaderTags(tags),
                callback: function(e) {
                    if (e.completedCount === e.totalCount) {
                        callback(e);
                    }
                }
            });
        };

        // creates a comparison function for resources
        var getResourceSort = function(orderedTags) {

            // helper to get the top tag's order for a resource
            orderedTags = ensureArray(orderedTags);
            var getTagOrder = function(entry) {
                var resource = entry.resource,
                    bestIndex = Infinity;
                for (var i = 0; i < resource.tags.length; i++) {
                    for (var j = 0; j < Math.min(orderedTags.length, bestIndex); j++) {
                        if (resource.tags.all[i] === orderedTags[j] && j < bestIndex) {
                            bestIndex = j;
                            if (bestIndex === 0) {
                                break;
                            }
                        }
                        if (bestIndex === 0) {
                            break;
                        }
                    }
                }
                return bestIndex;
            };
            return function(a, b) {
                // check tag order first
                var aOrder = getTagOrder(a),
                    bOrder = getTagOrder(b);
                if (aOrder < bOrder) { return -1; }
                if (aOrder > bOrder) { return 1; }

                // now check priority
                if (a.priority < b.priority) { return -1; }
                if (a.priority > b.priority) { return 1; }
                return 0;
            };
        };

        this.start = function(orderedTags) {
            timeStarted = Date.now();

            // first order the resources
            var compareResources = getResourceSort(orderedTags);
            entries.sort(compareResources);

            // trigger requests for each resource
            for (var i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                entry.status = ResourceState.WAITING;
                entry.resource.start(this);
            }

            // do an initial status check soon since items may be loaded from the cache
            setTimeout(statusCheck, 100);
        };

        var statusCheck = function() {
            var checkAgain = false,
                noProgressTime = Date.now() - progressChanged,
                timedOut = (noProgressTime >= settings.noProgressTimeout),
                shouldLog = (noProgressTime >= settings.loggingDelay);

            for (var i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                if (entry.status !== ResourceState.WAITING) {
                    continue;
                }

                // see if the resource has loaded
                if (entry.resource.checkStatus) {
                    entry.resource.checkStatus();
                }

                // if still waiting, mark as timed out or make sure we check again
                if (entry.status === ResourceState.WAITING) {
                    if (timedOut) {
                        entry.resource.onTimeout();
                    } else {
                        checkAgain = true;
                    }
                }
            }

            // log any resources that are still pending
            if (shouldLog && checkAgain) {
                log();
            }

            if (checkAgain) {
                setTimeout(statusCheck, settings.statusInterval);
            }
        };

        this.isBusy = function() {
            for (var i = 0, len = entries.length; i < len; i++) {
                if (entries[i].status === ResourceState.QUEUED || entries[i].status === ResourceState.WAITING) {
                    return true;
                }
            }
            return false;
        };

        var onProgress = function(resource, statusType) {
            
            var entry = null,
                i, len, numResourceTags, listener, shouldCall;

            // find the entry for the resource    
            for (i = 0, len = entries.length; i < len; i++) {
                if (entries[i].resource === resource) {
                    entry = entries[i];
                    break;
                }
            }

            // we have already updated the status of the resource
            if (entry == null || entry.status !== ResourceState.WAITING) {
                return;
            }
            entry.status = statusType;
            progressChanged = Date.now();

            numResourceTags = resource.tags.length;

            // fire callbacks for interested listeners
            for (i = 0, len = progressListeners.length; i < len; i++) {
                
                listener = progressListeners[i];
                if (listener.tags.length === 0) {
                    // no tags specified so always tell the listener
                    shouldCall = true;
                } else {
                    // listener only wants to hear about certain tags
                    shouldCall = resource.tags.intersects(listener.tags);
                }

                if (shouldCall) {
                    sendProgress(entry, listener);
                }
            }
        };

        this.onLoad = function(resource) {
            onProgress(resource, ResourceState.LOADED);
        };
        this.onError = function(resource) {
            onProgress(resource, ResourceState.ERROR);
        };
        this.onTimeout = function(resource) {
            onProgress(resource, ResourceState.TIMEOUT);
        };

        // sends a progress report to a listener
        var sendProgress = function(updatedEntry, listener) {
            // find stats for all the resources the caller is interested in
            var completed = 0,
                total = 0,
                i, len, entry, includeResource;
            for (i = 0, len = entries.length; i < len; i++) {
                
                entry = entries[i];
                includeResource = false;

                if (listener.tags.length === 0) {
                    // no tags specified so always tell the listener
                    includeResource = true;
                } else {
                    includeResource = entry.resource.tags.intersects(listener.tags);
                }

                if (includeResource) {
                    total++;
                    if (entry.status === ResourceState.LOADED ||
                        entry.status === ResourceState.ERROR ||
                        entry.status === ResourceState.TIMEOUT) {

                        completed++;
                    }
                }
            }

            listener.callback({
                // info about the resource that changed
                resource: updatedEntry.resource,

                // should we expose StatusType instead?
                loaded: (updatedEntry.status === ResourceState.LOADED),
                error: (updatedEntry.status === ResourceState.ERROR),
                timeout: (updatedEntry.status === ResourceState.TIMEOUT),

                // updated stats for all resources
                completedCount: completed,
                totalCount: total
            });
        };

        // prints the status of each resource to the console
        var log = this.log = function(showAll) {
            if (!window.console) {
                return;
            }

            var elapsedSeconds = Math.round((Date.now() - timeStarted) / 1000);
            window.console.log('PxLoader elapsed: ' + elapsedSeconds + ' sec');

            for (var i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                if (!showAll && entry.status !== ResourceState.WAITING) {
                    continue;
                }

                var message = 'PxLoader: #' + i + ' ' + entry.resource.getName();
                switch(entry.status) {
                    case ResourceState.QUEUED:
                        message += ' (Not Started)';
                        break;
                    case ResourceState.WAITING:
                        message += ' (Waiting)';
                        break;
                    case ResourceState.LOADED:
                        message += ' (Loaded)';
                        break;
                    case ResourceState.ERROR:
                        message += ' (Error)';
                        break;
                    case ResourceState.TIMEOUT:
                        message += ' (Timeout)';
                        break;
                }

                if (entry.resource.tags.length > 0) {
                    message += ' Tags: [' + entry.resource.tags.all.join(',') + ']';
                }

                window.console.log(message);
            }
        };
    }


    // Tag object to handle tag intersection; once created not meant to be changed
    // Performance rationale: http://jsperf.com/lists-indexof-vs-in-operator/3
     
    function PxLoaderTags(values) {
     
        this.all = [];
        this.first = null; // cache the first value
        this.length = 0;

        // holds values as keys for quick lookup
        this.lookup = {};
     
        if (values) {

            // first fill the array of all values
            if (Array.isArray(values)) {
                // copy the array of values, just to be safe                
                this.all = values.slice(0);
            } else if (typeof values === 'object') {
                for (var key in values) {
                    if(values.hasOwnProperty(key)) {
                        this.all.push(key);
                    }
                }
            } else {
                this.all.push(values);
            }

            // cache the length and the first value
            this.length = this.all.length;
            if (this.length > 0) {
                this.first = this.all[0];
            }
     
            // set values as object keys for quick lookup during intersection test
            for (var i = 0; i < this.length; i++) {
                this.lookup[this.all[i]] = true;
            }
        }
    }

    // compare this object with another; return true if they share at least one value
    PxLoaderTags.prototype.intersects = function(other) {

        // handle empty values case
        if (this.length === 0 || other.length === 0) {
            return false;
        } 

        // only a single value to compare?
        if (this.length === 1 && other.length === 1) {
            return this.first === other.first;
        }

        // better to loop through the smaller object
        if (other.length < this.length) {
            return other.intersects(this); 
        }
         
        // loop through every key to see if there are any matches
        for (var key in this.lookup) {
            if (other.lookup[key]) {
                return true;
            }
        }

        return false;
    };

    // AMD module support
    if (typeof define === 'function' && define.amd) {
        define('PxLoader', [], function() {
            return PxLoader;
        });
    }

    // exports
    global.PxLoader = PxLoader;

}(this));

// Date.now() shim for older browsers
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

// shims to ensure we have newer Array utility methods
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}



var hands=[{"title":"Royal flush","data":"royal_flush","card_1":"1.svg","card_2":"13.svg","card_3":"12.svg","card_4":"11.svg","card_5":"10.svg","description":"A royal flush is an ace high straight flush. For example, A-K-Q-J-10 all of diamonds."},{"title":"Straight flush","data":"straight_flush","card_1":"5.svg","card_2":"6.svg","card_3":"7.svg","card_4":"8.svg","card_5":"9.svg","description":"A straight flush is a five-card straight, all in the same suit. For example, 7-6-5-4-3 all of clubs."},{"title":"Four of a kind","data":"four_of_kind","card_1":"11.svg","card_2":"24.svg","card_3":"37.svg","card_4":"50.svg","card_5":"17.svg","description":"Four of a kind, or quads, are four cards of equal value. For example, four jacks."},{"title":"Full house","data":"full_house","card_1":"51.svg","card_2":"38.svg","card_3":"25.svg","card_4":"33.svg","card_5":"7.svg","description":"A full house contains a set (3) of cards of one value and a pair of another value. For example, Q-Q-Q-2-2."},{"title":"Flush","data":"flush","card_1":"33.svg","card_2":"36.svg","card_3":"39.svg","card_4":"40.svg","card_5":"42.svg","description":"A flush is any 5 cards, all of the same suit. For example, K-Q-9-6-3 all of diamonds."},{"title":"Straight","data":"straight_flush","card_1":"46.svg","card_2":"45.svg","card_3":"31.svg","card_4":"17.svg","card_5":"3.svg","description":"Five cards of sequential value. Every possible straight will contain either a 5 or a 10. For example, 7-6-5-4-3 with different suits."},{"title":"Three of a kind","data":"three_of_kind","card_1":"17.svg","card_2":"2.svg","card_3":"27.svg","card_4":"14.svg","card_5":"1.svg","description":"Three cards of the same value. For example, three aces.\n"},{"title":"Two pairs","data":"two_pairs","card_1":"11.svg","card_2":"24.svg","card_3":"8.svg","card_4":"21.svg","card_5":"45.svg","description":"This is two cards of one value and another two cards of another value. For example, two jacks and two 8s."},{"title":"Pair","data":"pair","card_1":"12.svg","card_2":"51.svg","card_3":"3.svg","card_4":"32.svg","card_5":"18.svg","description":"One pair is two cards of the same rank. For example, two queens."},{"title":"High card","data":"high_card","card_1":"1.svg","card_2":"22.svg","card_3":"41.svg","card_4":"33.svg","card_5":"3.svg","description":"The hand with the highest card(s) wins. If two or more players hold the highest card, a kicker comes into play (see below)."}];