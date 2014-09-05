// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CAROUSELSWIPER: Iniciar carruseles on Swiper
//		Dependencias: Librería Swiper de idangerous (2.4.3) http://www.idangero.us/sliders/swiper,
// 					  removeArrow API
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
	Descripción del API: 
	Necesita un div contenedor, un div wrapper y un div para cada slider
	
	HTML:
	<div class="carrusel"> // Div contenedor
		<div class="carrusel-wrapper"> // Div wrapper
			<div class="carrusel-slide"> ... </div> // Slide 1
			<div class="carrusel-slide"> ... </div> // Slide 2
			.
			.
			.
			<div class="carrusel-slide"> ... </div> // Slide n
		</div>
		<span class="arrowLeft">Anterior</span> // Flecha izquierda para mover hacia atrás. Opcional
		<span class="arrowRight">Siguiente</span> // Flecha derecha para mover hacia adelante. Opcional
	</div>
	Llamada básica:
	$('.carrusel').carouselSwiper();
	
	Opciones:
	arrow: Si el carrusel lleva flechas se activa con 'true'. Por default estan desactivadas con 'false'
	arrowLeft: Clase de la flecha izquierda/anterior/prev. Tiene que estar activada la opción arrow.
	arrowRight: Clase de la flecha derecha/siguiente/next. Tiene que estar activada la opción arrow.
	slidesNum: Número de slides que muestra en pantalla. El default es 0 y muestra solo un slide en cada movimiento
	slideCSS: Clase del slide
	loop: Si se necesita repetir el carrusel en un ciclo infinito o circular. Por default esta desactivado con 'false'. Para activar 'true'
	optionsSwiper: Opciones del API SWIPER
	calculateHeight: Calcular el alto del carrusel. Por default está en 'false' ytomará el alto definido. Para activar 'true'
	onClickSlide: Función externa que se ejecutará cuando le das click a un slide. Por default no hace nada
	initialSlide: Si el slide inicial es diferente a la primera. Aqui se pone el número del slide donde se iniciará. NOTA: Tomar en cuenta que en carruseles cíclicos, se duplica el primer y el último slide.
	carruselNum: Para asignar un número al carrusel. Útil cuando son más de uno.
	externalSwipeTo: Si necesitar usar un objeto externo para hacer swipe en un slide específico
	externalSwipeToItem: Objeto externo para hacer el swipe en un slide especifico. Requiere data-swipeto con el número del index
	externalSwipeScrollTo: Objeto a donde se quiere hacer scroll una vez que se haga click en el objeto externo y se mueva el carrusel. Por default ninguno
