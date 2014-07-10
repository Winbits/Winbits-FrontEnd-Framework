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
				$(this).appendTo($(this).next());
				var $this = this;
				$(this).parent().parent().find('.'+ defaults.spanIcon).click(function(){
					clickingCheckbox($this, this);
				});
				$(this).parent().click(function(e){
					e.preventDefault();
					$(this).parent().find('.'+ defaults.spanIcon).trigger('click');
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
				$(trigger).removeClass(defaults.selectClass);
				$(trigger).addClass(defaults.unSelectClass);
				$(obj).prop('checked', false);
			} else {
				$(trigger).removeClass(defaults.unSelectClass);
				$(trigger).addClass(defaults.selectClass);
				$(obj).prop('checked', true);
			}
		};
		return this.each(function(){
			wrappingInput(this);
		});
	};