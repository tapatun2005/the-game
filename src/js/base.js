require('gsap');
require('jquery.nicescroll');

(function(PxLoader, PxLoaderImage) {
	
	var hands=[{"title":"Royal flush","data":"royal_flush","card_1":"1.svg","card_1_status":"active","card_2":"13.svg","card_2_status":"active","card_3":"12.svg","card_3_status":"active","card_4":"11.svg","card_4_status":"active","card_5":"10.svg","card_5_status":"active","description":"A royal flush is an ace high straight flush. For example, A-K-Q-J-10 all of diamonds."},{"title":"Straight flush","data":"straight_flush","card_1":"5.svg","card_1_status":"active","card_2":"6.svg","card_2_status":"active","card_3":"7.svg","card_3_status":"active","card_4":"8.svg","card_4_status":"active","card_5":"9.svg","card_5_status":"active","description":"A straight flush is a five-card straight, all in the same suit. For example, 7-6-5-4-3 all of clubs."},{"title":"Four of a kind","data":"four_of_kind","card_1":"11.svg","card_1_status":"active","card_2":"24.svg","card_2_status":"active","card_3":"37.svg","card_3_status":"active","card_4":"50.svg","card_4_status":"active","card_5":"17.svg","card_5_status":"passive","description":"Four of a kind, or quads, are four cards of equal value. For example, four jacks."},{"title":"Full house","data":"full_house","card_1":"51.svg","card_1_status":"active","card_2":"38.svg","card_2_status":"active","card_3":"25.svg","card_3_status":"active","card_4":"33.svg","card_4_status":"active","card_5":"7.svg","card_5_status":"active","description":"A full house contains a set (3) of cards of one value and a pair of another value. For example, Q-Q-Q-2-2."},{"title":"Flush","data":"flush","card_1":"39.svg","card_1_status":"active","card_2":"36.svg","card_2_status":"active","card_3":"35.svg","card_3_status":"active","card_4":"31.svg","card_4_status":"active","card_5":"30.svg","card_5_status":"active","description":"A flush is any 5 cards, all of the same suit. For example, K-Q-9-6-3 all of diamonds."},{"title":"Straight","data":"straight","card_1":"46.svg","card_1_status":"active","card_2":"45.svg","card_2_status":"active","card_3":"31.svg","card_3_status":"active","card_4":"17.svg","card_4_status":"active","card_5":"3.svg","card_5_status":"active","description":"Five cards of sequential value. Every possible straight will contain either a 5 or a 10. For example, 7-6-5-4-3 with different suits."},{"title":"Three of a kind","data":"three_of_kind","card_1":"27.svg","card_1_status":"active","card_2":"14.svg","card_2_status":"active","card_3":"1.svg","card_3_status":"active","card_4":"17.svg","card_4_status":"passive","card_5":"2.svg","card_5_status":"passive","description":"Three cards of the same value. For example, three aces.\n"},{"title":"Two pairs","data":"two_pairs","card_1":"11.svg","card_1_status":"active","card_2":"24.svg","card_2_status":"active","card_3":"8.svg","card_3_status":"active","card_4":"21.svg","card_4_status":"active","card_5":"45.svg","card_5_status":"passive","description":"This is two cards of one value and another two cards of another value. For example, two jacks and two 8s."},{"title":"Pair","data":"pair","card_1":"12.svg","card_1_status":"active","card_2":"51.svg","card_2_status":"active","card_3":"3.svg","card_3_status":"passive","card_4":"32.svg","card_4_status":"passive","card_5":"18.svg","card_5_status":"passive","description":"One pair is two cards of the same rank. For example, two queens."},{"title":"High card","data":"high_card","card_1":"1.svg","card_1_status":"active","card_2":"22.svg","card_2_status":"passive","card_3":"41.svg","card_3_status":"passive","card_4":"33.svg","card_4_status":"passive","card_5":"3.svg","card_5_status":"passive","description":"The hand with the highest card(s) wins. If two or more players hold the highest card, a kicker comes into play (see below)."}];
	var main_cards=[{"stage":"initial","main_card_1_top":"-50","main_card_1_left":"-50","main_card_2_top":"-50","main_card_2_left":"-50","main_card_3_top":"-50","main_card_3_left":"-50","main_card_4_top":"-50","main_card_4_left":"-50","main_card_5_top":"-50","main_card_5_left":"-50"},{"stage":"options","main_card_1_top":"-50","main_card_1_left":"-278","main_card_2_top":"-50","main_card_2_left":"-164","main_card_3_top":"-50","main_card_3_left":"-50","main_card_4_top":"-50","main_card_4_left":"64","main_card_5_top":"-50","main_card_5_left":"179"}];
    var texas_cards=[{"step_id":"texas_holdem_deal_0","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_1","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_2","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_3","card_1_left":"50","card_1_top":"50","card_1_rotate":"0","card_1_class":"passive","card_2_left":"50","card_2_top":"50","card_2_rotate":"0","card_2_class":"passive","card_3_left":"50","card_3_top":"50","card_3_rotate":"0","card_3_class":"passive","card_4_left":"50","card_4_top":"50","card_4_rotate":"0","card_4_class":"passive","card_5_left":"50","card_5_top":"50","card_5_rotate":"0","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"},{"step_id":"texas_holdem_deal_4","card_1_left":"22","card_1_top":"13","card_1_rotate":"0","card_1_class":"passive","card_2_left":"35","card_2_top":"13","card_2_rotate":"0","card_2_class":"passive","card_3_left":"69","card_3_top":"13","card_3_rotate":"0","card_3_class":"passive","card_4_left":"82","card_4_top":"13","card_4_rotate":"0","card_4_class":"passive","card_5_left":"90","card_5_top":"48","card_5_rotate":"90","card_5_class":"passive","card_6_left":"50","card_6_top":"50","card_6_rotate":"0","card_6_class":"passive","card_7_left":"50","card_7_top":"50","card_7_rotate":"0","card_7_class":"passive","card_8_left":"50","card_8_top":"50","card_8_rotate":"0","card_8_class":"passive","card_9_left":"50","card_9_top":"50","card_9_rotate":"0","card_9_class":"passive","card_10_left":"50","card_10_top":"50","card_10_rotate":"0","card_10_class":"passive","card_11_left":"50","card_11_top":"50","card_11_rotate":"0","card_11_class":"passive","card_12_left":"50","card_12_top":"50","card_12_rotate":"0","card_12_class":"passive","card_13_left":"50","card_13_top":"50","card_13_rotate":"0","card_13_class":"passive","card_14_left":"50","card_14_top":"50","card_14_rotate":"0","card_14_class":"passive","card_15_left":"50","card_15_top":"50","card_15_rotate":"0","card_15_class":"passive","card_16_left":"50","card_16_top":"50","card_16_rotate":"0","card_16_class":"passive","card_17_left":"50","card_17_top":"50","card_17_rotate":"0","card_17_class":"passive"}];

    var timeline = new TimelineLite();

    var baseDomain = "paradise-moment.indino.co.uk";

    var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
        animationEnd = "webkitAnimationEnd oanimationend msAnimationEnd animationend";
    var loader;
    var activeGame = $('.game.active');

    function preloader() {
        loader = new PxLoader();
        $('img').each(function() {
            var src = $(this).prop('src');
            loader.add(new PxLoaderImage(src));
        });


        loader.addProgressListener(function(e) {
            var percentage = parseInt((e.completedCount/e.totalCount)*100);
            // $('#loader span').text(percentage+'%');
            if (percentage === 100) {
                setTimeout (function(){
                    init();
                }, 0);
            }
            console.log(percentage);
        });

        loader.start();
    }

    function init() {
        var data = "initial";
        loaded();
        mainCardPostion(data);
        $('.js-start').on('click', start);
        $('.js-back').on('click', goBack);
        $('.js-main-card').on('click', showOption);
        $('.js-open-menu').on('click', showMenu);
        $('.js-btn-close-menu').on('click', closeMenu);
        $('.js-show-hand').on('click', showHand);
        $('.js-next-intro').on('click', showNextStepIntro);
        $('.js-prev-intro').on('click', showPrevStepIntro);
        $('.js-next-rules').on('click', showNextStepRules);
        $('.js-prev-rules').on('click', showPrevStepRules);
        $('.js-next-tips').on('click', showNextStepTips);
        $('.js-prev-tips').on('click', showPrevStepTips);
        $('.js-tab-1').on('click', showTabSectionIntro);
        $('.js-tab-2').on('click', showTabSectionRules);
        $('.js-tab-3').on('click', showTabSectionTips);
        $('.js-stage-nav').on('click', showStage);
        $('.js-step-nav').on('click', showStep);
        $('.js-table-step').on('click', showTableStep);
    }

//START LOADING

    function loaded() {
        mainCardHoverOn();
    }

//END


//HOVER CARD
    function mainCardHoverOn(){
        $(".js-main-card").on({
            mouseenter: hoverInMainCard,
            mouseleave: hoverOutMainCard
        });
    }

    function mainCardHoverOff() {
        $(".js-main-card").off({
            mouseenter: hoverInMainCard,
            mouseleave: hoverOutMainCard
        });
    }

    function hoverInMainCard(e) {
        var current = $(e.currentTarget);
        TweenLite.to(".js-main-card", 0.5, {scale:"0.9", opacity: "0.75", ease:Power2.easeInOut});
        TweenLite.to(current, 0.5, {scale:"1.1", opacity: "1", ease:Power2.easeInOut});
    }
    function hoverOutMainCard(e) {
        if (!$(".js-main-card").hasClass('wrapped')) {
            scaleToInitial();
        } else {
            showOption(e);
        }
    }
//END


//OPTION LIST
    function toInitialMainCards() {
        var rotateElem = $(".main-card-wrap");
        rotateToFaceDown(rotateElem);
        setTimeout (function(){
            scaleToInitial();
        },1000);
    }

//START function
    function start(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var data = $(current).data('main_cards');
        toInitialMainCards();
        mainCardPostion(data);
        moveMainCardsCenter();
        removezIndex();
        addActiveMainCards();
        current.addClass('hide');
        TweenMax.to(".js-start", .5, {opacity: "0", ease:Power2.easeInOut});
        $('.nav__flex-top').addClass('show');
        TweenMax.to(".nav__flex-top", .5, {opacity: "1", ease:Power2.easeInOut});

    }

    function goBack(e) {
        e.preventDefault();
        mainCardHoverOn();
        closeMenu();
        var current = $(e.currentTarget);
        var data = $(current).data('main_cards');
        toInitialMainCards();
        removeBackButton();
        $('.js-main-card').removeClass('wrapped');
        $('.main-cards').addClass('active');
        TweenLite.to(".js-main-card", 1.5, {scale:"1", opacity:"1", ease:Power2.easeInOut});
        setTimeout(function(){
            mainCardPostion(data);
            zoomInMainCards();
            moveMainCardsCenter();
        },750);
        setTimeout(function(){
            removezIndex();
        }, 2000);
        $('.js-game.active').removeClass('active');
        hideSection();
        hideTable();
        hideTabs();

        $('.js-table-stage').removeClass('show');
        $('.js-table-step').removeClass('active');
        $('.js-table-step').removeClass('focus');
        TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
    }
    
    function removezIndex() {
        $('.js-main-card').removeClass('index');
    }
//END


//SHOW OPTION
    function showOption(e) {
        e.preventDefault();
        mainCardHoverOff();
        var current = $(e.currentTarget);
        var currentGameData = $(current).data("main_card");
        var currentGame = $('#'+currentGameData);

        var data = "initial";
        var rotateElem = $(current).find('.main-card-wrap');
        mainCardPostion(data);
        moveMainCardsLeft();
        current.addClass('index');
        $(".js-main-card").addClass('wrapped');
        TweenLite.to(".js-main-card", 1, {scale:"0.85", ease:Power2.easeInOut});
        TweenLite.to(current, 1, {scale:"1.3", ease:Power2.easeInOut});
        rotateToFaceUp(rotateElem);
        removeActiveMainCards();
        showBackButton();
//show game content
        $('#' + currentGameData).addClass('active');
        showIntro();
        showTabs();
        return false;
    }

    function mainCardPostion(data) {
        var main_card = main_cards.filter(function ( main_card ) {
            return main_card.stage === data;
        })[0];

        for (var i = 1; i < 6; i++) {
            var left = main_card["main_card_"+i+"_left"]+"%";
            var top = main_card["main_card_"+i+"_top"]+"%";
            TweenLite.to('.main_card_' + i, 1.5, {x:left, y: top, ease:Power2.easeInOut});
        }
    }
//END


//POKER HANDS MENU

    //show menu
    function showMenu(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var parent = $(current).closest('.nav__item');
        var close = $(current).find('.btn--close');
        var list = $(parent).find('.nav__list');
        var backButton = $(parent).find('.btn--back');
        TweenLite.to(parent, 1, {width:"300px", height: "100%", background: "rgba(0,0,0,1)", ease:Power2.easeInOut});
        setTimeout(function(){
            TweenLite.to(close, .1, {width: "30px", ease:Power1.easeInOut});
            TweenLite.to(list, 1, {opacity: "1", ease:Power2.easeInOut});
            list.addClass('show');
        }, 1000);
    }

    //close menu
    function closeMenu() {
        TweenLite.to(".btn--close", .1, {width: "0", ease:Power1.easeInOut});
        TweenLite.to(".nav__list", .5, {opacity: "0", ease:Power2.easeInOut});
        $('.nav__list').removeClass('show');
        setTimeout(function(){
            TweenLite.to(".nav__item", 1, {width:"80px", height: "30px", background: "rgba(0,0,0,0)", ease:Power2.easeInOut});
        }, 500);
        return false;
    }
    
    //show hand
    function showHand(e){
        e.preventDefault();
        var data = "options";
        var rotateElem = $('.main-card-wrap');
        var image = $(e.currentTarget).data('hand');
        var parent = $(e.currentTarget).closest('.nav__item');
        var backButton = $(parent).find('.btn--back');
        mainCardHoverOff();
        removeActiveMainCards();
        scaleToInitial();
        moveMainCardsLeftBorder();
        zoomOutMainCards();
        mainCardPostion(data);
        closeMenu(e);
        removeBackButton();
        TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0, onComplete:imagePokerHands, onCompleteParams: [image]}, .1);
        backButton.addClass('show');
        TweenLite.to(backButton, .3, {opacity:"1", ease:Power0.easeInOut});
        return false;
    }

    //replace images
	function imagePokerHands(image) {
		var hand = hands.filter(function ( hand ) {
            return hand.data === image;
        })[0];

    	removeClassesMainCard();

		for (var i = 1; i < 6; i++) {
			var image = "images/cards_numbers/" + hand['card_'+i];
			var status = hand["card_" + i + "_status"];
			var cardClass = $('.main_card_' + i);

			$('.main-card__faceup-' + i ).attr('src', image);
			cardClass.addClass(status);
		}
		rotateOneByOneAndScale();
	}

	//remove classes on the main cards 
	function removeClassesMainCard(){
		$(".js-main-card").removeClass('active');
        $(".js-main-card").removeClass('passive');
	}


