// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CREATEGIFT: Flujo para abrir/cerrar/carrusel del Giftbox (GINGLE)
//		Dependencias: carouselSwiper.js, customRadio.js
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.createGift = function (options) {
		var defaults = $.extend({
			introGift: '.createGift-intro', // Div introducción al flujo
			flowGift: '.createGift-flow', // Div del flujo Create Giftbook
			continueIntroGift: '.createGift-continue a', // Botón dentro del div introducción para abrir el flujo Create Giftbook
			hideFlowGift: '.createGift-hide a', // Botón para ocultar el flujo Create Giftbook
			initObj: 0, // Bandera para iniciar carrusel y radibuttons
			flowCarrusel: '.createGift-carrusel', // Carrusel dentro de Create Giftbook
			flowSlide: 'createGift-slide', // Clase del slide del carrusel dentro de Create Giftbook
			flowWrapper: 'createGift-wrapper', // Clase del wrapper del carrusel dentro de Create Giftbook
			flowCalculateHeigth: true, // Calcular automáticamente el alto del carrusel dentro de Create Giftbook
			flowArrowLeft: '.gingleFont-leftArrow', // Flecha izquierda/Prev del carrusel dentro de Create Giftbook
			flowArrowRight: '.gingleFont-rightArrow', // Flecha derecha/Next del carrusel dentro de Create Giftbook
			flowRadioDiv: '.option-description' // Div donde se encuentran los radiobutton dentro de Create Giftbook
		}, options),
		// Método para abrir Introducción
		openIntro = function () {
			// Mover la página para que se posicione hasta arriba con animación
			$('body, html').animate({
				scrollTop: 0
			}, 500, function(){
				// Cuando acabe la animación de la página, mostrar Introducción
				$(defaults.introGift).slideDown();
			});
		},
		// Método para abrir Create Giftbook
		openFlowGift = function () {
			// Ocultar Introducción
			$(defaults.introGift).slideUp();
			// Mostrar Create Giftbook
			$(defaults.flowGift).slideDown(500, function(){
				// Si la bandera para iniciar carrusel y radibuttons (que por default es 0) esta en la posición default
				if(!defaults.initObj) {
					// Inicia el carrusel y los radiobuttons
					onSlideDown();
					// Cambia el valor de la bandera a 1
					defaults.initObj = 1;
				}
			});
		},
		// Método para iniciar carrusel y radiobuttons
		onSlideDown = function() {
			// Iniciar el carrusel con carouselSwiper.js
			$(defaults.flowCarrusel).carouselSwiper({ // Nombre del carrusel
				optionsSwiper: {
					slideClass: defaults.flowSlide, // Clase del slide del carrusel
					wrapperClass: defaults.flowWrapper, // Clase del wrapper del carrusel 
					calculateHeight: defaults.flowCalculateHeigth // Calcular el alto automáticamente del carrusel
				},
				arrowLeft: defaults.flowArrowLeft, // Flecha izquierda/prev del carrusel
				arrowRight: defaults.flowArrowRight, // Flecha derecha/next del carrusel
				slideCSS: '.'+defaults.flowSlide, // Calse del slide del carrusel
				calculateHeight: defaults.flowCalculateHeigth // Calcular el alto automáticamente del carrusel
			});
			// Iniciar los radiobuttons con customRadio.js
			$(defaults.flowRadioDiv).customRadio();
		},
		// Método para cerrar Create Giftbook desde el botón hide
		closeFlowGift = function () {
			// Ocultar Create Giftbook
			$(defaults.flowGift).slideUp();
		};
		// INICIO
		return this.each(function () {
			// Al click del botón, abrir el div de Introducción
			$(this).click(openIntro);
			// Al click del botón hide dentro de Create Giftbook, ocultar Create Giftbook
			$(defaults.hideFlowGift).click(closeFlowGift);
			// Al click del botón continuar dentro de Introducción, mostrar Create Giftbook y ocultar Introducción
			$(defaults.introGift).find(defaults.continueIntroGift).click(openFlowGift);
		});
	};