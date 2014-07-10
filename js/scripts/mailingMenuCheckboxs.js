// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      MAILINGMENUCHECKBOXS: Eventos / efectos para los checkboxes y radios del menú
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.mailingMenuCheckboxs = function(options){
		var defaults = $.extend({
			checkboxSpan: '.checkbox-span',
			checkboxUnchecked: 'checkbox-unchecked',
			checkboxChecked: 'checkbox-checked',
			checkboxAll: '.checkall',
			overlay: 'mailingOverlay',
			radio: 'input[type="radio"]',
			spanRadio: 'radio-span',
			spanSelected: 'radio-selected'
		}, options), overlay = 0,
		checkAll = function(obj){
			$(obj).find(defaults.checkboxAll).parent().siblings(defaults.checkboxSpan).click(function(){
				var checkUnchec = $(this).attr('class').split(' ')[1];
				$(this).parent().siblings().each(function(){
					if(!$(this).find(defaults.checkboxSpan).hasClass(checkUnchec)){
						$(this).find(defaults.checkboxSpan).trigger('click');
					}
				});
			});
		},
		checkEach = function(obj){
			$(obj).parent().find(defaults.checkboxSpan).each(function(){
				checkCheckbox(this, obj, 1);
			}).click(function(){
				checkCheckbox(this, obj);
			});
		},
		checkCheckbox = function(item, obj, init){
			if($(item).hasClass(defaults.checkboxChecked)) {
				overlay = overlay + 1;
			} else {
				if (!init){
					overlay = overlay - 1;
				}
			}
			if(overlay <= 0){
				appendOverlay(obj);
				overlay = 0;
			} else {
				removeOverlay(obj);
			}
		},
		appendOverlay = function(obj){
			if(!$(obj).find('.' + defaults.overlay).length) {
				$(obj).append('<div class="'+ defaults.overlay + '"/>');
				uncheckRadio(obj);
			}
		},
		removeOverlay = function(obj){
			if($(obj).find('.' + defaults.overlay).length) {
				$(obj).find('.' + defaults.overlay).remove();
			}
		},
		uncheckRadio = function(obj){
			$(obj).find(defaults.radio).each(function(){
				$(this).prop('checked', false);
				$(this).parent().parent().find('.'+defaults.spanRadio).removeClass(defaults.spanSelected);
			});
		};
		return this.each(function(){
			checkAll(this);
			checkEach(this);
		});
	};