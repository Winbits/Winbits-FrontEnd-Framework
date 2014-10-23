// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      FIXEDFOOTER: Footer que se pega hasta abajo 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

/* 
	Descripción del API: 
	Dado un alto mínimo del documento, el footer se pega hasta abajo si dicha dimensión es mayor.
	
	CSS:
	footer {
		.
		.
		.
		width: 100%;
	}
	footer .footer-fixed {
		bottom: 0
		position: fixed;
	}

	Llamada:
	$('footer').fixedFooter()
	
	Opciones:
	clase: Clase que se coloca cuando la página es más alta que el mínimo.
	minHeigth: Alto mínimo (en pixeles)
*/

	jQuery.fn.fixedFooter = function(options){
		var defaults = $.extend({
			clase: 'footer-fixed',
			minHeigth: 500
		}, options),
		//  Método para agregar/remover la clase:
		// obj: Objeto
		addRemoveClass = function(obj){
			// Si el alto de la ventana es menor al mínimo
			// console.log($(document).height() + ' ' + $(window).height() + ' ' + $('body').height());
			var item = 'html';
			if($('.msie8, .msie7, .msie6').length){
				item = 'body';
			}
			if($(item).height() < $(window).height()) {
				// Agregar la clase fixed
				$(obj).addClass(defaults.clase);
			//  Entonces si la ventan es menor al mínimo
			} else {
				// Quitar la clase (si la tiene)
				$(obj).removeClass(defaults.clase);
			}
		};
		// INICIO
		return this.each(function(){
			// Igualar el objeto a una variable
			var $this = this;
			// Llamar al método addRemoveClass para agregar/eliminar clase
			addRemoveClass($this);
			// Si la venta se redimensiona
			$(window).resize(function(){
				//  Llamar al método addRemoveClass para agregar/eliminar clase
				addRemoveClass($this);
			});
		});
	};