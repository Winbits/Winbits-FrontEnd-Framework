// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      Incluir los archivos desde el Framework
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Función para incluir los archivos:
	// file: Archivo a incluir
	// path: Dirección url del archivo
	// sufix: Si tiene un sufijo (puede ser min o un número)
	// CSS: Script por default, si trae valor, es un CSS
	var defaultsFramework = {
		modernizr: 'modernizr-2.6.2.js',
		jquerybrowser: 'jquery.browser.min.js',
		jqueryui: 'jQueryUI1.9.2/jquery-ui-1.9.2.js'
	},
	defautPath = 'http://www.dream-it.com.mx/WinbitsFramework/js/libs/',
	fileExist = function(url){
		var http = new XMLHttpRequest();
		http.open('GET', url, false);
		http.send();
		return http.status != 404;
	},
	includeFile = function(file, path, CSS){
		// variable para escribir al inicio
		// var initTag = '<script src="' + path,
		// 	// Variable para fin de tag
		// 	endTag = '"></script>\n';
		// // Es un archivo css?
		// if(CSS){
		// 	// Modificar el inicio del tag
		// 	initTag = '<link rel="stylesheet" href="' + path;
		// 	// Modificar el fin del tag
		// 	endTag = '">\n';
		// }
		// // Escribir...
		// document.writeln(initTag + file + sufix + endTag);
		var attachItem = function(){
			var item = '';
			if(CSS){
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
			includeFile(defaultsFramework[key], defautPath);
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
			scriptsLibs: {
				acordeon: false,
				acordeon2: false,
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
			},
			scriptsPathProd: 'http://www.dream-it.com.mx/WinbitsFramework/js/scripts/min/',
			scriptsPathQA: 'https://raw.githubusercontent.com/Winbits/Winbits-FrontEnd-Framework/master/js/scripts/min/',
			scriptsQA: true,
			scriptsSufix: '-min.js'
		}, params),
		// Arreglo para colocar los scripts a incluir
		includeScripts = [],
		includeScript = function(){
			// Iterar en includeScripts para incluir archivos
			for (var i=0;i<includeScripts.length;i++){
				// Si los scripts se leerán desde QA (para desarrollo)
				if(defaults.scriptsQA){
					// Incluir el archivo desde QA(Github)
					includeFile(includeScripts[i]+defaults.scriptsSufix, defaults.scriptsPathQA);
				// Pero si los archivos ya son desde producción
				} else {
					// Incluir el archivo desde producción
					includeFile(includeScripts[i]+defaults.scriptsSufix, defaults.scriptsPathProd);
				}
			}
		};
		// Iterar en el objeto defaults.scriptsLibs para saber cuáles son los scripts a incluir
		for (var key in defaults.scriptsLibs){
			// Agregar en el arreglo includeScripts el nombre del script
			includeScripts.push(key);
		}
		includeScript();
	};