// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      Incluir los archivos desde el Framework
// 		Dependencias: jQuery
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
	Descripción del API: 
	Para cargar las librerías externas, hacer una llamada al API que se encuentra en el directorio del Framework:
	- SWIPER: Slider/Carrusel con funciones móviles. http://www.idangero.us/sliders/swiper/
	- FANCYBOX: 
	
	
	Librerías a cargar en el inicio:
	Modificar defaultsFramework, que carga por default
	- modernizr
	- jQueryBrowser
	- jQueryUI
	Por ejemplo, si deseamos cargar el swiper:
	defaultsFramework.swiper = 'swiper/swiper.js'
	
	Llamada básica:
	$('html').includeFramework({
		scripsLibs: {
			// librerías a cargar...
		}
	});

	Opciones:
	acordeon: Acordeón simple con ícono,
	acordeon2: Acordeón,
	acordeonFilter: false,
	altoCarrito: false,
	buyers: false,
	carouselSwiper: false,
	carruselVerticalSwiper: false,
	changeBox: false,
	changeOffer: false,
	changeQuestion: false,
	chooseDate: false,
	closeVideoHome: false,
	coverMenu: false,
	createGift: false,
	customCheckbox: false,
	customRadio: false,
	customSelect: false,
	customSlider: false,
	customSlider2: false,
	customSlider3: false,
	datePicker: false,
	dropMainMenu: false,
	fancyBox: false,
	fixedFooter: false,
	fixedMenu: false,
	gradient: false,
	hideLogo: false,
	imageError: false,
	imageProduct: false,
	mailingMenuCheckboxs: false,
	makeCookie: false,
	maskImg: false,
	moveGradient: false,
	moveParallax: false,
	openFolderWidget: false,
	openProduct: false,
	placeholder: false,
	point: false,
	preloader: false,
	requiredField: false,
	resizeFilter: false,
	scrollItPage: false,
	scrollpane: false,
	scrollWaypoints: false,
	setCalendar: false,
	showBannerCookie: false,
	showBit: false,
	showDiv: false,
	showHideDiv: false,
	tabs: false,
	tooltip: false
*/



	var defaultsFramework = {
		modernizr: 'modernizr-2.6.2.js',
		jquerybrowser: 'jquery.browser.min.js',
		jqueryui: 'jQueryUI1.9.2/jquery-ui-1.9.2.js'
	},
	defautPath = 'http://www.dream-it.com.mx/WinbitsFramework/js/libs/',
	writeFile = function(file, path, CSStrue){
		// Inicio y fin del tag
		var initTag = '<script src="' + path,
			endTag = '"></script>\n';
		// Es un archivo css?
		if(CSStrue){
			// Modificar el inicio y fin del tag
			initTag = '<link rel="stylesheet" href="' + path;
			endTag = '">\n';
		}
		// Escribir...
		document.writeln(initTag + file + endTag);
	},
	includeFile = function(file, path, CSStrue){
		var attachItem = function(){
			var item = '';
			if(CSStrue){
				item = document.createElement('link');
				item.href = path + file;
				item.rel = 'stylesheet';
			} else {
				item = document.createElement('script');
				item.type = 'text/javascript';
				item.src = path + file;
			}
			document.getElementsByTagName('head')[0].appendChild(item);
		};
		if(window.addEventListener){
			window.addEventListener('load', attachItem, false)
		} else if (window.attachEvent){
			window.attachEvent('onload', attachItem);
		} else {
			window.onload = attachItem;
		}
	},
	loadLibs = function(){
		for (var key in defaultsFramework){
			writeFile(defaultsFramework[key], defautPath);
		}
	};

	jQuery.fn.includeFramework = function(params){
		var defaults = $.extend({
			cssLibs: {
				cssFontIcon: true,
				cssForms: false,
				cssProduct: false,
			},
			cssPathProd: 'http://www.dream-it.com.mx/WinbitsFramework/js/',
			cssPathQA: 'https://raw.githubusercontent.com/Winbits/Winbits-FrontEnd-Framework/master',
			cssQA: false,
			scriptsLibs: {},
			scriptsPathProd: 'http://www.dream-it.com.mx/WinbitsFramework/js/scripts/min/',
			scriptsPathQA: 'https://raw.githubusercontent.com/Winbits/Winbits-FrontEnd-Framework/master/js/scripts/min/',
			scriptsQA: false,
			scriptsSufix: '-min.js'
		}, params),
		// Arreglo para colocar los scripts a incluir
		includeScripts = [],
		includeScript = function(){
			// Iterar en includeScripts para incluir archivos
			for (var i=0;i<includeScripts.length;i++){
				// Si los scripts se leerán desde QA (para desarrollo)
				if(defaults.scriptsQA){
					writeFile(includeScripts[i]+defaults.scriptsSufix, defaults.scriptsPathQA);
				// Pero si los archivos ya son desde producción
				} else {
					writeFile(includeScripts[i]+defaults.scriptsSufix, defaults.scriptsPathProd);
				}
			}
		};
		// Iterar en el objeto defaults.scriptsLibs para saber cuáles son los scripts a incluir
		for (var key in defaults.scriptsLibs){
			includeScripts.push(key);
		}
		includeScript();
	};