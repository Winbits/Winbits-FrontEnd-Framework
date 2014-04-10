// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      IMAGEERROR: Poner imagen de error cuando no la encuentre
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.imageError = function(){
		var defaults = {
			src: 'images/misc/noImge.jpg',
			alt: 'No se encontró la imagen'
		};
		return this.each(function(){
			$(this).error(function(){
				$(this).attr({
					src: defaults.src,
					alt: defaults.alt
				});
			});
		});
	};