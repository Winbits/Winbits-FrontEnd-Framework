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
				swiper.addCallback('TouchEnd', function(swiper){
					removeArrows(obj, swiper, 1);
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
					removeArrows(obj, swiper);
				}
			});
			$(obj).siblings(defaults.arrowRight).on('click', function(e) {
				e.stopPropagation();
				$(this).siblings(defaults.arrowLeft).slideDown();
				swiper.swipeNext();
				if(!(defaults.loop)){
					removeArrows(obj, swiper);
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
			removeArrows(obj, swiper);
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
			if(size > defaults.slidesNum){
				initSwiper(obj);
			} else {
				$(obj).siblings(defaults.arrowLeft).hide();
				$(obj).siblings(defaults.arrowRight).hide();
			}
		},
		removeArrows = function(obj, swiper, plus){
			var active = 0,
				pointOfNoReturn = size - (defaults.slidesNum - 1),
				left = $(obj).siblings(defaults.arrowLeft),
				right = $(obj).siblings(defaults.arrowRight);
			active =+ plus;
			$(obj).find(defaults.slideCSS).each(function(i){
				if($(this).hasClass('swiper-slide-active')){
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
		};
		return this.each(function(index){
			var obj = 'swiperCarrusel-'+index;
			$(this).addClass(obj);
			calculateSize(this);
		});
	};