//SHOW TABS FOR THR GAME

    function showTabs(){
        var activeGame = $('.js-game.active');
        var tabs = $(activeGame).find('.js-tabs');
        TweenLite.to(tabs, .3, {opacity:"1", ease:Power0.easeInOut});
    }

    function hideTabs(){
        TweenLite.to(".js-tabs", .3, {opacity:"0", ease:Power0.easeInOut});
    }

    function showTabSectionIntro(e) {
        hideSection();
        showIntro();

        hideTable();
    }
    function showTabSectionRules(e) {
        hideSection();
        showRules();

        showTable();
    }
    function showTabSectionTips(e) {
        hideSection();
        showTips();

        hideTable();
    }

//SHOW TABLE
    function showTable(){
        var rotateElem = $(".main-card-wrap");
        TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0, onComplete:showTable2});
    }
    function showTable2(){
        TweenLite.to(".table", 1, {opacity:"1", ease:Power0.easeInOut});
    }

    function hideTable() {
        TweenLite.to(".table", 1, {opacity:"0", ease:Power0.easeInOut});
    }

//SHOW SECTIONS INTROOOOO!!!!!

    function showIntro() {
        var activeGame = $('.js-game.active');
        var section = $(activeGame).find('.js-section-intro');
        var firstStage = $(section).find('.js-stage:first');
        var firstStep = $(firstStage).find('.js-step:first-child');
        
        section.addClass('active');
        firstStage.addClass('active');
        firstStep.show().addClass('active');
        
        TweenLite.to(section, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(firstStage, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(firstStep, 1, {opacity:"1", ease:Power2.easeInOut});

    // hide prev first
        
    }


//next prev step
    
    function showNextStepIntro(e){
       e.preventDefault();
       var current = $(e.currentTarget);
       var stage = $(current).closest('.js-stage');
       var activeStep = $(stage).find('.js-step.active');
       var nextStep = $(activeStep).next('.js-step');

       if (nextStep.length) {
            activeStep.removeClass('active');
            nextStep.show().addClass('active');
            TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.to(nextStep, .3, {opacity:"1", ease:Power0.easeInOut});
       } else {
            hideSection();
            showRules();
            showTable();
       }
    }

     function showPrevStepIntro(e){
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var prevStep = $(activeStep).prev('.js-step');

        if (prevStep.length) {
            activeStep.removeClass('active');
            prevStep.show().addClass('active');
            TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.to(prevStep, .3, {opacity:"1", ease:Power0.easeInOut});
        } else {
            alert("None");
        }
    }

//hide items on different actions
    function hideAllItems(){
        $('.js-step.active').hide().scrollTop(0);
    }

    function hideStep(activeStep){
        activeStep.scrollTop(0).hide();
    }


//SHOW RULESSSSSS ................
    
    function showRules(){
        var activeGame = $('.js-game.active');
        var section = $(activeGame).find('.js-section-rules');
        var firstStage = $(section).find(".js-stage:first-child");
        var firstStep = $(firstStage).find('.js-step:first-child');
        var stageNavs = $(section).find('.js-stages');
        var firstStageNav = $(stageNavs).find('.js-stage-nav:first-child');

        section.addClass('active');
        firstStage.addClass('active');
        firstStep.show().addClass('active');

//right navigation
        firstStageNav.addClass('active');

        TweenLite.to(section, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(firstStage, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(firstStep, 1, {opacity:"1", ease:Power2.easeInOut});

  //ANIMATION FOR CARDS
        var step_id = $(firstStep).data('position');
        positions(step_id);

    // POINTS ON THE TABLE
        var firstStageData = $(firstStage).data('nav');
        var table_stage = $('.table__stages').find("[data-stage=" + firstStageData + "]");

        table_stage.addClass('show');
        TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});
    }

    function showNextStepRules(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var nextStep = $(activeStep).next('.js-step');
        var nextStage = $(stage).next('.js-stage');
        var nextStageStep = $(nextStage).find('.js-step:first-child');
        //for right nav
        var section = $(current).closest('.js-section');
        var stageNavs = $(section).find('.js-stages');
        var stepNavs = $(stage).find('.js-steps');

        if (nextStep.length) {
        //top steps navigations 
            var stepDataNav = $(nextStep).data('nav');
            var stepNav = $(stepNavs).find("[data-step=" + stepDataNav + "]");
            var upNavs = $(stepNav).prevAll('.js-step-nav');

        //top nav
            stepNav.addClass("active");
            upNavs.addClass('focus');
            upNavs.removeClass('active');


            activeStep.removeClass('active');
            nextStep.show().addClass('active');
            TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.to(nextStep, .3, {opacity:"1", ease:Power0.easeInOut});

        //add classes to table points
            var tableNav = $('.table__stage.show').find("[data-step=" + stepDataNav + "]");
            var tableNavUp = $(tableNav).prevAll('.js-table-step');
            var tableNavDown = $(tableNav).nextAll('.js-table-step');
            tableNavUp.removeClass('active');
            tableNavUp.addClass('focus');
            tableNav.addClass('active');
            tableNavDown.removeClass('active');
            tableNavDown.removeClass('focus');



        //ANIMATION FOR CARDS
            var step_id = $(nextStep).data('position');
            positions(step_id);

       } else {
            if (nextStage.length ) {
            //navigation right
                var stageDataNav = $(nextStage).data('nav');
                var stageNav = $(stageNavs).find("[data-stage=" + stageDataNav + "]");
                var upNavs = $(stageNav).prevAll('.js-stage-nav');

            //nav right
                stageNav.addClass('active');
                upNavs.removeClass('active');
                upNavs.addClass('focus');

                stage.removeClass('active');
                nextStage.addClass('active');
                nextStageStep.show().addClass('active');
                TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(nextStage, 1, {opacity:"1", ease:Power2.easeInOut});
                TweenLite.to(nextStageStep, 1, {opacity:"1", ease:Power2.easeInOut});

            //remove previous stage classes
                var stepNav = $(stage).find('.js-step-nav');
                stepNav.removeClass('active');
                stepNav.removeClass('focus');
                activeStep.removeClass('active');
                TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});


            // POINTS ON THE TABLE
               
                var table_stage = $('.table__stages').find("[data-stage=" + stageDataNav + "]");
                table_stage.addClass('show');
                console.log(table_stage);
                TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});

            //ANIMATION FOR CARDS
                var step_id = $(nextStageStep).data('position');
                positions(step_id);
               

            } else {
                hideSection();
                showTips();
            }
       }
    }

    function showPrevStepRules(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var prevStep = $(activeStep).prev('.js-step');
        var prevStage = $(stage).prev('.js-stage');

        //for right nav
        var section = $(current).closest('.js-section');
        var stageNavs = $(section).find('.js-stages');
        //for the top nav
        var stepNavs = $(stage).find('.js-steps');

         if (prevStep.length) {
        //top steps navigations 
            var stepDataNav = $(prevStep).data('nav');
            var stepNav = $(stepNavs).find("[data-step=" + stepDataNav + "]");
            var upNavs = $(stepNav).prevAll('.js-step-nav');
            var downNavs = $(stepNav).nextAll('.js-step-nav');

        //top nav
            if (stepNav.length) {
                stepNav.addClass("active");
                upNavs.addClass('focus');
                upNavs.removeClass('active');
                downNavs.removeClass('active');
                downNavs.removeClass('focus');
            } else {
                $('.js-step-nav').removeClass('active');
                $('.js-step-nav').removeClass('focus');
                $('.js-table-step').removeClass('active');
                $('.js-table-step').removeClass('focus');
            }

            activeStep.removeClass('active');
            prevStep.show().addClass('active');
            TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.to(prevStep, .3, {opacity:"1", ease:Power0.easeInOut});


        //add classes to table points
            var tableNav = $('.table__stage.show').find("[data-step=" + stepDataNav + "]");
            var tableNavUp = $(tableNav).prevAll('.js-table-step');
            var tableNavDown = $(tableNav).nextAll('.js-table-step');
            tableNavUp.removeClass('active');
            tableNavUp.addClass('focus');
            tableNav.addClass('active');
            tableNavDown.removeClass('active');
            tableNavDown.removeClass('focus');

        //ANIMATION FOR CARDS
            var step_id = $(prevStep).data('position');
            positions(step_id);

         } else {
            if (prevStage.length) {
                var prevStageStep = $(prevStage).find('.js-step:last-child');
                var prevStageStepData = $(prevStageStep).data('nav');
                var prevStepNavs = $(prevStage).find('.js-steps');
                var stepNav = $(prevStepNavs).find("[data-step=" + prevStageStepData + "]");
                var upStepNavs = $(stepNav).prevAll('.js-step-nav');

                //navigation right
                var stageDataNav = $(prevStage).data('nav');
                var stageNav = $(stageNavs).find("[data-stage=" + stageDataNav + "]");
                var upStageNavs = $(stageNav).prevAll('.js-stage-nav');
                var downStageNavs = $(stageNav).nextAll('.js-stage-nav');

            //steps from previous stage
                var prevSteps = $(prevStage).find('.js-step-nav');
                prevSteps.removeClass('active');
                prevSteps.removeClass('focus');

            //add classes to step in next stage
                stepNav.addClass('active');
                stepNav.addClass('focus');
                upStepNavs.addClass('focus');


            //nav right
                stageNav.addClass('active');
                upStageNavs.removeClass('active');
                upStageNavs.addClass('focus');
                downStageNavs.removeClass('active');
                downStageNavs.removeClass('focus');

                stage.removeClass('active');
                prevStage.addClass('active');
                prevStageStep.show().addClass('active');
                TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(prevStage, 1, {opacity:"1", ease:Power2.easeInOut});
                TweenLite.to(prevStageStep, 1, {opacity:"1", ease:Power2.easeInOut});


            // POINTS ON THE TABLE
               
                var table_stage = $('.table__stages').find("[data-stage=" + stageDataNav + "]");
                table_stage.addClass('show');
                console.log(table_stage);
                TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});

             //ANIMATION FOR CARDS
                var step_id = $(prevStageStep).data('position');
                positions(step_id);
            } else {
                hideSection();
                showIntro();
            }
         }
    }


    function showStage(e){
        e.preventDefault();
        var current = $(e.currentTarget);
        var data = $(current).data('stage');
        var stage = $('.'+data);
        var activeNav = $(current).siblings('.js-stage-nav.active');
        var upNavs = $(current).prevAll('.js-stage-nav');
        var downNavs = $(current).nextAll('.js-stage-nav');
        var firstStep = $(stage).find('.js-step:first-child');
        var stages = $(stage).siblings('.js-stage');
        var activeStep = $(stages).find('.js-step');

    //remove steps navigations classes
        var steps = $(stages).find('.js-step-nav');        
        steps.removeClass('active');
        steps.removeClass('focus');

        activeNav.removeClass('active');
        downNavs.removeClass('focus');
        upNavs.addClass('focus');
        current.addClass('active');

        stages.removeClass("active");
        activeStep.removeClass("active");
        stage.addClass("active");
        firstStep.show().addClass("active");

        TweenLite.to(stages, 1, {opacity:"0", ease:Power2.easeInOut});
        TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});

        TweenLite.to(stage, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(firstStep, 1, {opacity:"1", ease:Power2.easeInOut});

     // POINTS ON THE TABLE
               
        var table_stage = $('.table__stages').find("[data-stage=" + data + "]");
        table_stage.addClass('show');
        console.log(table_stage);
        TweenLite.to(".js-table-stage", 1, {opacity:"0", ease:Power2.easeInOut});
        TweenLite.to(table_stage, 1, {opacity:"1", ease:Power2.easeInOut});
    
    //remove table points classes
        $('.js-table-step').removeClass('active');
        $('.js-table-step').removeClass('focus');


    //ANIMATION CARDS
         var step_id = $(current).data('position');
         positions(step_id);
    }

    function showTableStep(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var step_id = $(current).data('step');
        var step = $('.'+step_id);
        var activeStep  = $(step).siblings('.js-step.active');

    //navigation top
        var activeStepNav = $('.js-stage.active').find("[data-step=" + step_id + "]");
        var upNavs = $(activeStepNav).prevAll('.js-step-nav');
        var downNavs = $(activeStepNav).nextAll('.js-step-nav');


        activeStepNav.addClass('active');
        activeStep.removeClass("active");
        step.show().addClass('active');
        
        upNavs.addClass('focus');
        upNavs.removeClass('active');
        downNavs.removeClass('focus');
        downNavs.removeClass('active');

        TweenLite.to(step, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});

    //TABLE POSITIONS
        var tableStep = $('.table__stage.show').find('[data-step=' + step_id + ']');
        var tableStepDown = $(tableStep).prevAll('.js-table-step');
        var tableStepUp = $(tableStep).nextAll('.js-table-step');
        tableStep.addClass('active');

        tableStepDown.removeClass('active');
        tableStepDown.addClass('focus');

        tableStepUp.removeClass('active');
        tableStepUp.removeClass('focus');


    //CARD ANIMATIOn
        positions(step_id);
    }

    function showStep(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var data = $(current).data('step');
        var step_id = $(current).data('position');
        var step = $('.'+data);
        var activeStep  = $(step).siblings('.js-step.active');
        var upNavs = $(current).prevAll('.js-step-nav');
        var downNavs = $(current).nextAll('.js-step-nav');

        current.addClass('active');
        activeStep.removeClass("active");
        step.show().addClass('active');
        
        upNavs.addClass('focus');
        upNavs.removeClass('active');
        downNavs.removeClass('focus');
        downNavs.removeClass('active');

        TweenLite.to(step, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});

    //TABLE POSITIONS
        var tableStep = $('.table__stage.show').find('[data-step=' + data + ']');
        var tableStepDown = $(tableStep).prevAll('.js-table-step');
        var tableStepUp = $(tableStep).nextAll('.js-table-step');
        tableStep.addClass('active');

        tableStepDown.removeClass('active');
        tableStepDown.addClass('focus');

        tableStepUp.removeClass('active');
        tableStepUp.removeClass('focus');


    //CARD ANIMATIOn
        positions(step_id);
    }

