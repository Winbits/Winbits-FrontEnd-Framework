// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CAROUSELVERTICALSWIPER: Iniciar carruseles on Swiper Vertical
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.carruselVerticalSwiper = function(options){
		var defaults = $.extend({
			slide: 'carrusel-slide',
			wrapper: 'carrusel-wrapper',
			scrollbar: '.carrusel-scrollbar'
		}, options),
		iniciaSwiper = function(obj){
			var swiperOptions = {
				mode: 'vertical',
				scrollContainer: true,
				grabCursor: true,
				scrollbar: {
					container: defaults.scrollbar
				},
				slideClass: defaults.slide,
				wrapperClass: defaults.wrapper
			},
			swiper = new Swiper(obj, swiperOptions);
		},
		calculaAlto = function(obj){
			var altoSlide = $(obj).find('.'+defaults.slide).outerHeight(),
				altoObj = $(obj).outerHeight();
			if(altoSlide > altoObj){
				iniciaSwiper(obj);
			}
		};
		return this.each(function(){
			calculaAlto(this);
		});
	};