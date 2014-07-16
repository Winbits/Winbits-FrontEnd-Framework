// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CAROUSELSWIPER: Iniciar carruseles on Swiper
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.carouselSwiper = function(options){
		var defaults = $.extend({
			arrow: true,
			arrowLeft: '.arrowLeft',
			arrowRight: '.arrowRight',
			slidesNum: 0,
			slideCSS: '.carrusel-slide',
			loop: false,
			optionsSwiper: {
				grabCursor: true,
				useCSS3Transforms: false
			},
			calculateHeight: false,
			onClickSlide: false,
			initialSlide: false
		}, options),
		size = 0,
		initSwiper = function(obj){
			var swiper = new Swiper (obj, defaults.optionsSwiper);
			if(!(defaults.loop)){
				swiper.addCallback('TouchEnd', function(){
					$(obj).removeArrows({
						addCallback: 1,
						arrowLeft: defaults.arrowLeft,
						arrowRight: defaults.arrowRight,
						slidesNum: defaults.slidesNum,
						slideCSS: defaults.slideCSS
					});
				});
			}if(defaults.initialSlide){
				initialSlide(obj, swiper);
			}
			if(defaults.arrow){
				initArrow(obj, swiper);
			}
			if(defaults.calculateHeight){
				calculateHeight(obj, swiper);
				swiper.params.onSlideChangeStart = function(swiper){calculateHeight(obj, swiper);};
			}
			
			if(defaults.onClickSlide){
				$(obj).find(defaults.slideCSS).on('click', function(e){
					e.stopPropagation();
					defaults.onClickSlide(swiper);
				});
			}
			swiper.params.queueStartCallbacks = true;
			swiper.params.queueEndCallbacks = true;
		},
		initArrow = function(obj, swiper){
			$(obj).siblings(defaults.arrowLeft).on('click', function(e) {
				e.stopPropagation();
				$(this).siblings(defaults.arrowRight).slideDown();
				swiper.swipePrev();
				if(!(defaults.loop)){
					$(obj).removeArrows({
						arrowLeft: defaults.arrowLeft,
						arrowRight: defaults.arrowRight,
						slidesNum: defaults.slidesNum,
						slideCSS: defaults.slideCSS
					});
				}
			});
			$(obj).siblings(defaults.arrowRight).on('click', function(e) {
				e.stopPropagation();
				$(this).siblings(defaults.arrowLeft).slideDown();
				swiper.swipeNext();
				if(!(defaults.loop)){
					$(obj).removeArrows({
						arrowLeft: defaults.arrowLeft,
						arrowRight: defaults.arrowRight,
						slidesNum: defaults.slidesNum,
						slideCSS: defaults.slideCSS
					});
				}
			});
		},
		initialSlide = function(obj, swiper){
			var index = 0;
			$(obj).find(defaults.slideCSS).each(function(i){
				if($(this).find(defaults.initialSlide).length){
					index = i;
				}
			});
			swiper.swipeTo(index);
			$(obj).removeArrows({
				arrowLeft: defaults.arrowLeft,
				arrowRight: defaults.arrowRight,
				slidesNum: defaults.slidesNum,
				slideCSS: defaults.slideCSS
			});
		},
		calculateHeight = function(obj, swiper){
			var altura = $(swiper.activeSlide()).outerHeight();
			$(obj).animate({
				height: altura+'px'
			});
			$(obj).siblings(defaults.arrowRight+', '+defaults.arrowLeft).css('top', altura / 2 +'px');
		},
		calculateSize = function(obj){
			size = parseInt($(obj).find(defaults.slideCSS).size(), 10);
			if(defaults.initialSlide){
				$(obj).find(defaults.slideCSS).each(function(i){
					$(this).addClass('slide'+i);
				});
			}
			if(defaults.slidesNum){
				if(size > defaults.slidesNum){
					initSwiper(obj);
				} else {
					$(obj).siblings(defaults.arrowLeft).hide();
					$(obj).siblings(defaults.arrowRight).hide();
				}
			} else {
				if(size > 2){
					initSwiper(obj);
				} else {
					$(obj).siblings(defaults.arrowLeft).hide();
					$(obj).siblings(defaults.arrowRight).hide();
				}
			}
		};
		return this.each(function(index){
			var obj = 'swiperCarrusel-'+index;
			$(this).addClass(obj);
			calculateSize(this);
		});
	};

	jQuery.fn.removeArrows = function(options){
		var defaults = $.extend({
			slideCSS: '.carrusel-slide',
			slidesNum: 0,
			arrowLeft: '.arrowLeft',
			arrowRight: '.arrowRight',
			slideActive: 'swiper-slide-active',
			addCallback: 0
		}, options);
		return this.each(function(){
			var active = 0,
				size = $(this).find(defaults.slideCSS).size(),
				pointOfNoReturn = size - (defaults.slidesNum - 1),
				left = $(this).siblings(defaults.arrowLeft),
				right = $(this).siblings(defaults.arrowRight);
			if(size > defaults.slidesNum){
				active =+ defaults.addCallback;
				$(this).find(defaults.slideCSS).each(function(i){
					if($(this).hasClass(defaults.slideActive)){
						active = i+1;
					}
				});
				if(active <= 1){
					left.slideUp();
					right.slideDown();
				} else if(active >= pointOfNoReturn){
					left.slideDown();
					right.slideUp();
				} else {
					left.slideDown();
					right.slideDown();
				}
			} else {
				left.hide();
				right.hide();
			}
		});
	};