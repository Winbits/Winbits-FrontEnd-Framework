// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      chooseDate: Elegir entre dos fechas, ideal para planer viaje
// 		Dependencias: datePicker.js, toolTip.js, jQueryUI.js
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
	Descripción del API: 
	Necesita un div wrapper, dos divs que alojen cada input y dentro de estos,
	un ícono para eliminar la fecha.
	
	HTML:
	<div class="datePicker-div"> // D wrapper
		<div class="divFrom"> // Div donde se pondrá la fecha inicial
			<input class="fromDate" type="text"> // Input donde se pone la fecha inicial y desde donde sale el primer calendario
			<span class="iconFont-close" title="Remover Fecha"></span> // Ìcono para resetar la fecha
		</div>
		<span class="toSpan">-</span> // Separador de las fechas
		<div class="divTo"> // Div donde se pondrá la fecha final
			<input class="toDate" type="text"> // Input donde se pone la fecha final y dede donde sale el segundo calendario
			<span class="iconFont-close" title="Remover Fecha"></span> // Ìcono para resetar la fecha
		</div>
	Llamada:
	$('.datePicker-div').chooseDate();
	
	Opciones:
	fromDate: Input donde se pone la fecha inicial
	fromDateDiv: Div donde se encuentra el input de fecha inicial
	toDate: Input donde se pone la fecha final
	toDateDiv: Div donde se encuentra el input de fecha final
	to Text: Separador de fechas.
	refreshBtn: Ícono para eliminar la fecha; debe ser igual en los dos divs.
	datapickerWrapper: Clase heredada de datePicker.js. Wrapper que envuelve al input de ambas fechas.
	hasDatepicker: Clase heredada de jQueryUI, la cual se pone cuando se iniciliza el calendario.
	defaultDate: Fecha inicial. Por default es el día actual.
	minDate: Fecha mínima. Por default es 0 que equivale al día actual.
*/
	jQuery.fn.chooseDate = function (options) {
		var defaults = $.extend({
			fromDate: '.fromDate',
			fromDateDiv: '.divFrom',
			toDate: '.toDate',
			toDateDiv: '.divTo',
			toText: '.toSpan',
			refreshBtn: '.iconFont-close',
			datepickerWrapper: '.datepicker-wrapper',
			hasDatepicker: '.hasDatepicker',
			defaultDate: '+1w',
			minDate: 0

		}, options),
		// Método para inicializar el datepicker del jQueryUI:
		// obj: El objeto que contiene toda la fecha
		// froDate: El input que se inicializará
		// toDate: El otro input que cambiará sus atributos
		// minmax: Si el valor es para cambiar la fecha mínma o máxima
		// slideDiv: Si es el primer input, el nombre del padre del otro input
		datePicker = function(obj, fromDate, toDate, minmax, slideDiv){
			$(obj).find(fromDate).datePicker({
				// Opciones que se pasan directamente a jQueryUI
				option: {
					// Fecha inicial 
					defaultDate: defaults.defaultDate,
					// Fecha mínima
					minDate: defaults.minDate,
					// Opción para mostrar en el click del input y en el click en el ícono
					showOn: 'both',
					// Método que dispara cuando se selecciona la fecha en el calendario
					onSelect: function(dateText){
						// Si necesito el padre del otro calendario (en el primer calendario)
						if(slideDiv){
							// Muestra el separador
							$(defaults.toText).slideDown();
							// Muestra el padre del otro calendario
							$(slideDiv).slideDown();
						}
						// Cambia la opción en el otro calendario de la fecha mínima o máxima, dependiendo de la fecha que se elija
						$(toDate).datepicker('option', minmax, dateText);
					}
				}
			});
		},
		// 1. Método para forzar el foco en la primer fecha cuando se de click en todo el objeto (la primera vez)
		focusFrom = function(obj){
			$(obj).click(function(){
				// Foco en el primer objeto
				$(defaults.fromDate).focus();
				// Quita el bind del click en el objeto
				$(obj).unbind('click');
			});
		},
		// 2. Método para inicializar el input de la primera fecha
		fromDate = function(obj){
			// Llamada al método datePicker para inicializar el input
			datePicker(obj, defaults.fromDate, defaults.toDate, 'minDate', defaults.toDateDiv);
			// Función del click en el botón hermano para resetar la fecha dentro del div
			$(obj).find(defaults.fromDateDiv).find(defaults.refreshBtn).click(function(e){
				// Prevenir eventos default en el click
				e.preventDefault();
				// Muestra el padre del otro input
				$(obj).find(defaults.toDateDiv).slideUp();
				// Muestra el separador
				$(obj).find(defaults.toText).slideUp();
				// Quita cualquier valor en el otro input
				$(obj).find(defaults.toDateDiv).find(defaults.hasDatepicker).val('');
				// Destruye el datepicker en este input
				$(obj).find(defaults.fromDate).datepicker('destroy');
				// Y vuelve a crearlo para borrar cualquier feche
				datePicker(obj, defaults.fromDate, defaults.toDate, 'minDate', defaults.toDateDiv);
				// Borra cualquier valor en este input
				$(obj).find(defaults.fromDateDiv).find(defaults.hasDatepicker).val('').focus();
			// Inicializa el tooltip en el botón para resetear
			}).toolTip();
		},
		// 3. Método para inicializar el input de la segunda fecha
		toDate = function(obj){
			// Llamada al método datePicker para inicilizar el input
			datePicker(obj, defaults.toDate, defaults.fromDate, 'maxDate');
			// Función del click en el botón hermano para resetear la fecha dentro del div, cuando le des click
			$(obj).find(defaults.toDateDiv).find(defaults.refreshBtn).click(function(e){
				// Prevenir eventos default en el click
				e.preventDefault();
				// Borra cualquier valor en este input
				$(obj).find(defaults.toDateDiv).find(defaults.hasDatepicker).val('');
			// Inicializa el tooltip en el botón para resetear
			}).toolTip();
		},
		// 4. Método para ocultar el separador y el input para la segunda fecha
		hideObjs = function(obj){
			$(obj).find(defaults.toText+', '+defaults.toDateDiv).hide();
		};
		// INICIO
		return this.each(function(){
			// Enfoca en el primer input en el primer click a este objeto
			focusFrom(this);
			// Inicializa el primer input
			fromDate(this);
			// Inicializa el segundo input
			toDate(this);
			// Oculta separador y segundo input
			hideObjs(this);
		});
	};