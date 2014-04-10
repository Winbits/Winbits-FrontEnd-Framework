// +++++++++++++++++++++++++++++++++++++++++
//      CUSTOMCHECKBOX: Cambiar checkbox
// +++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.customCheckbox = function(options){
		var defaults = $.extend({
			checkbox: 'input[type="checkbox"]',
			selectClass: 'checkbox-checked',
			unSelectClass: 'checkbox-unchecked',
			wrapper: 'checkbox-wrapper',
			spanIcon: 'checkbox-span'
		}, options), clase,
		wrappingInput = function(obj){
			$(obj).find(defaults.checkbox).each(function(){
				checkingChecked(this);
				if($(this).next().is('label')){
					$(this).next().andSelf().wrapAll('<div class="'+ defaults.wrapper +'"/>');
				} else {
					$(this).wrap('<div class="'+ defaults.wrapper +'"/>');
				}
				$(this).parent().prepend('<span class="'+ defaults.spanIcon +' '+ clase +'"/>');
				clickingCheckbox(this);
			});
		},
		checkingChecked = function(obj){
			if($(obj).prop('checked')){
				clase = defaults.selectClass;
			} else {
				clase = defaults.unSelectClass;
			}
		},
		clickingCheckbox = function(obj){
			$(obj).parent().find('.'+ defaults.spanIcon).click(function(){
				if($(obj).prop('checked')){
					$(this).removeClass(defaults.selectClass);
					$(this).addClass(defaults.unSelectClass);
					$(obj).attr('checked', false);
				} else {
					$(this).removeClass(defaults.unSelectClass);
					$(this).addClass(defaults.selectClass);
					$(obj).attr('checked', true);
				}
			});
		};
		return this.each(function(){
			wrappingInput(this);
		});
	};