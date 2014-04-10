// +++++++++++++++++++++++++++++++++++++++++++++
//      ACCORDEON: Acordeón de filtros
// +++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.acordeon = function(options){
		var defaults = $.extend({
			trigger: 'h2',
			claseActivo: 'activo',
			contenedor: '.accordeonContent',
			icon: '.icon',
			minusIcon: 'minusIcon',
			first: true
		}, options),
		hideFirst = function(obj){
			$(obj).find(defaults.trigger).first().addClass(defaults.claseActivo)
			.find(defaults.icon).addClass(defaults.minusIcon);
			$(obj).find(defaults.contenedor).not(':first').hide();
		},
		clickingAcordeon = function(obj){
			$(obj).find(defaults.trigger).click(function(){
				$(this).next(defaults.contenedor).slideToggle();
				$(this).toggleClass(defaults.claseActivo).find(defaults.icon)
				.toggleClass(defaults.minusIcon);
			});
		};
		return this.each(function(){
			if(defaults.first){
				hideFirst(this);
			} else {
				$(this).find(defaults.contenedor).hide();
			}
			clickingAcordeon(this);
		});
	};