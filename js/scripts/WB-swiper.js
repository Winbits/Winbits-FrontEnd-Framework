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
		<span class="arrowleft">Anterior</span> // Flecha izquierda para mover hacia atrás. Opcional
		<span class="arrowright">Siguiente</span> // Flecha derecha para mover hacia adelante. Opcional
	</div>
	Llamada básica:
	$('.carrusel').carouselSwiper();
	
	Opciones:
	arrow: Si el carrusel lleva flechas se activa con 'true'. Por default estan desactivadas con 'false'
	arrowleft: Clase de la flecha izquierda/anterior/prev. Tiene que estar activada la opción arrow.
	arrowright: Clase de la flecha derecha/siguiente/next. Tiene que estar activada la opción arrow.
	slidesnum: Número de slides que muestra en pantalla. El default es 0 y muestra solo un slide en cada movimiento
	slidecss: Clase del slide
	loop: Si se necesita repetir el carrusel en un ciclo infinito o circular. Por default esta desactivado con 'false'. Para activar 'true'
	optionsswiper: Opciones del API SWIPER
	calculateheight: Calcular el alto del carrusel. Por default está en 'false' ytomará el alto definido. Para activar 'true'
	onclickslide: Función externa que se ejecutará cuando le das click a un slide. Por default no hace nada
	initialslide: Si el slide inicial es diferente a la primera. Aqui se pone el número del slide donde se iniciará. NOTA: Tomar en cuenta que en carruseles cíclicos, se duplica el primer y el último slide.
	carruselprefix: Para asignar un número al carrusel. Útil cuando son más de uno.
	externalswipeto: Si necesitar usar un objeto externo para hacer swipe en un slide específico
	externalswipetoitem: Objeto externo para hacer el swipe en un slide especifico. Requiere data-swipeto con el número del index
	externalswipescrollto: Objeto a donde se quiere hacer scroll una vez que se haga click en el objeto externo y se mueva el carrusel. Por default ninguno
