// ++++++++++++++++++++++++++++++++++++++++++++
//      ACORDEON: Acordeones
// ++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.acordeon = function(options){
		var defaults = $.extend({
			trigger: 'h3',
			first: true,
			claseActivo: 'active',
			contenedor: '.accordeon-content',
			extraBtn: false,
			extraBtnItem: '.accordeon-extaBtn',
			openAll: false
		}, options),
		checaVisibilidad = function(obj){
			if($(obj).css('display') === 'none'){
				$(obj).css('display','block');
				var visibilidad = 1;
				return visibilidad;
			}
		},
		activaPrimero = function (obj){
			if(defaults.first){
				$(obj).find(defaults.trigger).first().addClass(defaults.claseActivo);
				$(obj).find(defaults.contenedor).not(':first').hide();
			} else {
				$(obj).find(defaults.contenedor).hide();
			}
		},
		abreAcordeon = function(obj){
			$(obj).next(defaults.contenedor).slideToggle();
			if(!defaults.openAll){
				$(obj).next(defaults.contenedor).siblings(defaults.contenedor+':visible').slideUp();
				$(obj).siblings(defaults.trigger).removeClass(defaults.claseActivo);
			}
			$(obj).toggleClass(defaults.claseActivo);
		},
		escondeAcordeon = function(obj, visibilidad){
			if(visibilidad === 1) {
				$(obj).css('display','none');
			}
		};
		return this.each(function(){
			checaVisibilidad(this);
			activaPrimero(this);
			$(this).find(defaults.trigger).click(function(){
				abreAcordeon(this);
			});
			if(!defaults.extaBtn){
				$(this).find(defaults.extraBtnItem).click(function(){
					abreAcordeon(this.parentNode.previousElementSibling);
				});
			}
			escondeAcordeon(this);
		});
	};