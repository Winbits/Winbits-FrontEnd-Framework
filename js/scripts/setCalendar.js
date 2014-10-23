// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SETCALENDAR: Calendario del jQueryUI
// 		Dependencias: jQueryUI1.9.2
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.setCalendar = function(options){
		var defaults = $.extend({
			answers: [[]],
			answerWithClass: 'givePoints',
			answerWithoutClass: 'notGivePoints',
			onSelect: false,
			minDate: '',
			maxDate: '',
		}, options),
		chooseDatepicker = function(obj){
			$(obj).datepicker({
				inline: true,
				beforeShowDay: answerWith,
				onSelect: defaults.onSelect,
				minDate: defaults.minDate,
				maxDate: defaults.maxDate
			});
		},
		answerWith = function(date){
			var regreso = true,
				classe = '',
				checkdate = $.datepicker.formatDate('dd-mm-yy', date);
			for (var i=0; i < defaults.answers.length; i++){
				if(defaults.answers[i][0] === checkdate){
					regreso = false;
					if(defaults.answers[i][1] === 1){
						classe = defaults.answerWithClass;
					} else if(defaults.answers[i][1] === 0){
						classe = defaults.answerWithoutClass;
					}
					
				}
			}
			return [regreso, classe];
		};
		$.datepicker.regional['es'] = {
			closeText: 'Cerrar',
			prevText: '&#x3c;Ant',
			nextText: 'Sig&#x3e;',
			currentText: 'Hoy',
			monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
			'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
			'Jul','Ago','Sep','Oct','Nov','Dic'],
			dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
			dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
			dayNamesMin: ['D','L','M','M','J','V','S'],
			weekHeader: 'Sm',
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};
		$.datepicker.setDefaults($.datepicker.regional['es']);
		return this.each(function(){
			chooseDatepicker(this);
		});
	};