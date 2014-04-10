// +++++++++++++++++++++++++++++++++++++++++
//      REQUIREDFIELD: Campos requeridos
//		Dependencias: toolTip.js
// +++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.requiredField = function (options) {
		var defaults = $.extend({
			wrapper: 'required-wrapper',
			icon: 'iconFont-star'
		}, options),
		wrappingInput = function(obj){
			$(obj).wrap('<div class="'+ defaults.wrapper +'"/>');
			$(obj).parent().append('<span class="'+ defaults.icon +'" data-tooltip="'+ $(obj).data('requiredfield')+'"/>');
			$(obj).siblings('.'+defaults.icon).toolTip();
		};
		return this.each(function(){
			wrappingInput(this);
		});
	};