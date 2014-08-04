// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      DATEPICKER: Calendario desplegable
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.datePicker = function(options){
		$.datepicker.setDefaults($.datepicker.regional['es']);
		var defaults = $.extend({
				wrapper: 'datepicker-wrapper',
				option: {
					showOn: 'both',
					minDate: 0
				}
			}, options),
		initDatepicker = function(obj){
			$(obj).datepicker(defaults.option);
		},
		wrappingDatepicker = function(obj){
			$(obj).wrap('<div class="'+ defaults.wrapper + '"/>');
			initDatepicker(obj);
		};
		return this.each(function(){
			wrappingDatepicker(this);
		});
	};