*/
	
	jQuery.fn.WBSwiper = function(options){
		var defaults = $.extend({
			arrow: true,
			arrowleft: '.arrowleft',
			arrowright: '.arrowright',
			centerarrow: true,
			slideactive: 'swiper-slide-active',
			slidevisible: '.swiper-slide-visible',
			slidesnum: 1,
			slidesprefix: 'slide',
			slidecss: '.carrusel-slide',
			loop: false,
			optionsswiper: {
				grabCursor: true,
				useCSS3Transforms: false
			},
			calculateheight: false,
			onclickslide: false,
			initialslide: false,
			carruselprefix: 'swiperCarrusel-',
			externalswipeto: false,
			externalswipetoitem: '.swipeToObj',
			externalswipescrollto: false,
			lastaction: false,
			anulatelastaction: false,
			slideprefixnum: 'carrusel-slides-'
		}, options),
		size = 0, // Variable que servirá para escribir el número de slides que tiene el carrusel
		// 0. Verificar si existen data en el objeto para modificar los defaults
		checkData = function(obj){
			$.extend(defaults, $(obj).data());
		};
		// 1. Método que calcula cuántos slides tiene el carrusel:
		// obj: El objeto carrusel
		calculateSize = function(obj){
			// Asignar a la variable global size el número de slides, contándolos
			size = parseInt($(obj).find(defaults.slidecss).size(), 10);
			// Si el slide inicial no es el primero
			if(defaults.initialslide){
				// A cada uno de los slides se le agrega un índice
				$(obj).find(defaults.slidecss).each(function(i){
					$(this).addClass(defaults.slidesprefix+i);
				});
			}
			// Si queremos mostrar más de un slide en cada vista
			if(defaults.slidesnum > 1){
				// Si la cantidad de slides es mayor al número de slides que se quiere mostrar en cada vista
				if(size > defaults.slidesnum){
					// Llamar método que inicializa el carrusel
					initSwiper(obj);
				// Si el número de slides es menor al número de slides por vista
				} else {
					// Agregar clase con el número de slides
					$(obj).addClass(defaults.slideprefixnum+size);
					$(obj).find(defaults.slidecss).first().addClass(defaults.slideactive);
					// Oculta las flechas derecha e izquierda
					$(obj).siblings(defaults.arrowleft).hide();
					$(obj).siblings(defaults.arrowright).hide();
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
					$(obj).siblings(defaults.arrowleft).hide();
					$(obj).siblings(defaults.arrowright).hide();
					// Oculta objeto si no hay slides
					if(size === 0){
						$(obj).hide();
					}
				}
			}
		},
		// 2. Método para inicializar el carrusel:
		// obj: El objeto carrusel
		initSwiper = function(obj){
			// Objeto que contendrá el carrusel
			var swiper = new Swiper (obj, defaults.optionsswiper);
			// Si no se necesita repetir el carrusel
			if(!(defaults.loop)){
				// Agrega al objeto del carrusel el callback Touch End
				swiper.addCallback('TouchEnd', function(){
					// Cuando se ejecute el callback, verifica el estado de las flechas con removeArrows
					if(!(defaults.loop)){
						// Verificar posición de las flechas (si se deben mostrar o no)
						prepareArrow(obj, swiper);
					}
				});
				swiper.addCallback('SlideNext', function(){
					// Cuando se ejecute el callback, verifica el estado de las flechas con removeArrows
					if(!(defaults.loop)){
						// Verificar posición de las flechas (si se deben mostrar o no)
						prepareArrow(obj, swiper);
					}
				});
				swiper.addCallback('SlidePrev', function(){
					// Cuando se ejecute el callback, verifica el estado de las flechas con removeArrows
					if(!(defaults.loop)){
						// Verificar posición de las flechas (si se deben mostrar o no)
						prepareArrow(obj, swiper);
					}
				});
			}
			// Si el slide inicial es diferente al primero
			if(defaults.initialslide){
				// Cambia la posición del carrusel
				initialSlide(obj, swiper);
			}
			// Si existen flechas
			if(defaults.arrow){
				// Inicializa las flechas
				initArrow(obj, swiper);
			}
			// Si se tiene que calcular el alto del carrusel
			if(defaults.calculateheight){
				// Calcula el alto del carrusel
				calculateHeight(obj, swiper);
				// Agrega al objeto carrusel onSlideChangeStart(que es del swiper) que recalcule el alto cada vez que se cambie un slide
				swiper.params.onSlideChangeStart = function(swiper){calculateHeight(obj, swiper);};
			}
			// Si se necesita agragar funcionalidad después de que le den click al slide
			if(defaults.onclickslide){
				$(obj).find(defaults.slidecss).on('click', function(e){
					// Deten la propagación de eventos
					e.stopPropagation();
					// Ejecuta la función que venga en onclickslide al carrusel
					defaults.onclickslide(swiper);
				});
			}
			// Agregar al carrusel que los callbacks se ejecuten sólo una vez en múltiples al inicio de los cambios de slide (como cuando un usuario le pica repetidamente a las flechas)
			swiper.params.queueStartCallbacks = true;
			// Agregar al carrusel que los callbacks se ejecuten sólo una vez en múltiples al final de los cambios de slide (como cuando un usuario le pica repetidamente a las flechas)
			swiper.params.queueEndCallbacks = true;
			// Si necesitamos hacer swipeTo desde un objeto externo
			swiper.params.onSlideChangeEnd = function(swiper){
				if(!(defaults.loop)){
					// Verificar posición de las flechas (si se deben mostrar o no)
					prepareArrow(obj, swiper);
				}
			};
			if(defaults.externalswipeto){
				// Atachamos al evento click la función
				$(defaults.externalswipetoitem).on('click', function(){
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
			$(obj).find(defaults.slidecss).each(function(i){
				// Si encuentras en el slide la clase del slide inicial
				if(($(this).find(defaults.initialslide).length) || ($(this).hasClass(defaults.initialslide))){
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
			if(!(defaults.loop)){
				// Verificar posición de las flechas (si se deben mostrar o no)
				prepareArrow(obj, swiper);
			}
			// Busca en los hermanos del objeto la flecha izquierda/anterior/prev y en el click
			$(obj).siblings(defaults.arrowleft).on('click', function(e) {
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
			$(obj).siblings(defaults.arrowright).on('click', function(e) {
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
			var altura = 0;
			if(defaults.slidesnum > 1) {
				$(obj).find(defaults.slidevisible).each(function(){
					if (altura < $(this).outerHeight()){
						altura = $(this).outerHeight();
					}
				});
			} else {
				altura = $(swiper.activeSlide()).outerHeight();
			}
			// Recalcula el alto del carrusel de forma animada
			$(obj).animate({
				height: altura+'px'
			});
			// Busca en los hermanos del carrusel la flecha izquierda y derecha y cambia el valor top para que se pongan en el centro del carrusel
			if(defaults.centerarrow){
				$(obj).siblings(defaults.arrowright+', '+defaults.arrowleft).css('top', altura / 2 +'px');
			}
		},
		// Método que verifica posición de las flechas (si se deben mostrar o no):
		//  obj: El objeto carrusel
		prepareArrow = function(obj, swiper){
			// Llama a removeArrow
			$(obj).removeArrows({
				arrowleft: defaults.arrowleft, // Flecha izquierda/anterior/prev
				arrowright: defaults.arrowright, // Flecha derecha/siguiente/next
				slidesnum: defaults.slidesnum, // Número de slides por vista
				slidecss: defaults.slidecss, // Clase del slide del carrusel
				swiper: swiper,
				lastaction: defaults.lastaction,
				anulatelastaction: defaults.anulatelastaction
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
			if (defaults.externalswipescrollto) {
				// De forma animada, mover el documento hacia el objeto
				$('html, body').animate({
					// El scroll se hace hasta alcanzar el borde superior del objeto
					scrollTop: $(defaults.externalswipescrollto).offset().top
				}, 1000, 'swing');
			}
		};
		// 0. INICIO:
		// index: El índice del ciclo para ponerlo como clase
		return this.each(function(index){
			// Clase única para identificar el carrusel. Útil cuando son más de uno
			var obj = defaults.carruselprefix+index;
			// Agregar la clase única al carrusel
			$(this).addClass(obj);
			// Cambia los valores por default desde los data
			checkData(this);
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
	
	<span class="arrowleft">Anterior</span> // Flecha izquierda para mover hacia atrás. Opcional
	<span class="arrowright">Siguiente</span> // Flecha derecha para mover hacia adelante. Opcional
	Llamada básica:
	Desde el API carouselSwiper
	
	Opciones:
	slidecss: Clase de slides
	slidesnum: Número de slides a mostrar en cada vista. Default es 0
	arrowleft: Flecha izquierda/anterior/prev
	arrowright: Flecha derecha/siguiente/next
	slideactive: Clase de slide activa
	addCallback: Función para el Callback para después del click. Default: ninguno
*/
	jQuery.fn.removeArrows = function(options){
		var defaults = $.extend({
			slidecss: '.carrusel-slide',
			slidesnum: 0,
			arrowleft: '.arrowleft',
			arrowright: '.arrowright',
			slideactive: 'swiper-slide-active',
			addCallback: 0,
			swiper: 'swiper',
			lastaction: false,
			anulatelastaction: false
		}, options);
		// INICIO
		return this.each(function(){
			// Contamos la cantidad de slides del carrusel
			var size = $(this).find(defaults.slidecss).size(),
			// Flecha izquierda
				left = $(this).siblings(defaults.arrowleft),
			// Flecha derecha
				right = $(this).siblings(defaults.arrowright),
			// Penúltima slide
				pointOfNoReturn = size - 1;
			// Si tiene número de slides por vista
			if (defaults.slidesnum){
				// Asignale el penúltimo slide
				pointOfNoReturn = size - defaults.slidesnum;
			}
			// Si la cantidad de slides es mayor al número de slides a mostrar por vista
			if(size > defaults.slidesnum){
				// Busca en cada uno de los slides
				$(this).find(defaults.slidecss).each(function(i){
					if(!$(this).hasClass('slide'+i)){
						$(this).addClass('slide'+i);
					}
					if(i === pointOfNoReturn){
						if(!$(this).hasClass('pointOfNoReturn')){
							$(this).addClass('pointOfNoReturn');
						}
					}
				});
				$(this).find('.'+defaults.slideactive).each(function(){
					if($(this).hasClass('pointOfNoReturn')){
						left.show();
						right.hide();
						if(defaults.lastaction){
							defaults.lastaction();
						}
					} else if($(this).hasClass('slide0')){
						left.hide();
						right.show();
						if(defaults.anulatelastaction){
							defaults.anulatelastaction();
						}
					} else {
						left.show();
						right.show();
						if(defaults.anulatelastaction){
							defaults.anulatelastaction();
						}
					}
				});
					
			// Si la cantidad de slides es menor al número de slides a mostrar por vista
			} else {
				// Oculta las flechas derecha e izquierda
				left.hide();
				right.hide();
			}
		});
	};