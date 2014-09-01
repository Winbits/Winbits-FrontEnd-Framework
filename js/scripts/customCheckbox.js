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
			onClickCall: false
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
			});
		},
		checkingChecked = function(obj){
			if($(obj).prop('checked')){
				clase = defaults.selectClass;
			} else {
				clase = defaults.unSelectClass;
			}
		},
		clickingCheckbox = function(obj, trigger){
			if($(obj).prop('checked')){
				$(trigger).removeClass(defaults.selectClass).addClass(defaults.unSelectClass);
				$(obj).prop('checked', false);
			} else {
				$(trigger).removeClass(defaults.unSelectClass).addClass(defaults.selectClass);
				$(obj).prop('checked', true);
			}
			if(defaults.onClickCall){
				onClickCallback(obj, $(obj).parents('.'+defaults.wrapper));
			}
		},
		onClickCallback = function(obj, parent){
			defaults.onClickCall(obj, parent);
		};
		return this.each(function(){
			wrappingInput(this);
		});
	};