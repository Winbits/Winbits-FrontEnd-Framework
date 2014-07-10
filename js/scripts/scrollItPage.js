// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SCROLLITPAGE: Scrollear el documento para llegar a sección y reconocer su posición en el DOM
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.scrollItPage = function(options){
		var defaults = $.extend({
			nav: 'nav',
			toggleClass: 'fixedClass',
			sections: '.mainHome-main',
			selectedLink: 'current',
			topMargin: 60,
			offset: 130,
			allBody: 'html, body',
			intervalo: 1000,
			currentClass: 'current'
		}, options), $navLinks, $navContainer, first = true, clicking = false,
		linkArray = [],
		clickingItem = [{item: 'lastNav', back: 'clickRightNav'}, {item: 'firstNav', back: 'clickLeftNav'}],
		clickItem = function(obj){
			var top = defaults.topMargin;
			clicking = true;
			if($(obj).data('topmargin')){
				top = $(obj).data('topmargin');
			}
			var id = $(obj.hash),
				offsetTop = id.offset().top - top;
			if(first === true){
				offsetTop = id.offset().top - (top * 2);
				first = false;
			}
			if(id.length){
				$navLinks.removeClass(defaults.currentClass);
				$navContainer.find('.downNav').attr('class', 'downNav');
				$(defaults.allBody).animate({
					scrollTop: offsetTop
				}, defaults.intervalo, 'swing', function(){
					clicking = false;
					$(obj).addClass(defaults.currentClass);
					addRemoveClass($(obj).parent());
					if(!$navContainer.hasClass(defaults.toggleClass)){
						$navContainer.addClass(defaults.toggleClass);
					}
				});
			}
		},
		fillArray = function(obj){
			// Llenamos arreglo con las posiciones de las secciones con respecto al document
			$(obj).each(function(){
				// Identificamos el hash # en el vínculo y lo buscamos en el DOM
				var id = $(this.hash),
				// El objeto referido, sacamos su posición con respecto al documento
					offset = id.offset(),
					// Pasamos los pixeles para el límite superior
					top = defaults.offset,
					// Siguente ID para determinar el final del contenedor
					nextId = $(document).height();
					if( $(id).next().length){
						nextId = id.next().offset().top - top - 1;
					}
					// Escribir en el arreglo la sección, su posición top y su posicion bottom, sumando y restando el márgen por default
				linkArray.push({item: this.hash, offsetTop: offset.top - top, offsetBottom: nextId});
			});
		},
		addRemoveClass = function(obj){
			for(var k=0; k<clickingItem.length; k++){
				if($(obj).attr('class')  === clickingItem[k].item){
					$navContainer.find('.downNav').addClass(clickingItem[k].back);
				}
			}
		},
		scrollPage = function(){
			// Cuando hagas scroll al documento
			var scrollVal = $(window).scrollTop();
			for(var i=0; i<linkArray.length; i++){
				// Verificamos que no exeda el límite superior e inferior de cada sección en cada scroll
				if((scrollVal >= linkArray[i].offsetTop) && (scrollVal <= linkArray[i].offsetBottom)){
					//console.log('límite '+linkArray[i].item+' offsetTop:'+linkArray[i].offsetTop+' offsetBottom:'+linkArray[i].offsetBottom+' scrollDocument:'+scrollVal);
					// Quitamos la clase current de todos los elementos del menú
					$navLinks.removeClass(defaults.currentClass);
					// Agregamos la clase current al elemento que se encuentra dentro de dicho límite
					$navLinks.eq(i).addClass(defaults.currentClass);
					$navContainer.find('.downNav').attr('class', 'downNav');
					addRemoveClass($navLinks.eq(i).parent());
					// Si el menú principal no tiene la clase toggleClass, pónsela
					if(!$navContainer.hasClass(defaults.toggleClass)){
						$navContainer.addClass(defaults.toggleClass);
					}
				}
			}
			if((scrollVal < linkArray[0].offsetTop) && $navContainer.hasClass(defaults.toggleClass)){
				$navContainer.removeClass(defaults.toggleClass);
			}
		};
		return this.each(function(){
			$navContainer = $(this);
			$navLinks = $(this).find(defaults.nav).find('a');
			$navLinks.on({
				click: function(e){
					e.preventDefault();
					clickItem(this);
				}
			});
			fillArray($navLinks);
			$(defaults.allBody).scrollTop(0);
			$(window).scroll(function(){
				if(clicking === false){
					scrollPage();
				}
			});
		});
	};
	