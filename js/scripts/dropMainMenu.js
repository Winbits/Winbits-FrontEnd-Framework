// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//		DROPMAINMENU: Drop menus del carrito y de mi cuenta
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.dropMainMenu = function(options){
		var defaults = $.extend({
			contenedor: '.dropMenu',
			claseActivo: 'active',
			wrapper: '.wrapper',
			closeBtn: '.miCuenta-close',
			beforeOpen: $.noop
		}, options), claseObj,
		clickingTrigger = function(obj){
			if (!$(obj).is(defaults.claseActivo) && defaults.beforeOpen() === false) {
				return;
			}
			$(obj).siblings(defaults.contenedor).stop(true, true).slideToggle($.noop, 
				function(){
            		if($('#wbi-cart-no-data').is(':visible')){
              			window.setTimeout(function(){$('#wbi-cart-info').trigger('click');}, 3000);
            		}
          		});
			$(obj).toggleClass(defaults.claseActivo);
		},
		closeSiblings = function(obj){
			$(obj).siblings(defaults.contenedor).stop(true, true).slideUp();
			$(obj).removeClass(defaults.claseActivo);
		};
		return this.each(function(){
			var objeto = this,
				wpOb = $(objeto).next(defaults.contenedor).find(defaults.wrapper);
			claseObj = $(objeto).attr('class').split(' ')[0];
			$(objeto).on('click', function(e){
				e.stopPropagation();
				if($(objeto).siblings(defaults.contenedor).css('display') === 'none'){
					closeSiblings('.'+claseObj);
				}
				clickingTrigger(objeto);
			});
			wpOb.on('click', defaults.closeBtn, function(){
				$(objeto).trigger('click');
			});
			if($(this).data('cart')){
				wpOb = $(objeto).next(defaults.contenedor).find(defaults.wrapper).children().eq(0);
			}
			wpOb.on({
				click: function(e){
					e.stopPropagation();
				},
				mouseenter: function(){
					$(this).addClass(defaults.claseActivo);
					$(objeto).show();
				},
				mouseleave: function(){
					$(this).removeClass(defaults.claseActivo);
					$(document).click(function(){
						closeSiblings(objeto);
						$(document).unbind('click');
					});
				}
			});
		});
	};