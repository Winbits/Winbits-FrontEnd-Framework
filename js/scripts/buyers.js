// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      BUYERS: Lo que estan comprando los usuarios en el Home
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.buyers = function(options){
		var defaults = {
			wrapper: '.buyers-wrapper',
			slide: '.buyers-slide',
			classLastChild: 'lastChild',
			classFirstChild: 'firstChild',
			tiempo: 500
		},
		calculaAncho = function(obj){
			var $this = $(obj),
				$slides = $this.find(defaults.slide),
				ancho = 0;
			$slides.each(function(i){
				$(this).css('left', ancho+'px');
				ancho += $(this).outerWidth()+parseInt($(this).css('marginRight'),10);
				if(i === 5){
					$(this).addClass(defaults.classLastChild);
				} else if(i === 0) {
					$(this).addClass(defaults.classFirstChild);
				}
			});
			$this.find(defaults.wrapper).css('width', ancho+'px');
		},
		cambiaSlide = function(obj){
			var $this = $(obj),
				$lastChild = $this.find('.'+defaults.classLastChild),
				$firstChild = $this.find('.'+defaults.classFirstChild),
				$slides = $this.find(defaults.slide),
				ancho = 0;
			$firstChild.slideUp(defaults.tiempo, function(){
				$slides.each(function(i){
					var $slide = $(this);
					$slide.attr('data-index', i);
					if(!($slide.hasClass(defaults.classFirstChild))){
						$slide.animate({
							left: ancho+'px'
						});
						ancho += $(this).outerWidth()+parseInt($(this).css('marginRight'),10);
					} else {
						$slide.appendTo($this.find(defaults.wrapper));
					}
					$lastChild.slideDown(defaults.tiempo, function(){
						if(i === 0){
							$slide.addClass(defaults.classFirstChild);
						} else if(i === 5){
							$slide.addClass(defaults.classLastChild);
						} else {
							$slide.removeClass(defaults.classFirstChild).removeClass(defaults.classLastChild);
						}
					});
				});
			});
		};
		return this.each(function(){
			if(options){
				defaults = $.extend(defaults, options);
			}
			var obj = this,
				cambiaIntervalo = function(){
					cambiaSlide(obj);
					var intervalo = Math.round(Math.random()*(1000+10000))+500;
					setTimeout(cambiaIntervalo, intervalo);
				};
			calculaAncho(obj);
			cambiaIntervalo();
		});
	};