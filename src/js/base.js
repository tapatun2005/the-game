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
		$('.js-start').on('click', showOptionList);
		$('.js-main-card').on('click', showOption);
	}

	function showOptionList(e) {
		e.preventDefault();
		var data = $(e.currentTarget).data('main_cards');
		initialMainCards();
		$('.main-cards').addClass('active');
		setTimeout(function(){
			mainCardPostion(data);
			moveMainCardsCenter();
		},750);
		setTimeout(function(){
			removezIndex();
		}, 2000);

	}

	function showOption(e) {
		e.preventDefault();
		var current = $(e.currentTarget);
		var data = "initial";
		var rotateElem = $(current).find('.card-wrap');
		mainCardPostion(data);
		moveMainCardsLeft();
		current.addClass('index');
		TweenLite.to(".js-main-card", 1, {scale:"0.85", ease:Power2.easeInOut});
		TweenLite.to(current, 1, {scale:"1.3", ease:Power2.easeInOut});
		TweenLite.to(rotateElem, 1.2, {rotationY:"-145", ease:Power2.easeInOut});
	}

	function removezIndex() {
		$('.js-main-card').removeClass('index');
	}

	function moveMainCardsLeft() {
		TweenLite.to(".main-cards", 1.5, {x:"-75%", ease:Power2.easeInOut});
	}
	function moveMainCardsCenter() {
		TweenLite.to(".main-cards", 1.5, {x:"-50%", ease:Power2.easeInOut});
	}
	function initialMainCards() {
		TweenLite.to(".card-wrap", 1, {rotationY:"0", scale: "1", ease:Power0});
		setTimeout (function(){
			TweenLite.to(".js-main-card", 1, {scale:"1", ease:Power2.easeInOut});
		},1000);
	}



	function loaded() {
		setBorders();
	}

	function setBorders() {
		TweenLite.to(".js-border-horizontal", 1.5, {width:"100%", ease:Power2.easeInOut});
		TweenLite.to(".js-border-vertical", 1.5, {height:"100%", ease:Power2.easeInOut});
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

	
	// function defaultToFacebook(e) {
	// 	e.preventDefault();
	// 	FB.ui({
	// 	  method: 'feed',
	// 	  name: "Paradise Moment",
	// 	  link: baseDomain,
	// 	  caption: "#MyParadaiseMoment",
	// 	  description: "Want to brush up on your photography skills? @Sovereignluxury holidays have teamed up with 6 experts to help you take the perfect picture. Share your own #MyParadaiseMoment to win £1000 here: ",
	// 	  picture: baseDomain + 'images/share_image.jpg'
	// 	});
	// }

	// function postScoreToTwitter(e) {
	// 	e.preventDefault();
	// 	var element = $(e.currentTarget);
	// 	// e.preventDefault();
	// 	var params = {
	// 		text: "I've entered @Sovereignluxury photography competition to win £1000. See my #MyParadiseMoment here:",			
	// 		url: "http://paradise-moment.indino.co.uk/"
	// 	};
		
	// 	element.prop('href', 'https://twitter.com/intent/tweet?' + $.param(params));
	// 	var width  = 575,
 //        	height = 400,
	//         left   = ($(window).width()  - width)  / 2,
	//         top    = ($(window).height() - height) / 2,
	//         url    = this.href,
	//         opts   = 	'status=1' +
 //                 		',width='  + width  +
 //                 		',height=' + height +
 //                 		',top='    + top    +
 //                 		',left='   + left;
    
 //    	window.open(url, 'twitter-share', opts);
 
	//     return false;
	// 	//https://twitter.com/intent/tweet?text=What would you make rose gold? Join in %23makeitrosegold for your chance to win your own rose gold watch&amp;url=http://www.watchwarehouse.co.uk/blog/make-it-rose-gold/
	// }
	// $(document).ready(preloader);
	init();

})(PxLoader, PxLoaderImage);