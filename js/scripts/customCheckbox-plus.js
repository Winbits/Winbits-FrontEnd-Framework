// +++++++++++++++++++++++++++++++++++++++++
//      CUSTOMCHECKBOX: Cambiar checkbox
// +++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.customCheckbox = function(options){
		var defaults = $.extend({
			checkbox: 'input[type="checkbox"]',
			selectClass: 'checkbox-checked',
			unSelectClass: 'checkbox-unchecked',
			wrapper: 'checkbox-wrapper',
			spanIcon: 'checkbox-span',
			onClickCall: false,
			onFinishWrapping: false,
			classColor: 'checkbox-color',
			tooltipClass: 'tooltip',
			checkAll: false,
			checkAllClass: 'checkbox-checkall'
		}, options), clase,
		wrappingInput = function(obj){
			$(obj).find(defaults.checkbox).each(function(){
				var $this = this;
				checkingChecked($this);
				if($($this).next().is('label')){
					$($this).next().andSelf().wrapAll('<div class="'+ defaults.wrapper +'"/>');
					$($this).next().click(function(e){
						e.preventDefault();
					});
					$($this).appendTo($(this).next());
				} else {
					$($this).wrap('<div class="' + defaults.wrapper + '"/>');
				}
				$($this).parents('.'+defaults.wrapper).prepend('<span class="'+ defaults.spanIcon +' '+ clase +'"/>');
				$($this).parents('.'+defaults.wrapper).click(function(){
					clickingCheckbox($this, $($this).parents('.'+defaults.wrapper).children('.' + defaults.spanIcon));
				});
				if($($this).data){
					customColor($($this));
				}
				if(defaults.onFinishWrapping){
					defaults.onFinishWrapping($this);
				}
			});
		},
		checkingChecked = function(obj){
			if($(obj).prop('checked')){
				clase = defaults.selectClass;
			} else {
				clase = defaults.unSelectClass;
			}
		},
		checkAll = function (obj, value, classAdd, classRemove){
			if(defaults.checkAll){
				var $siblings = $(obj).parents('.'+defaults.wrapper).siblings();
				if($(obj).hasClass(defaults.checkAllClass)) {
					$siblings.find(defaults.checkbox).prop('checked', value)
					.parents('.'+defaults.wrapper).find('.'+defaults.spanIcon).removeClass(classRemove).addClass(classAdd);
				} else {
					if(value === false && $siblings.find('.'+defaults.checkAllClass).prop('checked')){
						$siblings.find('.'+defaults.checkAllClass).prop('checked', false)
						.parents('.'+defaults.wrapper).find('.'+defaults.spanIcon).removeClass(classRemove).addClass(classAdd);
					}
				}
			}
		},
		clickingCheckbox = function(obj, trigger){
			if($(obj).prop('checked')){
				$(trigger).removeClass(defaults.selectClass).addClass(defaults.unSelectClass);
				$(obj).prop('checked', false);
				checkAll(obj, false, defaults.unSelectClass, defaults.selectClass);
			} else {
				$(trigger).removeClass(defaults.unSelectClass).addClass(defaults.selectClass);
				$(obj).prop('checked', true);
				checkAll(obj, true, defaults.selectClass, defaults.unSelectClass);
			}
			if(defaults.onClickCall){
				defaults.onClickCall(obj);
			}
		},
		customColor = function(obj){
			$(obj).siblings('.'+defaults.spanIcon).addClass(defaults.classColor).css('background-color', '#'+$(obj).data('color')).attr('data-tooltip', $(obj).val());
			$(obj).siblings('.'+defaults.spanIcon).toolTip({clase: defaults.tooltipClass});
		};
		return this.each(function(){
			wrappingInput(this);
		});
	};

// ---------------------------------------------------------------
//  WBToggleCheck:       Checa/Descheca checkbox hijos
//  Dependencias:   jQuery.js (1.8.3) http://jquery.com
// ----------------------------------------------------------------

