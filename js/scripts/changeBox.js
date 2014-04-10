// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CHANGEBOX: Cambiar div para seleccionar direccion/tarjeta
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.changeBox = function(options){
		var defaults = $.extend({
			activo: 'selected',
			items: 'div',
			inputRadio: 'input[type="radio"]'
		}, options),
		changeSelected = function(obj){
			$(obj).on('click', defaults.items, function(){
				unselectRadio(obj);
				$(obj).find(defaults.items).removeClass(defaults.activo);
				$(this).addClass(defaults.activo);
				$(this).find(defaults.inputRadio).attr('checked', true);
			});
		},
		unselectRadio = function(obj){
			$(obj).find(defaults.items).find(defaults.inputRadio).attr('checked', false);
		};
		return this.each(function(){
			changeSelected(this);
		});
	};