// ++++++++++++++++++++++++++++++++++++++++++++
//      ACCORDEONFILTER: Acordeón de filtros
// ++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.acordeonFilter = function(options){
		var defaults = $.extend({
			trigger: 'h3',
			claseActivo: 'activo',
			contenedor: '.containerAcordeon'
		}, options);
		return this.each(function(){
			$(this).find(defaults.trigger).click(function(){
				$(this).next(defaults.contenedor).slideToggle();
				$(this).toggleClass(defaults.claseActivo);
			});
		});
	};