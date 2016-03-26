require('gsap');
require('jquery.nicescroll');

(function(PxLoader, PxLoaderImage) {

	var baseDomain = "paradise-moment.indino.co.uk";

	var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
		animationEnd = "webkitAnimationEnd oanimationend msAnimationEnd animationend";
	var loader;
	var main_cards = [{"stage":"initial","main_card_1_top":-50,"main_card_1_left":-50,"main_card_2_top":-50,"main_card_2_left":-50,"main_card_3_top":-50,"main_card_3_left":-50,"main_card_4_top":-50,"main_card_4_left":-50,"main_card_5_top":-50,"main_card_5_left":-50},{"stage":"options","main_card_1_top":-50,"main_card_1_left":-278,"main_card_2_top":-50,"main_card_2_left":-164,"main_card_3_top":-50,"main_card_3_left":64,"main_card_4_top":-50,"main_card_4_left":179,"main_card_5_top":-50,"main_card_5_left":-50}];

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
		$('.js-back').on('click', showOptionListBack);
		$('.js-main-card').on('click', showOption);
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
			TweenLite.to(".js-main-card", 0.5, {scale:"1", opacity:"1", ease:Power2.easeInOut});
		} else {
			showOption(e);
		}
	}
//END


//OPTION LIST
	function toInitialMainCards() {
		TweenLite.to(".card-wrap", 1, {rotationY:"0", scale: "1", ease:Power0});
		setTimeout (function(){
			TweenLite.to(".js-main-card", 1, {scale:"1", ease:Power2.easeInOut});
		},1000);
	}

	function showOptionListStart(e) {
		e.preventDefault();
		var data = $(e.currentTarget).data('main_cards');
		toInitialMainCards();
		mainCardPostion(data);
		moveMainCardsCenter();
		removezIndex();
		$('.main-cards').addClass('active');
	}

	function showOptionListBack(e) {
		e.preventDefault();
		mainCardHoverOn();
		var data = $(e.currentTarget).data('main_cards');
		toInitialMainCards();
		$('.js-main-card').removeClass('wrapped');
		$('.main-cards').addClass('active');
		TweenLite.to(".js-main-card", 0.5, {scale:"1", opacity:"1", ease:Power2.easeInOut});
		setTimeout(function(){
			mainCardPostion(data);
			moveMainCardsCenter();
		},750);
		setTimeout(function(){
			removezIndex();
		}, 2000);
	}

	function moveMainCardsCenter() {
		TweenLite.to(".main-cards", 1.5, {x:"-50%", ease:Power2.easeInOut});
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
		TweenLite.to(rotateElem, 1.2, {rotationY:"-145", ease:Power2.easeInOut});
	}
	
	function moveMainCardsLeft() {
		TweenLite.to(".main-cards", 1.5, {x:"-75%", ease:Power2.easeInOut});
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


	

	// $(document).ready(preloader);
	init();

})(PxLoader, PxLoaderImage);