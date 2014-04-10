// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      PRELOADER: Ocultar capa de precarga cuando termine el DOM
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.preloader = function(){
		this.each(function(){
			$(this).css('visibility', 'hidden');
		});
	};