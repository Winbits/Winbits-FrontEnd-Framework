// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      PLACEHOLDER: Simulación de placeholder para IE8 - 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.placeholder = function(options){
		var defaults = $.extend({
			wrapper: 'placeholder-div',
			holder: 'placeholder-span',
			item: 'placeholder-item'
		}, options),
		attachEvents = function(obj){
			$(obj).on({
				'change keyup': function(){
					if($(obj).val()) {
						$(obj).parent().find('.' + defaults.holder).hide();
					} else {
						$(obj).parent().find('.' + defaults.holder).show();
					}
				}
			});
		},
		wrappingItem = function(obj){
			$(obj).attr({
				'autocomplete': 'off',
				'autocorrect': 'off',
				'autocapitalize': 'off',
				'data-placeholder': $(obj).attr('placeholder')
			}).removeAttr('placeholder', '').addClass(defaults.item);
			$(obj).wrap('<div class="' + defaults.wrapper + '"/>');
			$(obj).parent().append('<span class="' + defaults.holder + '"/>');
			$(obj).parent().find('.' + defaults.holder).text($(obj).data('placeholder'));
		};
		return this.each(function(){
			if($(this).attr('placeholder')){
				wrappingItem(this);
				attachEvents(this);
			}
		});
	};