//ANIMATION FOR STEPS!!!!!

    function positions(step_id){
        var table_card = texas_cards.filter(function ( table_card ) {
            return table_card.step_id === step_id;
        })[0];

        for (var i = 1; i < 18; i++) {
            var card = $('.table__card-' + i );
            var left = table_card["card_" + i + "_left"] + "%";
            var top = table_card["card_" + i + "_top"] + "%";
            var rotate = table_card["card_" + i + "_rotate"];
            
            TweenLite.to(card, 1, {left:left, top: top, rotation: rotate, x: "-50%", y: "-50%", ease:Power2.easeInOut});

        }


    }


//SHOW TIPSSSSS...................

    function showTips() {
        var activeGame = $('.js-game.active');
        var section = $(activeGame).find('.js-section-tips');
        var firstStage = $(section).find(".js-stage:first-child");
        var firstStep = $(firstStage).find('.js-step:first-child');

        section.addClass('active');
        firstStage.addClass('active');
        firstStep.show().addClass('active');
        TweenLite.to(section, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(firstStage, 1, {opacity:"1", ease:Power2.easeInOut});
        TweenLite.to(firstStep, 1, {opacity:"1", ease:Power2.easeInOut});
    }

    function showNextStepTips(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var nextStep = $(activeStep).next('.js-step');
        var nextStage = $(stage).next('.js-stage');
        var nextStageStep = $(nextStage).find('.js-step:first-child');

        if (nextStep.length) {
            activeStep.removeClass('active');
            nextStep.show().addClass('active');
            TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.to(nextStep, .3, {opacity:"1", ease:Power0.easeInOut});
       } else {
            if (nextStage.length ) {
                stage.removeClass('active');
                nextStage.addClass('active');
                nextStageStep.show().addClass('active');
                TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(nextStage, 1, {opacity:"1", ease:Power2.easeInOut});
                TweenLite.to(nextStageStep, 1, {opacity:"1", ease:Power2.easeInOut});
            } else {
                hideSection();
            }
       }
    }


    function showPrevStepTips(e) {
        e.preventDefault();
        var current = $(e.currentTarget);
        var stage = $(current).closest('.js-stage');
        var activeStep = $(stage).find('.js-step.active');
        var prevStep = $(activeStep).prev('.js-step');
        var prevStage = $(stage).prev('.js-stage');
        var prevStageStep = $(prevStage).find('.js-step:last-child');

         if (prevStep.length) {
            activeStep.removeClass('active');
            prevStep.show().addClass('active');
            TweenLite.to(activeStep, .3, {opacity:"0", ease:Power0.easeInOut, onComplete: hideStep, onCompleteParams: [activeStep]});
            TweenLite.to(prevStep, .3, {opacity:"1", ease:Power0.easeInOut});
         } else {
            if (prevStage.length) {
                stage.removeClass('active');
                prevStage.addClass('active');
                prevStageStep.show().addClass('active');
                TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
                TweenLite.to(prevStage, 1, {opacity:"1", ease:Power2.easeInOut});
                TweenLite.to(prevStageStep, 1, {opacity:"1", ease:Power2.easeInOut});
            } else {
                hideSection();
                showRules();
            }
         }
    }

    



    function hideSection(){
        var section = $('.js-section.active');
        var stage = $(section).find(".js-stage");
        var step = $(stage).find('.js-step.active');
    //right nav
        var stageNavs = $(section).find('.js-stage-nav');
        var stepNavs = $(section).find('.js-step-nav');

        stageNavs.removeClass('active');
        stageNavs.removeClass('focus');

        stepNavs.removeClass('active');
        stepNavs.removeClass('focus');

        section.removeClass('active');
        stage.removeClass('active');
        step.removeClass('active').hide();

        TweenLite.to(section, 1, {opacity:"0", ease:Power2.easeInOut});
        TweenLite.to(stage, 1, {opacity:"0", ease:Power2.easeInOut});
        TweenLite.to(step, 1, {opacity:"0", ease:Power2.easeInOut, onComplite: hideAllItems});
    }

    function hideStepNav() {

    }







//OPEN MENU



//CARDS MOVES AROUND THE SCREEN
    
    //move main cards block to the left
    function moveMainCardsLeft() {
        TweenLite.to(".main-cards", 1.5, {x:"-75%", ease:Power2.easeInOut});
    }
    //move main cards block close to the border
    function moveMainCardsLeftBorder() {
        TweenLite.to(".main-cards", 1.5, {x:"-90%", ease:Power2.easeInOut});
    }

    //move main cards block to center
    function moveMainCardsCenter() {
        TweenLite.to(".main-cards", 1.5, {x:"-50%", ease:Power2.easeInOut});
    }

    //zoom out main card block
    function zoomOutMainCards(){
        TweenLite.to(".main-cards", 1.5, {width:"50%", ease:Power2.easeInOut});
    }

    function zoomInMainCards(){
        TweenLite.to(".main-cards", 1.5, {width:"90%", ease:Power2.easeInOut});
    }

//CARDS ROTATIONS 
    function rotateToFaceUp(rotateElem){
        TweenLite.to(rotateElem, 1.2, {rotationY:"-155", ease:Power2.easeInOut});
    }

    function rotateToFaceUpFull(rotateElem){
        TweenLite.to(rotateElem, 1.5, {rotationY:"-180", ease:Power2.easeInOut});
    }

    function rotateDown(rotateElem) {
        TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0, onComplete:rotateOneByOne}, .1);
    }

    // function rotateOneByOne() {
    //     timeline.staggerTo(".card-wrap", 1, {rotationY:-180, ease:Power2.easeInOut}, 0.1);
    // }

    function rotateOneByOneAndScale() {
         timeline.staggerTo(".main-card-wrap", 1, {rotationY:-180, ease:Power2.easeInOut, onComplete:scaleActiveMainCard}, 0.1);
    }

    function scaleActiveMainCard() {
    	var active = $(".js-main-card.active");
    	var passive = $(".js-main-card.passive");
    	TweenLite.to(active, 0.5, {scale:"1.1", ease:Power2.easeInOut});
    	TweenLite.to(passive, 0.5, {scale:"1", opacity:".5",ease:Power2.easeInOut});
    }

    function rotateToFaceDown(rotateElem) {
        TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0});
    }

//CARD SCALE 
    function scaleToInitial(){
        TweenLite.to(".js-main-card", 0.5, {scale:"1", opacity:"1", ease:Power2.easeInOut});
    }

// remove class active from main cards block
    function addActiveMainCards() {
        $('.main-cards').addClass('active');
    }
    function removeActiveMainCards() {
        $('.main-cards').removeClass('active');
    }

// REMOVE BUTTON

    function showBackButton() {
        $('.back--left').addClass('show');
        TweenLite.to(".back--left", .3, {opacity:"1", ease:Power0.easeInOut});
    }
    function removeBackButton(){
        TweenLite.to(".btn--back", .3, {opacity:"0", ease:Power0.easeInOut});
        $('.btn--back').removeClass('show');
    }

    // $(document).ready(preloader);
    init();
})(PxLoader, PxLoaderImage);