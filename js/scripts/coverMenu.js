// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      COVERMENU: Cubre el 100% el espacio derecho/izquierdo del menú
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.coverMenu = function(options){
		var defaults = $.extend({
			coverDiv: '.coverMenu',
			coverDivClass: '.coverMenu-class'
		}, options);
		return this.each(function(){
			$(this).on({
				mouseenter: function(){
					$(defaults.coverDiv).addClass(defaults.coverDivClass);
				},
				mouseleave: function(){
					$(defaults.coverDiv).removeClass(defaults.coverDivClass);
				}
			});
		});
	};