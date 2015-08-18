// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      IMAGEPRODUCT: Colocar imagen grande desde carrusel derecho
//		Dependencias: jquery.zoom.js
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.imageProduct = function(options){
		var defaults = $.extend({
			container: '.imageProduct-img',
			imgs: '.imageProduct-slide',
			activeSlide: false,
			zoom: true,
			evento: 'click',
			clickClass: 'imageProduct-current'
		}, options), bigImage, firstChild, imagenes, imagenGrande,
		asignaValues = function(obj){
			bigImage = $(obj).find(defaults.container);
			imagenes = $(obj).find(defaults.imgs+' img');
			if(defaults.activeSlide){
				firstChild = imagenes.parent().parent().find(defaults.activeSlide).find('img').first();
			} else {
				firstChild = imagenes.first();
			}
			if(firstChild.data('image')){
				imagenGrande = firstChild.data('image');
			} else {
				imagenGrande = firstChild.attr('src');
			}
			firstChild.parent().addClass(defaults.clickClass).siblings().removeClass(defaults.clickClass);
			imgGrande();
		},
		imgGrande = function(){
			bigImage.html('<img src="'+ imagenGrande +'" alt="'+ firstChild.attr('alt') +'">').hide().fadeIn();
			if(defaults.zoom){
				bigImage.zoom();
			}
			asignaImages();
		},
		asignaImages = function(){
			imagenes.each(function(){
				var imgBg;
				if($(this).data('image')){
					imgBg = $(this).data('image');
				} else {
					imgBg = $(this).attr('src');
				}
				$(this).on(defaults.evento , function(){
					$(this).parent().addClass(defaults.clickClass).siblings().removeClass(defaults.clickClass);
					if(defaults.zoom){
						bigImage.trigger('zoom.destroy');
					}
					bigImage.find('img').attr({
						src: imgBg,
						alt: $(this).attr('alt')
					}).hide().fadeIn();
					if(defaults.zoom){
						bigImage.zoom();
					}
				});
			});
		};
		return this.each(function(){
			asignaValues(this);
		});
	};