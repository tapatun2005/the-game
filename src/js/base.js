require('gsap');
require('jquery.nicescroll');

(function(PxLoader, PxLoaderImage) {

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
		loaded();
		mainScreen();
	}

	function loaded() {
		TweenLite.to(".js-border-horizontal", 1.5, {width:"100%", ease:Power2.easeInOut});
		TweenLite.to(".js-border-vertical", 1.5, {height:"100%", ease:Power2.easeInOut});
	}
	
	function mainScreen() {
		TweenLite.to(".main_card_1", 1, {left:"12%", ease:Power2.easeInOut});
		TweenLite.to(".main_card_2", 1, {left:"31%", ease:Power2.easeInOut});
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