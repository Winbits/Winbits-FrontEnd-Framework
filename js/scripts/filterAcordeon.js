jQuery.fn.filterAcordeon = function(options){
			var defaults = $.extend({
				trigger: '.openAcordeon',
				claseactivo: 'iconFont-down',
				claseinactivo: 'iconFont-up',
				contenedor: '.clickoneroFilter-sub'
			}, options);
			return this.each(function(){
				var _this = this;
				if($(_this).find(defaults.contenedor).find('input').length > 0){
					$(_this).find(defaults.trigger).addClass(defaults.claseinactivo).removeClass(defaults.claseactivo);
				} else {
					$(_this).find(defaults.contenedor).stop().slideUp();
				}
				$(this).find(defaults.trigger).click(function(){
					if($(this).hasClass(defaults.claseactivo)){
						$(_this).find(defaults.contenedor).stop().slideDown();
						$(this).addClass(defaults.claseinactivo).removeClass(defaults.claseactivo);
					} else {
						$(_this).find(defaults.contenedor).stop().slideUp();
						$(this).addClass(defaults.claseactivo).removeClass(defaults.claseinactivo);
					}
				});
			});
		};