var WBToggleCheck = function(selector, params){
    //  Selector
    this.ele = selector;
    //  Configuración default del toggleCheck
    this.defaults = $.extend({
        titled: 'h4',
		subtitled: '.subFilter-input',
		inputs: 'input[type="checkbox"]',
		abuelo: '.clickoneroFilter-div',
		padre: '.clickoneroFilter-sub',
		hijo: '.clickoneroFilter-subContainer',
		nieto: '.clickoneroFilter-subsub',
		checkboxSpan: '.checkbox-span',
		checkboxChecked: 'checkbox-checked',
		checkboxUnchecked: 'checkbox-unchecked',
		checkboxPlus: 'checkbox-plus',
		checkboxMinus: 'checkbox-minus',
		checkboxOpen: 'checkbox-open'
    }, params);

// Métodos

    // 1. Activar el acordeón
    this.activateToggleCheck = function(){
        this.checkData();
        this.clickOpenBox();
        this.clickCheckbox();
    };
    // 2. Verificar si existen data en el objeto para modificar los defaults
    this.checkData = function(){
        $.extend(this.defaults, $(this.ele).data());
    };
    // 3. Checa / Descheca los checkbox y cambia las clases
    this.checkCheckbox = function(checkbox, removeClass, addClass, prop){
		$(checkbox).find(this.defaults.checkboxSpan).
		removeClass(removeClass).
		addClass(addClass).
		parent().find(this.defaults.inputs).
		prop('checked', prop);
	};
	// 4. Verifica si es padre, hijo o nieto
	this.clickCheckbox = function(){
		//- Si eres el input del título
		if($(this.ele).parents(this.defaults.titled).length){
			var $padre = $(this.ele).parents(this.defaults.abuelo).find(this.defaults.padre);
			//- Si estas checado, encuentra todos tus descendientes y deschécalos junto contigo
			if($(this.ele).parent().find(this.defaults.inputs).prop('checked')){
				this.checkCheckbox($padre, this.defaults.checkboxUnchecked, this.defaults.checkboxChecked, true);
				// ¿Tiene ícono para abrir acordeón?
				if($(this.ele).parents(this.defaults.abuelo).find('.'+this.defaults.checkboxOpen).length){
					//- Cambiar clase plus al span
					$(this.ele).parents(this.defaults.abuelo).find('.'+this.defaults.checkboxOpen).removeClass(this.defaults.checkboxPlus).addClass(this.defaults.checkboxMinus);
					//- Abre el div
					$padre.stop().slideDown();
				}
				//- Muestra a tu hijo
				$padre.find(this.defaults.nieto).slideDown();
			//- Si no estas checado, encuentra todos tus descendientes y chécalos junto contigo
			} else {
				this.checkCheckbox($padre, this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
				//- Esconde tu hijo
				$padre.find(this.defaults.nieto).stop().slideUp(); 
			}
			//-  Si eres descendiente del título
		} else if($(this.ele).parents(this.defaults.padre).length) {
			//- Descheca a tu ascendente
			this.checkCheckbox($(this.ele).parents(this.defaults.abuelo).find(this.defaults.titled), this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
			//- Si tienes descendientes
			if($(this.ele).parents(this.defaults.hijo).length){
				//- Eres un descendiente
				if($(this.ele).parents(this.defaults.nieto).length){
					this.checkCheckbox($(this.ele).parents(this.defaults.hijo).find(this.defaults.subtitled), this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
				//- Eres el padre de descendientes
				} else {
					//- Si estas checado, encuentra todos tus descendientes y deschécalos junto contigo
					if($(this.ele).parent().find(this.defaults.inputs).prop('checked')){
						//- Muestra a tu hijo
						$(this.ele).parents(this.defaults.hijo).find(this.defaults.nieto).slideDown();
						this.checkCheckbox($(this.ele).parents(this.defaults.hijo), this.defaults.checkboxUnchecked, this.defaults.checkboxChecked, true);
					//- Si no estas checado, encuentra todos tus descendientes y chécalos junto contigo
					} else {
						//- Muestra a tu hijo
						$(this.ele).parents(this.defaults.hijo).find(this.defaults.nieto).slideUp();
						this.checkCheckbox($(this.ele).parents(this.defaults.hijo), this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
					}
				}
			}
		}
	};
	// 5. Si el click estuvo en el checkbox-open
	this.clickOpenBox = function(){
		var $grandpa = $(this.ele).parents(this.defaults.abuelo),
			$father = $grandpa.find(this.defaults.padre),
			$checkbox = $grandpa.find('.'+this.defaults.checkboxOpen),
			minus = this.defaults.checkboxMinus,
			plus = this.defaults.checkboxPlus;
		$checkbox.on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			if($father.css('display') === 'block'){
				$father.stop().slideUp();
				$checkbox.removeClass(minus).addClass(plus);
			} else {
				$father.stop().slideDown();
				$checkbox.removeClass(plus).addClass(minus);
			}
		});
	};
    // Activa el acordeón.
    this.activateToggleCheck();
};