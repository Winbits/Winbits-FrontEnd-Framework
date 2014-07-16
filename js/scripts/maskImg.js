// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      MASKIMG: Mueve la mitad de los pixeles sobrantes en la imagen para enmascararla
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.maskImg = function(options){
		var defaults = $.extend({
			date: 'leftmargin',
			css: 'marginLeft'
		}, options);
		return this.each(function(){
			if(!$(this).data(defaults.date)){
				var parent = $(this).parent().outerWidth(),
					objeto = $(this).outerWidth();
				$(this).css(defaults.css, '-' + (objeto - parent) / 2 + 'px');
			} else {
				$(this).css(defaults.css, '-' + $(this).data(defaults.date) + 'px');
			}
		});
	};