*/
	
	jQuery.fn.carouselSwiper = function(options){
		var defaults = $.extend({
			arrow: true,
			arrowLeft: '.arrowLeft',
			arrowRight: '.arrowRight',
			slidesNum: 0,
			slideCSS: '.carrusel-slide',
			loop: false,
			optionsSwiper: {
				grabCursor: true,
				useCSS3Transforms: false
			},
			calculateHeight: false,
			onClickSlide: false,
			initialSlide: false,
			carruselNum: 'swiperCarrusel-',
			externalSwipeTo: false,
			externalSwipeToItem: '.swipeToObj',
			externalSwipeScrollTo: false,
		}, options),
		size = 0, // Variable que servirá para escribir el número de slides que tiene el carrusel
		// 1. Método que calcula cuántos slides tiene el carrusel:
		// obj: El objeto carrusel
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
				if(size > 1){
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
		// 2. Método para inicializar el carrusel:
		// obj: El objeto carrusel
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
						slideCSS: defaults.slideCSS, // Clase del slide del carrusel
						swiper: swiper
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
			// Si necesitamos hacer swipeTo desde un objeto externo
			swiper.params.onSlideChangeEnd = function(swiper){
				prepareArrow(obj, swiper);
			};
			if(defaults.externalSwipeTo){
				// Atachamos al evento click la función
				$(defaults.externalSwipeToItem).on('click', function(){
					// Llamamos la función externalSwiper que moverá el carrusel con el data-swipeto del objeto
					externalSwipe(swiper, obj, $(this));
				});
			}
		},
		// 3. Método para cambiar la posición del slide:
		//  obj: El objeto carrusel
		//  swiper: El objeto swiper creado para el carrusel
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
				prepareArrow(obj, swiper);
			}
		},
		// 4. Inicializa las flechas:
		//  obj: El objeto carrusel
		//  swiper: El objeto swiper creado para el carrusel
		initArrow = function(obj, swiper){
			// Verificar posición de las flechas (si se deben mostrar o no)
			prepareArrow(obj, swiper);
			// Busca en los hermanos del objeto la flecha izquierda/anterior/prev y en el click
			$(obj).siblings(defaults.arrowLeft).on('click', function(e) {
				// Deten la propagación de eventos
				e.stopPropagation();
				// Si no se tiene que repetir el carrusel
				if(!(defaults.loop)){
					// Verificar posición de las flechas (si se deben mostrar o no)
					prepareArrow(obj, swiper);
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
					prepareArrow(obj, swiper);
				}
				// Cambia el carrusel al siguiente slide
				swiper.swipeNext();
			});
		},
		// 5. Método que calcula el alto de carrusel:
		//  obj: El objeto carrusel
		//  swiper: El objeto swiper creado para el carrusel
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
		// Método que verifica posición de las flechas (si se deben mostrar o no):
		//  obj: El objeto carrusel
		prepareArrow = function(obj, swiper){
			// Llama a removeArrow
			$(obj).removeArrows({
				arrowLeft: defaults.arrowLeft, // Flecha izquierda/anterior/prev
				arrowRight: defaults.arrowRight, // Flecha derecha/siguiente/next
				slidesNum: defaults.slidesNum, // Número de slides por vista
				slideCSS: defaults.slideCSS, // Clase del slide del carrusel
				swiper: swiper
			});
		},
		// 6. Método que mueve el carrusel de forma exterior desde un índice dado:
		//  swiper: El objeto swiper creado para el carrusel
		//  obj: El objeto carrusel
		//  item: El objeto externo que contiene el index a donde se moverá el carrusel
		externalSwipe = function(swiper, obj, item){
			// Colectamos el índice al que queremos mover el carrusel escrito en el data-swiperto
			var index = $(item).attr('data-swipeto');
			// Movemos el carrusel al índice requerido por el objeto
			swiper.swipeTo(index, 1000);
			// Si se especificó un objeto a donde se hará scroll una vez actualizado el carrusel:
			if (defaults.externalSwipeScrollTo) {
				// De forma animada, mover el documento hacia el objeto
				$('html, body').animate({
					// El scroll se hace hasta alcanzar el borde superior del objeto
					scrollTop: $(defaults.externalSwipeScrollTo).offset().top
				}, 1000, 'swing');
			}
		};
		// 0. INICIO:
		// index: El índice del ciclo para ponerlo como clase
		return this.each(function(index){
			// Clase única para identificar el carrusel. Útil cuando son más de uno
			var obj = defaults.carruselNum+index;
			// Agregar la clase única al carrusel
			$(this).addClass(obj);
			// Llamar al método que calcula cuántos slides tiene el carrusel
			calculateSize(this);
		});
	};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//		REMOVEARROWS: Quita/Agrega las flechas dependiendo la posición del carrusel
//		Dependencias: Ninguna
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*Descripción del API: 
	Necesita dos objetos span/div para contener la flecha izquierda y la derecha
	
	HTML:
	
	<span class="arrowLeft">Anterior</span> // Flecha izquierda para mover hacia atrás. Opcional
	<span class="arrowRight">Siguiente</span> // Flecha derecha para mover hacia adelante. Opcional
	Llamada básica:
	Desde el API carouselSwiper
	
	Opciones:
	slideCSS: Clase de slides
	slidesNum: Número de slides a mostrar en cada vista. Default es 0
	arrowLeft: Flecha izquierda/anterior/prev
	arrowRight: Flecha derecha/siguiente/next
	slideActive: Clase de slide activa
	addCallback: Función para el Callback para después del click. Default: ninguno
*/
	jQuery.fn.removeArrows = function(options){
		var defaults = $.extend({
			slideCSS: '.carrusel-slide',
			slidesNum: 0,
			arrowLeft: '.arrowLeft',
			arrowRight: '.arrowRight',
			slideActive: 'swiper-slide-active',
			addCallback: 0,
			swiper: 'swiper'
		}, options),
		// Variable que contendrá el valor activo
		active = 0, activeSlide = '';
		// INICIO
		return this.each(function(){
			// Contamos la cantidad de slides del carrusel
			var size = $(this).find(defaults.slideCSS).size(),
			// Flecha izquierda
				left = $(this).siblings(defaults.arrowLeft),
			// Flecha derecha
				right = $(this).siblings(defaults.arrowRight),
			// Penúltima slide
				pointOfNoReturn = size - 1;
			// Si tiene número de slides por vista
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
					if(!$(this).hasClass('slide'+i)){
						$(this).addClass('slide'+i);
					}
					// Si encuentras que tiene la clase slideActive
					if($(this).hasClass(defaults.slideActive)){
						// El valor activo cambia al valor del índice mas uno
						active = i+1;
						activeSlide = $(this);
					}
				});
				// Si el valor activo es mayor o igual a 1
				if (activeSlide.hasClass('slide0')){
				// if(active === 1){
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