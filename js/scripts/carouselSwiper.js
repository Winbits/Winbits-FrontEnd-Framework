// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CAROUSELSWIPER: Iniciar carruseles on Swiper
//		Dependencias: Librería Swiper de idangerous (2.4.3) http://www.idangero.us/sliders/swiper
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.carouselSwiper = function(options){
		var defaults = $.extend({
			arrow: true, // Si van a existir flechas
			arrowLeft: '.arrowLeft', // Flecha izquierda/anterior/prev
			arrowRight: '.arrowRight', // Flecha derecha/siguiente/next
			slidesNum: 0, // Número de slides que muestra. Por default es 0 que significa que sólo se muestra 1
			slideCSS: '.carrusel-slide', // Clase del slide
			loop: false, // Si se repite el carrusel
			optionsSwiper: { // Opciones del carrusel
				grabCursor: true,
				useCSS3Transforms: false
			},
			calculateHeight: false, // Calcular el alto, por default no lo hace
			onClickSlide: false, // Para agregar aquí lo que se ejecutará cuando le das click a un slide. Por default no hace nada
			initialSlide: false, // Si el slide inicial es diferente a la primera. Aqui se pone el número del slide donde se iniciará. NOTA: Tomar en cuenta que en carruseles cíclicos, se duplica el primer y el último slide.
			carruselNum: 'swiperCarrusel-' // Para asignar un número al carrusel. Útil cuando son más de uno.
		}, options),
		size = 0, // Variable que servirá para escribir el número de slides que tiene el carrusel
		// 1. Método que calcula cuántos slides tiene el carrusel
		calculateSize = function(obj){
			// Asignar a la variable global size el número de slides, contándolos
			size = parseInt($(obj).find(defaults.slideCSS).size(), 10);
			// Si el slide inicial no es el primero
			if(defaults.initialSlide){
				// A cada uno de los slides se le agrega un índice
				$(obj).find(defaults.slideCSS).each(function(i){
					$(this).addClass('slide'+i);
				});
			}
			// Si queremos mostrar más de un slide en cada vista
			if(defaults.slidesNum){
				// Si la cantidad de slides es mayor al número de slides que se quiere mostrar en cada vista
				if(size > defaults.slidesNum){
					// Llamar método que inicializa el carrusel
					initSwiper(obj);
				// Si el número de slides es menor al número de slides por vista
				} else {
					// Oculta las flechas derecha e izquierda
					$(obj).siblings(defaults.arrowLeft).hide();
					$(obj).siblings(defaults.arrowRight).hide();
				}
			// Si el número de slides a mostrar por vista es el default ( o sea 1)
			} else {
				// Si la cantidad de slides es mayor a 2
				if(size > 2){
					// Inicializa el carrusel
					initSwiper(obj);
				// Si la cantidad de slides es 1 o 0
				} else {
					// Oculta las flechas izquierda y derecha
					$(obj).siblings(defaults.arrowLeft).hide();
					$(obj).siblings(defaults.arrowRight).hide();
				}
			}
		},
		// 2. Método para inicializar el carrusel
		initSwiper = function(obj){
			// Objeto que contendrá el carrusel
			var swiper = new Swiper (obj, defaults.optionsSwiper);
			// Si no se necesita repetir el carrusel
			if(!(defaults.loop)){
				// Agrega al objeto del carrusel el callback Touch End
				swiper.addCallback('TouchEnd', function(){
					// Cuando se ejecute el callback, verifica el estado de las flechas con removeArrows
					$(obj).removeArrows({
						addCallback: 1, // Cambia el valor default de addCallback de 0 a 1
						arrowLeft: defaults.arrowLeft, // Flecha izquierda/anterior/prev
						arrowRight: defaults.arrowRight, // Flecha derecha/siguiente/next
						slidesNum: defaults.slidesNum, // Número de slides por vista
						slideCSS: defaults.slideCSS // Clase del slide del carrusel
					});
				});
			}
			// Si el slide inicial es diferente al primero
			if(defaults.initialSlide){
				// Cambia la posición del carrusel
				initialSlide(obj, swiper);
			}
			// Si existen flechas
			if(defaults.arrow){
				// Inicializa las flechas
				initArrow(obj, swiper);
			}
			// Si se tiene que calcular el alto del carrusel
			if(defaults.calculateHeight){
				// Calcula el alto del carrusel
				calculateHeight(obj, swiper);
				// Agrega al objeto carrusel onSlideChangeStart(que es del swiper) que recalcule el alto cada vez que se cambie un slide
				swiper.params.onSlideChangeStart = function(swiper){calculateHeight(obj, swiper);};
			}
			// Si se necesita agragar funcionalidad después de que le den click al slide
			if(defaults.onClickSlide){
				$(obj).find(defaults.slideCSS).on('click', function(e){
					// Deten la propagación de eventos
					e.stopPropagation();
					// Ejecuta la función que venga en onClickSlide al carrusel
					defaults.onClickSlide(swiper);
				});
			}
			// Agregar al carrusel que los callbacks se ejecuten sólo una vez en múltiples al inicio de los cambios de slide (como cuando un usuario le pica repetidamente a las flechas)
			swiper.params.queueStartCallbacks = true;
			// Agregar al carrusel que los callbacks se ejecuten sólo una vez en múltiples al final de los cambios de slide (como cuando un usuario le pica repetidamente a las flechas)
			swiper.params.queueEndCallbacks = true;
		},
		// 3. Método para cambiar la posición del slide
		initialSlide = function(obj, swiper){
			// Variable donde se deposita el slide inicial
			var index = 0;
			// Recorre todos los slides
			$(obj).find(defaults.slideCSS).each(function(i){
				// Si encuentras en el slide la clase del slide inicial
				if(($(this).find(defaults.initialSlide).length) || ($(this).hasClass(defaults.initialSlide))){
					// Agregale el valor del índice a la variable index
					index = i;
				}
			});
			// Mueve el carrusel al valor que trae index
			swiper.swipeTo(index);
			// Si es necesario que se repita el carrusel
			if(!(defaults.loop)){
				// Verificar posición de las flechas (si se deben mostrar o no)
				prepareArrow(obj);
			}
		},
		// 4. Inicializa las flechas
		initArrow = function(obj, swiper){
			// Verificar posición de las flechas (si se deben mostrar o no)
			prepareArrow(obj);
			// Busca en los hermanos del objeto la flecha izquierda/anterior/prev y en el click
			$(obj).siblings(defaults.arrowLeft).on('click', function(e) {
				// Deten la propagación de eventos
				e.stopPropagation();
				// Si no se tiene que repetir el carrusel
				if(!(defaults.loop)){
					// Verificar posición de las flechas (si se deben mostrar o no)
					prepareArrow(obj);
				}
				// Cambia el carrusel al anterior slide
				swiper.swipePrev();
			});
			// Busca en los hermanos del objeto la flecha derecha/siguiente/next y en el click
			$(obj).siblings(defaults.arrowRight).on('click', function(e) {
				// Deten la propagación de eventos
				e.stopPropagation();
				// Si no se tiene que repetir el carrusel
				if(!(defaults.loop)){
					// Verificar posición de las flechas (si se deben mostrar o no)
					prepareArrow(obj);
				}
				// Cambia el carrusel al siguiente slide
				swiper.swipeNext();
			});
		},
		// 5. Método que calcula el alto de carrusel
		calculateHeight = function(obj, swiper){
			// Variable que escribe la altura del slide activo
			var altura = $(swiper.activeSlide()).outerHeight();
			// Recalcula el alto del carrusel de forma animada
			$(obj).animate({
				height: altura+'px'
			});
			// Busca en los hermanos del carrusel la flecha izquierda y derecha y cambia el valor top para que se pongan en el centro del carrusel
			$(obj).siblings(defaults.arrowRight+', '+defaults.arrowLeft).css('top', altura / 2 +'px');
		},
		// Método que verifica posición de las flechas (si se deben mostrar o no)
		prepareArrow = function(obj){
			// Llama a removeArrow
			$(obj).removeArrows({
				arrowLeft: defaults.arrowLeft, // Flecha izquierda/anterior/prev
				arrowRight: defaults.arrowRight, // Flecha derecha/siguiente/next
				slidesNum: defaults.slidesNum, // Número de slides por vista
				slideCSS: defaults.slideCSS // Clase del slide del carrusel
			});
		};
		// 0. INICIO
		return this.each(function(index){
			// Clase única para identificar el carrusel. Útil cuando son más de uno
			var obj = defaults.carruselNum+index;
			// Agregar la clase única al carrusel
			$(this).addClass(obj);
			// Llamar al método que calcula cuántos slides tiene el carrusel
			calculateSize(this);
		});
	};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//		Dependencias: carouselSwiper.js
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.removeArrows = function(options){
		var defaults = $.extend({
			slideCSS: '.carrusel-slide', // Clase de slides
			slidesNum: 0, // Número de slides a mostrar en cada vista. Default es 0 (que equivale a 1)
			arrowLeft: '.arrowLeft', // Flecha izquierda/anterior/prev
			arrowRight: '.arrowRight', // Flecha derecha/siguiente/next
			slideActive: 'swiper-slide-active', // Clase de slide activa
			addCallback: 0 // Callback. Default 0
		}, options),
		// Variable que contendrá el valor activo
		active = 0;
		// INICIO
		return this.each(function(){
			// Cantidad de slides del carrusel
			var size = $(this).find(defaults.slideCSS).size(),
			// Flecha izquierda
				left = $(this).siblings(defaults.arrowLeft),
			// Flecha derecha
				right = $(this).siblings(defaults.arrowRight),
			// Penúltima slide
				pointOfNoReturn = size - 1;
			// Si el número de slides a mostrar por vista es diferente al default
			if (defaults.slidesNum){
				// Asignale el penúltimo slide
				pointOfNoReturn = size - (defaults.slidesNum - 1);
			}
			// Si la cantidad de slides es mayor al número de slides a mostrar por vista
			if(size > defaults.slidesNum){
				// El valor activo cambiará al valor callback
				active =+ defaults.addCallback;
				// Busca en cada uno de los slides
				$(this).find(defaults.slideCSS).each(function(i){
					// Si encuentras que tiene la clase slideActive
					if($(this).hasClass(defaults.slideActive)){
						// El valor activo cambia al valor del ínidice mas uno
						active = i+1;
					}
				});
				// Si el valor activo es mayor o igual a 1
				if(active <= 1){
					// Oculta la flecha izquierda
					left.slideUp();
					// Muestra la flecha derecha
					right.slideDown();
				// Si el valor activo es menor o igual al penúltimo slide
				} else if(active >= pointOfNoReturn){
					// Muestra la flecha izquierda
					left.slideDown();
					// Oculta la flecha derecha
					right.slideUp();
				// Si el valor activo es el default, o sea 0
				} else {
					// Oculta las flechas derecha e izquierda
					left.slideDown();
					right.slideDown();
				}
			// Si la cantidad de slides es menor al número de slides a mostrar por vista
			} else {
				// Oculta las flechas derecha e izquierda
				left.hide();
				right.hide();
			}
		});
	};