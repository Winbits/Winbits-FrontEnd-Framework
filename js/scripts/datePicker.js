// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      DATEPICKER: Calendario desplegable
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.datePicker = function(options){
		$.datepicker.setDefaults($.datepicker.regional['es']);
		var defaults = $.extend({
				wrapper: 'datepicker-wrapper'
			}, options),
		initDatepicker = function(obj){
			$(obj).datepicker({
				showOn: 'both',
				minDate: 0
			});
		},
		wrappingDatepicker = function(obj){
			$(obj).wrap('<div class="'+ defaults.wrapper + '"/>');
			initDatepicker(obj);
		};
		return this.each(function(){
			wrappingDatepicker(this);
		});
	};