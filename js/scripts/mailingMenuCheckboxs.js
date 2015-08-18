// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      MAILINGMENUCHECKBOXS: Eventos / efectos para los checkboxes y radios del menú
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	function checkOverlay (options){
		var defaults = $.extend({
			parents: '.column-checkboxs',
			siblings: '.column-radios',
			checkboxSpan: '.checkbox-span',
			checkboxChecked: 'checkbox-checked',
			overlay: '.mailingOverlay',
			radio: 'input[type="radio"]',
			radioSpan: '.radio-span',
			radioSelected: 'radio-selected',
			grandparent: '#wb-micuenta-mailing'
		}, options),
		checkCheckbox = function(){
			if($(defaults.parents).find(defaults.checkboxSpan).hasClass(defaults.checkboxChecked)){
				$(defaults.grandparent).find(defaults.overlay).slideUp();
			} else {
				$(defaults.grandparent).find(defaults.overlay).slideDown();
				$(defaults.grandparent).find(defaults.siblings)
				.find(defaults.radioSpan).removeClass(defaults.radioSelected)
				.parent().find(defaults.radio).prop('checked', false);
			}
		};
		checkCheckbox();
	}
	// jQuery.fn.mailingMenuCheckboxs = function(options){
	// 	var defaults = $.extend({
	// 		checkSiblings: '.column-siblings',
	// 		checkboxSpan: '.checkbox-span',
	// 		checkboxUnchecked: 'checkbox-unchecked',
	// 		checkboxChecked: 'checkbox-checked',
	// 		overlay: 'mailingOverlay',
	// 		radio: 'input[type="radio"]',
	// 		spanRadio: 'radio-span',
	// 		spanSelected: 'radio-selected'
	// 	}, options), overlay = 0,
	// 	checkEach = function(obj){
	// 		if($(obj).find(defaults.checkboxSpan).hasClass(defaults.checkboxChecked)){
	// 			console.log('sip');
	// 		}
	// 	},
	// 	checkCheckbox = function(item, obj, init){
	// 		if($(item).hasClass(defaults.checkboxChecked)) {
	// 			overlay = overlay + 1;
	// 		} else {
	// 			if (!init){
	// 				overlay = overlay - 1;
	// 			}
	// 		}
	// 		if(overlay <= 0){
	// 			appendOverlay(obj);
	// 			overlay = 0;
	// 		} else {
	// 			removeOverlay(obj);
	// 		}
	// 	},
	// 	appendOverlay = function(obj){
	// 		if(!$(obj).find('.' + defaults.overlay).length) {
	// 			$(obj).append('<div class="'+ defaults.overlay + '"/>');
	// 			uncheckRadio(obj);
	// 		}
	// 	},
	// 	removeOverlay = function(obj){
	// 		if($(obj).find('.' + defaults.overlay).length) {
	// 			$(obj).find('.' + defaults.overlay).remove();
	// 		}
	// 	},
	// 	uncheckRadio = function(obj){
	// 		$(obj).find(defaults.radio).each(function(){
	// 			$(this).prop('checked', false);
	// 			$(this).parent().parent().find('.'+defaults.spanRadio).removeClass(defaults.spanSelected);
	// 		});
	// 	};
	// 	return this.each(function(){
	// 		checkEach(this);
	// 	});
	// };