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
				if(!$($this).parents('.' + defaults.wrapper).length) {
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
				}
				$($this).parents('.'+defaults.wrapper).click(function(){
					clickingCheckbox($this, $($this).parents('.'+defaults.wrapper).children('.' + defaults.spanIcon));
				});
				if($($this).data('color')){
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