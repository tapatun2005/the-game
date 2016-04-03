/*global PxLoader: true, define: true */ 

// PxLoader plugin to load images
function PxLoaderImage(url, tags, priority) {
    var self = this,
        loader = null;

    this.img = new Image();
    this.tags = tags;
    this.priority = priority;

    var onReadyStateChange = function() {
        if (self.img.readyState === 'complete') {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    var onLoad = function() {
        removeEventHandlers();
        loader.onLoad(self);
    };

    var onError = function() {
        removeEventHandlers();
        loader.onError(self);
    };

    var removeEventHandlers = function() {
        self.unbind('load', onLoad);
        self.unbind('readystatechange', onReadyStateChange);
        self.unbind('error', onError);
    };

    this.start = function(pxLoader) {
        // we need the loader ref so we can notify upon completion
        loader = pxLoader;

        // NOTE: Must add event listeners before the src is set. We
        // also need to use the readystatechange because sometimes
        // load doesn't fire when an image is in the cache.
        self.bind('load', onLoad);
        self.bind('readystatechange', onReadyStateChange);
        self.bind('error', onError);

        self.img.src = url;
    };

    // called by PxLoader to check status of image (fallback in case
    // the event listeners are not triggered).
    this.checkStatus = function() {
        if (self.img.complete) {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    // called by PxLoader when it is no longer waiting
    this.onTimeout = function() {
        removeEventHandlers();
        if (self.img.complete) {
            loader.onLoad(self);
        } else {
            loader.onTimeout(self);
        }
    };

    // returns a name for the resource that can be used in logging
    this.getName = function() {
        return url;
    };

    // cross-browser event binding
    this.bind = function(eventName, eventHandler) {
        if (self.img.addEventListener) {
            self.img.addEventListener(eventName, eventHandler, false);
        } else if (self.img.attachEvent) {
            self.img.attachEvent('on' + eventName, eventHandler);
        }
    };

    // cross-browser event un-binding
    this.unbind = function(eventName, eventHandler) {
        if (self.img.removeEventListener) {
            self.img.removeEventListener(eventName, eventHandler, false);
        } else if (self.img.detachEvent) {
            self.img.detachEvent('on' + eventName, eventHandler);
        }
    };

}

// add a convenience method to PxLoader for adding an image
PxLoader.prototype.addImage = function(url, tags, priority) {
    var imageLoader = new PxLoaderImage(url, tags, priority);
    this.add(imageLoader);

    // return the img element to the caller
    return imageLoader.img;
};

// AMD module support
if (typeof define === 'function' && define.amd) {
    define('PxLoaderImage', [], function() {
        return PxLoaderImage;
    });
}var hands=[{"title":"Royal flush","data":"royal_flush","card_1":"1.svg","card_2":"13.svg","card_3":"12.svg","card_4":"11.svg","card_5":"10.svg","description":"A royal flush is an ace high straight flush. For example, A-K-Q-J-10 all of diamonds."},{"title":"Straight flush","data":"straight_flush","card_1":"5.svg","card_2":"6.svg","card_3":"7.svg","card_4":"8.svg","card_5":"9.svg","description":"A straight flush is a five-card straight, all in the same suit. For example, 7-6-5-4-3 all of clubs."},{"title":"Four of a kind","data":"four_of_kind","card_1":"11.svg","card_2":"24.svg","card_3":"37.svg","card_4":"50.svg","card_5":"17.svg","description":"Four of a kind, or quads, are four cards of equal value. For example, four jacks."},{"title":"Full house","data":"full_house","card_1":"51.svg","card_2":"38.svg","card_3":"25.svg","card_4":"33.svg","card_5":"7.svg","description":"A full house contains a set (3) of cards of one value and a pair of another value. For example, Q-Q-Q-2-2."},{"title":"Flush","data":"flush","card_1":"33.svg","card_2":"36.svg","card_3":"39.svg","card_4":"40.svg","card_5":"42.svg","description":"A flush is any 5 cards, all of the same suit. For example, K-Q-9-6-3 all of diamonds."},{"title":"Straight","data":"straight_flush","card_1":"46.svg","card_2":"45.svg","card_3":"31.svg","card_4":"17.svg","card_5":"3.svg","description":"Five cards of sequential value. Every possible straight will contain either a 5 or a 10. For example, 7-6-5-4-3 with different suits."},{"title":"Three of a kind","data":"three_of_kind","card_1":"17.svg","card_2":"2.svg","card_3":"27.svg","card_4":"14.svg","card_5":"1.svg","description":"Three cards of the same value. For example, three aces.\n"},{"title":"Two pairs","data":"two_pairs","card_1":"11.svg","card_2":"24.svg","card_3":"8.svg","card_4":"21.svg","card_5":"45.svg","description":"This is two cards of one value and another two cards of another value. For example, two jacks and two 8s."},{"title":"Pair","data":"pair","card_1":"12.svg","card_2":"51.svg","card_3":"3.svg","card_4":"32.svg","card_5":"18.svg","description":"One pair is two cards of the same rank. For example, two queens."},{"title":"High card","data":"high_card","card_1":"1.svg","card_2":"22.svg","card_3":"41.svg","card_4":"33.svg","card_5":"3.svg","description":"The hand with the highest card(s) wins. If two or more players hold the highest card, a kicker comes into play (see below)."}];