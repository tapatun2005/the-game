require('gsap');
require('jquery.nicescroll');

(function(PxLoader, PxLoaderImage) {

	var timeline = new TimelineLite();

	var baseDomain = "paradise-moment.indino.co.uk";

	var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
		animationEnd = "webkitAnimationEnd oanimationend msAnimationEnd animationend";
	var loader;
	var main_cards = [{"stage":"initial","main_card_1_top":-50,"main_card_1_left":-50,"main_card_2_top":-50,"main_card_2_left":-50,"main_card_3_top":-50,"main_card_3_left":-50,"main_card_4_top":-50,"main_card_4_left":-50,"main_card_5_top":-50,"main_card_5_left":-50},{"stage":"options","main_card_1_top":-50,"main_card_1_left":-278,"main_card_2_top":-50,"main_card_2_left":-164,"main_card_3_top":-50,"main_card_3_left":-50,"main_card_4_top":-50,"main_card_4_left":64,"main_card_5_top":-50,"main_card_5_left":179}];

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
		$('.js-start').on('click', showOptionListStart);
		$('.js-back').on('click', goBack);
		$('.js-main-card').on('click', showOption);
		$('.js-poker-hands-menu').on('click', showPokerHandsMenu);
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
	function showOptionListStart(e) {
		e.preventDefault();
		var current = $(e.currentTarget);
		var data = $(current).data('main_cards');
		toInitialMainCards();
		mainCardPostion(data);
		moveMainCardsCenter();
		removezIndex();
		current.addClass('hide');
		TweenLite.to(".js-start", .5, {opacity: "0", ease:Power2.easeInOut});
		addActiveMainCards();
	}

	function goBack(e) {
		e.preventDefault();
		mainCardHoverOn();
		var data = $(e.currentTarget).data('main_cards');
		toInitialMainCards();
		$('.js-main-card').removeClass('wrapped');
		$('.main-cards').addClass('active');
		TweenLite.to(".js-main-card", 0.5, {scale:"1", opacity:"1", ease:Power2.easeInOut});
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
	function showPokerHandsMenu(e) {
		e.preventDefault();
		var current = $(e.currentTarget);
		var parent = $(current).closest('.nav__item');
		var close = $(parent).find('.btn--close');
		var list = $(parent).find('.nav__list');
		TweenLite.to(current, 1, {width:"300px", height: "100%", background: "rgba(0,0,0,1)", ease:Power2.easeInOut});
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
		TweenLite.to(close_right, .5, {right: "-100%", ease:Power1.easeInOut});
		TweenLite.to(close_left, .5, {right: "-100%", ease:Power1.easeInOut});
		TweenLite.to(".nav__list", .5, {opacity: "0", ease:Power2.easeInOut});
		list.removeClass('show');
		setTimeout(function(){
			TweenLite.to(".js-poker-hands-menu", 1, {width:"151px", height: "40px", background: "rgba(0,0,0,0)", ease:Power2.easeInOut});
		}, 500);
		return false;
	}
	
	//show hand
	function showHand(e){
		e.preventDefault();
		var data = "options";
		var rotateElem = $('.card-wrap');
		mainCardHoverOff();
		removeActiveMainCards();
		scaleToInitial();
		moveMainCardsLeftBorder();
		zoomOutMainCards();
		mainCardPostion(data);
		closeMenu(e);
		rotateDown(rotateElem);
		// rotateToFaceDown(rotateElem);
		// rotateOneByOne(rotateElem);
		return false;
	}


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
		TweenLite.to(rotateElem, 1.2, {rotationY:"-145", ease:Power2.easeInOut});
	}

	function rotateToFaceUpFull(rotateElem){
		TweenLite.to(rotateElem, 1.5, {rotationY:"-180", ease:Power2.easeInOut});
	}

	function rotateDown(rotateElem) {
		TweenLite.to(rotateElem, 1, {rotationY:"0", scale: "1", ease:Power0, onComplete:rotateOneByOne}, .1);
	}

	function rotateOneByOne() {
		timeline.staggerTo(".card-wrap", 1, {rotationY:-180, ease:Power2.easeInOut}, 0.1);
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