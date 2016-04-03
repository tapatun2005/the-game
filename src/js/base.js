require('gsap');
require('jquery.nicescroll');

(function(PxLoader, PxLoaderImage) {
	
	var hands=[{"title":"Royal flush","data":"royal_flush","card_1":"1.svg","card_1_status":"active","card_2":"13.svg","card_2_status":"active","card_3":"12.svg","card_3_status":"active","card_4":"11.svg","card_4_status":"active","card_5":"10.svg","card_5_status":"active","description":"A royal flush is an ace high straight flush. For example, A-K-Q-J-10 all of diamonds."},{"title":"Straight flush","data":"straight_flush","card_1":"5.svg","card_1_status":"active","card_2":"6.svg","card_2_status":"active","card_3":"7.svg","card_3_status":"active","card_4":"8.svg","card_4_status":"active","card_5":"9.svg","card_5_status":"active","description":"A straight flush is a five-card straight, all in the same suit. For example, 7-6-5-4-3 all of clubs."},{"title":"Four of a kind","data":"four_of_kind","card_1":"11.svg","card_1_status":"active","card_2":"24.svg","card_2_status":"active","card_3":"37.svg","card_3_status":"active","card_4":"50.svg","card_4_status":"active","card_5":"17.svg","card_5_status":"passive","description":"Four of a kind, or quads, are four cards of equal value. For example, four jacks."},{"title":"Full house","data":"full_house","card_1":"51.svg","card_1_status":"active","card_2":"38.svg","card_2_status":"active","card_3":"25.svg","card_3_status":"active","card_4":"33.svg","card_4_status":"active","card_5":"7.svg","card_5_status":"active","description":"A full house contains a set (3) of cards of one value and a pair of another value. For example, Q-Q-Q-2-2."},{"title":"Flush","data":"flush","card_1":"39.svg","card_1_status":"active","card_2":"36.svg","card_2_status":"active","card_3":"35.svg","card_3_status":"active","card_4":"31.svg","card_4_status":"active","card_5":"30.svg","card_5_status":"active","description":"A flush is any 5 cards, all of the same suit. For example, K-Q-9-6-3 all of diamonds."},{"title":"Straight","data":"straight","card_1":"46.svg","card_1_status":"active","card_2":"45.svg","card_2_status":"active","card_3":"31.svg","card_3_status":"active","card_4":"17.svg","card_4_status":"active","card_5":"3.svg","card_5_status":"active","description":"Five cards of sequential value. Every possible straight will contain either a 5 or a 10. For example, 7-6-5-4-3 with different suits."},{"title":"Three of a kind","data":"three_of_kind","card_1":"27.svg","card_1_status":"active","card_2":"14.svg","card_2_status":"active","card_3":"1.svg","card_3_status":"active","card_4":"17.svg","card_4_status":"passive","card_5":"2.svg","card_5_status":"passive","description":"Three cards of the same value. For example, three aces.\n"},{"title":"Two pairs","data":"two_pairs","card_1":"11.svg","card_1_status":"active","card_2":"24.svg","card_2_status":"active","card_3":"8.svg","card_3_status":"active","card_4":"21.svg","card_4_status":"active","card_5":"45.svg","card_5_status":"passive","description":"This is two cards of one value and another two cards of another value. For example, two jacks and two 8s."},{"title":"Pair","data":"pair","card_1":"12.svg","card_1_status":"active","card_2":"51.svg","card_2_status":"active","card_3":"3.svg","card_3_status":"passive","card_4":"32.svg","card_4_status":"passive","card_5":"18.svg","card_5_status":"passive","description":"One pair is two cards of the same rank. For example, two queens."},{"title":"High card","data":"high_card","card_1":"1.svg","card_1_status":"active","card_2":"22.svg","card_2_status":"passive","card_3":"41.svg","card_3_status":"passive","card_4":"33.svg","card_4_status":"passive","card_5":"3.svg","card_5_status":"passive","description":"The hand with the highest card(s) wins. If two or more players hold the highest card, a kicker comes into play (see below)."}];
	var main_cards=[{"stage":"initial","main_card_1_top":"-50","main_card_1_left":"-50","main_card_2_top":"-50","main_card_2_left":"-50","main_card_3_top":"-50","main_card_3_left":"-50","main_card_4_top":"-50","main_card_4_left":"-50","main_card_5_top":"-50","main_card_5_left":"-50"},{"stage":"options","main_card_1_top":"-50","main_card_1_left":"-278","main_card_2_top":"-50","main_card_2_left":"-164","main_card_3_top":"-50","main_card_3_left":"-50","main_card_4_top":"-50","main_card_4_left":"64","main_card_5_top":"-50","main_card_5_left":"179"}];

    var timeline = new TimelineLite();

    var baseDomain = "paradise-moment.indino.co.uk";

    var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
        animationEnd = "webkitAnimationEnd oanimationend msAnimationEnd animationend";
    var loader;

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
        $('.js-poker-hands-menu').on('click', showMenu);
        $('.js-open-menu').on('click', showMenu);
        $('.js-btn-close-right').on('click', closeMenu);
        $('.js-show-hand').on('click', showHand);
    }

//START LOADING

    function loaded() {
        setBorders();
        mainCardHoverOn();
    }

    function setBorders() {
        TweenLite.to(".js-border-horizontal", 1.5, {width:"100%", ease:Power2.easeInOut});
        TweenLite.to(".js-border-vertical", 1.5, {height:"100%", ease:Power2.easeInOut});
    }

    function setNavBorders() {
        TweenLite.to(".js-nav-border-horizontal", 1.5, {width:"100%", ease:Power2.easeInOut});
        TweenLite.to(".js-nav-border-vertical", 1.5, {height:"100%", ease:Power2.easeInOut});
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
        var rotateElem = $(".card-wrap");
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
        TweenLite.to(".js-start", .5, {opacity: "0", ease:Power2.easeInOut});
        $('.nav__flex').addClass('show');
        TweenLite.to(".nav__flex", .5, {opacity: "1", ease:Power2.easeInOut});
        setNavBorders();

    }

    function goBack(e) {
        e.preventDefault();
        mainCardHoverOn();
        var data = $(e.currentTarget).data('main_cards');
        toInitialMainCards();
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
        var data = "initial";
        var rotateElem = $(current).find('.card-wrap');
        mainCardPostion(data);
        moveMainCardsLeft();
        current.addClass('index');
        $(".js-main-card").addClass('wrapped');
        TweenLite.to(".js-main-card", 1, {scale:"0.85", ease:Power2.easeInOut});
        TweenLite.to(current, 1, {scale:"1.3", ease:Power2.easeInOut});
        rotateToFaceUp(rotateElem);
        removeActiveMainCards();
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
        var close = $(parent).find('.btn--close');
        var list = $(parent).find('.nav__list');
        TweenLite.to(parent, 1, {width:"300px", height: "100%", background: "rgba(0,0,0,1)", ease:Power2.easeInOut});
        setTimeout(function(){
            TweenLite.to(".js-btn-close-right", .5, {right: "1px", ease:Power1.easeInOut});
            TweenLite.to(list, 1, {opacity: "1", ease:Power2.easeInOut});
            list.addClass('show');
        }, 1000);
    }

    //close menu
    function closeMenu(e) {
        e.preventDefault();
        var close_right = $(".btn--close__right");
        var close_left = $(".btn--close__left");
        var list = $('.nav__list');
        var parent = $(e.currentTarget).closest('.nav__item');
        TweenLite.to(close_right, .5, {right: "-100%", ease:Power1.easeInOut});
        TweenLite.to(close_left, .5, {right: "-100%", ease:Power1.easeInOut});
        TweenLite.to(".nav__list", .5, {opacity: "0", ease:Power2.easeInOut});
        list.removeClass('show');
        setTimeout(function(){
            TweenLite.to(parent, 1, {width:"151px", height: "30px", background: "rgba(0,0,0,0)", ease:Power2.easeInOut});
        }, 500);
        return false;
    }
    
    //show hand
    function showHand(e){
        e.preventDefault();
        var data = "options";
        var rotateElem = $('.card-wrap');
        var image = $(e.currentTarget).data('hand');
        mainCardHoverOff();
        removeActiveMainCards();
        scaleToInitial();
        moveMainCardsLeftBorder();
        zoomOutMainCards();
        mainCardPostion(data);
        closeMenu(e);
        // rotateDown(rotateElem);
        TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0, onComplete:imagePokerHands, onCompleteParams: [image]}, .1);        
        // imagePokerHands(image);
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
         timeline.staggerTo(".card-wrap", 1, {rotationY:-180, ease:Power2.easeInOut, onComplete:scaleActiveMainCard}, 0.1);
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
    // $(document).ready(preloader);
    init();
})(PxLoader, PxLoaderImage);