// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      MOVEGRADIENT: Colorea el fondo del documento con un degradado y en el movimiento cambia de color
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/* 
	Descripción del API: 
	Colorea la etiqueta HTML de un color degradado y conforme se mueve el mouse a la derecha o a la izquierda, cambia
	el color del degradado. Lo hace en el movimiento horizontal, no cambia el color en el movimiento vertical.

	Necesita tres colores en RGB: 
	- Izquierdo (colorLeft): Cuando el mouse llegue a la izquierda de la ventana.
	- Central (colorInit): Color inicial y cuando el mouse llegue al centro de la ventana.
	- Derecho (colorRight): Cuando el mouse llegue a la derecha de la ventana.
	
	HTML:
	<html>
	Se puede incluir los estilos del degradado base en la hoja de estilos (CSS)

	Llamada:
	$(document).moveGradient();
	
	Opciones:
	colorInit1: Color superior inicial en RGB.
	colorInit2: Color inferior inicial en RGB.
	colorLeft1: Color superior izquierdo en RGB.
	colorLeft2: Color inferior izquierdo en RGB.
	colorRight1: Color superior derecho en RGB.
	colorRight2: Color inferior derecho en RGB.
	maximumDegrees: Grados máximo para rotar el dispositivo
*/

	jQuery.fn.moveGradient = function(options){
		var defaults = $.extend({
			colorInit1: { r: 255, g: 70, b: 75 },
			colorInit2: { r: 255, g: 60, b: 165 },
			colorLeft1: { r: 86, g: 167, b: 237 },
			colorLeft2: { r: 59, g: 241, b: 252 },
			colorRight1: { r: 88, g: 235, b: 120 },
			colorRight2: { r: 205, g: 249, b: 60 },
			maximumDegrees: 45,
			increaseSensibility: 4
		}, options),
		// Estas variables se llenarán conforme se mueva el mouse, las cuales pasan los parámetros al final.
		colorR1, colorG1, colorB1, colorR2, colorG2, colorB2,
		// Valor del mouse
		paginaX = 0,
		// Método para calcular el número que se necesita para cambiar un valor en el RGB:
		//  pageX: Posición del mouse
		//  colorInit: Color inicial o central
		//  colorLeft: Color a la izquierda
		//  colorRight: Color a la derecha
		appyGradient = function(){
			
			$('html').css({
				backgroundImage: 'linear-gradient(rgb(' + colorR1 + ', ' + colorG1 + ', ' + colorB1 + '), rgb(' + colorR2 + ', ' + colorG2 + ', ' + colorB2 + '))'
			});
		},
		// Método para capturar la posición del mouse, transformarlo en un número de color:
		//  pageX: El evento del mouse
		//  colorInit: Color de donde parte la animación
		//  colorLeft: Color final al colocarse el mouse a la izquierda
		//  colorRight: Color final al colocarse el mouse a la derecha
		colorPosition = function(pageX, colorInit, colorLeft, colorRight){
			// Calcular la mitad de la página
			var halfWindow = $(document).width() / 2,
				// Variable para colocar la diferencia entre el colorInit y el colorLeft / colorRight
				diferencia = 0,
				// Variable para colocar la posición del mouse en porcentaje con respecto a la mitad de la pantalla
				posicion = 0,
				// Variable para colocar el resultado de la diferencia por la posición entre 100. Sirve para saber cuál es el valor a enviar
				valor = 0;
			// Esta del lado izquierdo de la pantalla?
			if(pageX < halfWindow){
				// Por default, se dirige a la izquierda y está a la izquierda de la pantalla
				// Diferencia entre el color inicial y el color izquierdo
				diferencia = diference(colorInit, colorLeft);
				// La posición del mouse en porcentaje con respecto a la mitad de la pantalla (100-1)
				posicion = (pageX / halfWindow) * 100;
				// Dividir la diferencia la posición del mouse para que me de el valor
				valor = parseInt((diferencia * posicion) / 100, 10);
				// Se dirige hacia la derecha del lado izquierdo de la pantalla?
				if(pageX > paginaX){
					// La posición del mouse en porcentaje con respecto a la mitad de la pantalla (1-100)
					posicion = ((pageX / halfWindow) * 100) / 1;
					// Dividir la diferencia la posición del mouse para que me de el valor
					valor = parseInt((diferencia * posicion) / 100, 10) / 1;
				}
				// Si el color inicial es menor al color izquierdo
				if(colorInit < colorLeft){
					// Regresa el color izquierdo menos el valor
					return colorLeft - valor;
				// El color inicial es mayor
				} else {
					// Regresar el color izquierdo más el valor
					return colorLeft + valor;
				}
			// Entonces esta del lado derecho de la pantalla
			} else {
				// Diferencia entre el color inicial y el color derecho
				diferencia = diference(colorInit, colorRight);
				// La posición del mouse en porcentaje con respecto a la mitad de la pantalla (100-1)
				posicion = ((pageX / halfWindow) * 100) - 100;
				// Dividir la diferencia la posición del mouse para que me de el valor
				valor = parseInt((diferencia * posicion) / 100, 10);
				// Se dirige hacia la derecha del lado derecho de la pantalla?
				if(pageX > paginaX){
					// La posición del mouse en porcentaje con respecto a la mitad de la pantalla (1-100)
					posicion = (((pageX / halfWindow) * 100) / 1) - 100;
					// Dividir la diferencia la posición del mouse para que me de el valor
					valor = parseInt((diferencia * posicion) / 100, 10) / 1;
				}
				// Si el color inicial es menor al color izquierdo
				if(colorInit < colorRight){
					// Regresa el color inicial más el valor
					return colorInit + valor;
				// El color inicial es mayor
				} else {
					// Regresa el color inicial menos el valor
					return colorInit - valor;
				}
			}
		},
		// Método para capturar el movimiento del dispositivo(arriba o abajo), transformarlo en un número de color:
		//  degrees: El evento en grados que gira el dispositivo
		//  colorInit: Color de donde parte la animación
		//  colorLeft: Color final al colocarse el mouse a la izquierda
		//  colorRight: Color final al colocarse el mouse a la derecha
		colorPositionDevice = function(degrees, colorInit, colorLeft, colorRight){
			// Variable para colocar la diferencia entre el colorInit y el colorLeft / colorRight
			var diferencia = 0,
				// Variable para colocar la posición del mouse en porcentaje con respecto a la mitad de la pantalla
				posicion = 0,
				// Variable para colocar el resultado de la diferencia por la posición entre 100. Sirve para saber cuál es el valor a enviar
				valor = 0;
			// El dispositivo se inclina hacia la izquierda?
			if(degrees > 0){
				// Por default, se dirige a la izquierda y está a la izquierda de la pantalla
				// Diferencia entre el color inicial y el color izquierdo
				diferencia = diference(colorInit, colorLeft);
				// Los grados que giró el dispositivo con respecto al máximo número de grados que puede girar (90º-0º)
				posicion = (degrees / defaults.maximumDegrees) * 100;
				// Dividir la diferencia entre los grados para que me de el valor
				valor = parseInt((diferencia * posicion) / 100, 10);
				// Si el color inicial es menor al color izquierdo
				if(colorInit < colorLeft){
					// Regresa el color izquierdo menos el valor
					return colorInit - valor;
				// El color inicial es mayor
				} else {
					// Regresar el color izquierdo más el valor
					return colorInit + valor;
				}
			// Entonces esta del lado derecho de la pantalla
			} else {
				// Convertir los grados de negativos a positivos
				var positiveDegrees = Math.abs(degrees);
				// Diferencia entre el color inicial y el color derecho
				diferencia = diference(colorInit, colorRight);
				// Los grados que giró el dispositivo con respecto al máximo número de grados que puede girar (0º-90º)
				posicion = ((positiveDegrees / defaults.maximumDegrees) * 100) - 100;
				// Dividir la diferencia entre los grados para que me de el valor
				valor = parseInt((diferencia * posicion) / 100, 10);
				// Si el color inicial es menor al color izquierdo
				if(colorInit < colorRight){
					// Regresa el color inicial más el valor
					return colorInit + valor;
				// El color inicial es mayor
				} else {
					// Regresa el color inicial menos el valor
					return colorInit - valor;
				}
			}
		},
		// Método para calcular la diferencia entre un número y otro, requiere dos valores.
		diference = function(num1, num2){
			// Si primer número es mayor que el segundo
			if(num1 > num2){
				// Restar al primero número el segundo
				return num1 - num2;
			//  Si el segundo número es el mayor
			} else {
				//  Restar al segundo número el primero
				return num2 - num1;
			}
		},
		// Método que inicia los cambios de color:
		// event: Variable para el mousemove
		// degrees: Variable para el devicemotion
		initChangeColor = function(event, degrees){
			if(degrees){
				// Captura la posición frontal del dispositivo y lo multiplica por la sensibilidad, a mayor sensibilida se refleja más el cambio de color
				paginaX = degrees * defaults.increaseSensibility;
				// Color superior R
				colorR1 = colorPositionDevice(paginaX, defaults.colorInit1.r, defaults.colorLeft1.r, defaults.colorRight1.r);
				// Color superior G
				colorG1 = colorPositionDevice(paginaX, defaults.colorInit1.g, defaults.colorLeft1.g, defaults.colorRight1.g);
				// Color superior B
				colorB1 = colorPositionDevice(paginaX, defaults.colorInit1.b, defaults.colorLeft1.b, defaults.colorRight1.b);
				// Color inferior R
				colorR2 = colorPositionDevice(paginaX, defaults.colorInit2.r, defaults.colorLeft2.r, defaults.colorRight2.r);
				// Color inferior G
				colorG2 = colorPositionDevice(paginaX, defaults.colorInit2.g, defaults.colorLeft2.g, defaults.colorRight2.g);
				// Color inferior B
				colorB2 = colorPositionDevice(paginaX, defaults.colorInit2.b, defaults.colorLeft2.b, defaults.colorRight2.b);
			} else {
				// Captura la posición del mouse en la página
				paginaX = event.pageX;
				// Color superior R
				colorR1 = colorPosition(paginaX, defaults.colorInit1.r, defaults.colorLeft1.r, defaults.colorRight1.r);
				// Color superior G
				colorG1 = colorPosition(paginaX, defaults.colorInit1.g, defaults.colorLeft1.g, defaults.colorRight1.g);
				// Color superior B
				colorB1 = colorPosition(paginaX, defaults.colorInit1.b, defaults.colorLeft1.b, defaults.colorRight1.b);
				// Color inferior R
				colorR2 = colorPosition(paginaX, defaults.colorInit2.r, defaults.colorLeft2.r, defaults.colorRight2.r);
				// Color inferior G
				colorG2 = colorPosition(paginaX, defaults.colorInit2.g, defaults.colorLeft2.g, defaults.colorRight2.g);
				// Color inferior B
				colorB2 = colorPosition(paginaX, defaults.colorInit2.b, defaults.colorLeft2.b, defaults.colorRight2.b);
			}
			// Aplicar el gradiente con los valores puestos en las variables anteriores
			appyGradient();
		};
		// INICIO
		return this.each(function(){
			// Asignar a las variables el color inicial para que lo ponga al HTML:
			// Color superior R
			colorR1 = defaults.colorInit1.r;
			// Color superior G
			colorG1 = defaults.colorInit1.g;
			// Color superior B
			colorB1 = defaults.colorInit1.b;
			// Color inferior R
			colorR2 = defaults.colorInit2.r;
			// Color inferior G
			colorG2 = defaults.colorInit2.g;
			// Color inferior B
			colorB2 = defaults.colorInit2.b;
			// Aplicar el gradiente con los valores puestos en las variables anteriores
			appyGradient();
			// Inicia el listener para navegadores de escritorio e inicia el cambio de color
			$(document).mousemove(initChangeColor);
			// ¿El navegador soporta eventos de movimiento (acelerómetro/giroscopio)?
			if(window.DeviceMotionEvent){
				// ¿Es iPad?
				var isiPad = navigator.userAgent.match(/iPad/i) !== null;
				if (isiPad){
					// Inicializa el listener para cuando el dispositivo se mueva (aplica para tabletas, teléfonos y dispositivos que cuenten con acelerómetro/giroscopio)
					window.addEventListener('deviceorientation', function(e){
						// Iniciar el cambio de color
						initChangeColor('', Math.round(e.beta));
					}, true);
				}
			}
		});
	};