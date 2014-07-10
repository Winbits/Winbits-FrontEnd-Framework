// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      IMAGEERROR: Poner imagen de error cuando no la encuentre
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.imageError = function(options){
		var defaults = $.extend({
			src: 'images/misc/noImage.jpg',
			alt: 'No se encontró la imagen'
		}, options);
		return this.each(function(){
			$(this).error(function(){
				$(this).attr({
					src: defaults.src,
					alt: defaults.alt
				});
			});
		});
	};