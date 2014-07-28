// +++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSELECT: Customizar el select
// +++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.customSelect = function(options){
		var defaults = $.extend({
			selectHidden: 'select-hidden',
			divSelect: 'select-div',
			inputSelect: 'select-input',
			claseIcon: 'icon',
			claseTrigger: 'iconFont-downmenu',
			ulOptions: 'select-ul',
			claseActivo: 'select-activo',
			selectActive: 'select-active',
			onChangeSelect: false,
			disabledInput: 'select-disabled'
		}, options), numberOfOptions, selectContent, styledSelect, list, listItems,
		addClass = function(obj){
			if($(obj).data('clase')){
				$(obj).parent().addClass($(obj).data('clase'));
			} else {
				$(obj).parent().addClass($(obj).parent().parent().attr('class'));
			}
		},
		addInput = function(obj){
			if($(obj).data('inputselect')) {
				selectContent = '<input type="text" class="'+ defaults.inputSelect +'">';
			} else {
				selectContent = '<span class="'+ defaults.inputSelect +'"/>';
			}
			$(obj).after(selectContent+'<span class="'+ defaults.claseTrigger +'"/>');
			addInputSelect(obj);
		},
		addInputSelect = function(obj){
			styledSelect = $(obj).siblings('.'+ defaults.inputSelect);
			if($(obj).attr('disabled')){
				if($(obj).data('inputselect')){
					styledSelect.attr('disabled', 'disabled');
				}
				styledSelect.addClass(defaults.disabledInput).siblings('.'+defaults.claseTrigger).addClass(defaults.disabledInput);
			}
			var valor = $(obj).children('option').eq(0).text(),
				classOption = '', inputValue;
			$(obj).children('option').each(function(i){
				if ($(this).attr('selected')){
					valor = $(this).text();
					if(i !== 0) {
						classOption = defaults.selectActive;
						inputValue = true;
					}
				}
			});
			if($(obj).children('option').eq(0).data('icon')) {
				classOption = classOption + ' ' + $(obj).children('option').eq(0).data('icon');
			}
			if($(obj).data('inputselect')) {
				styledSelect.attr('placeholder',$(obj).children('option').eq(0).text());
				if(inputValue){
					styledSelect.val(valor);
				}
			} else {
				styledSelect.text(valor);
			}
			styledSelect.addClass(classOption);
			addLista(obj);
		},
		addLista = function(obj){
			list = $('<ul />', {
					'class': defaults.ulOptions
				}).insertAfter($(obj).parent().find('span.'+ defaults.claseTrigger));
			for (var i = 0; i < numberOfOptions; i++) {
				var $opLi = $(obj).children('option').eq(i);
				$('<li />', {
					text: $opLi.text(),
					rel: $opLi.val(),
					'data-icon': $opLi.data('icon')
				}).appendTo(list);
			}
			listItems = list.children('li');
			clickingTrigger(obj);
		},
		changeSelect = function(obj){
			defaults.onChangeSelect(obj);
		},
		clickingTrigger = function(obj){
			$(obj).parent().on('click', 'span.'+ defaults.claseTrigger, function(e){
				if(!$(this).hasClass(defaults.disabledInput)){
					e.stopPropagation();
					$('.'+defaults.ulOptions).hide();
					$(obj).siblings('.'+ defaults.inputSelect).toggleClass(defaults.claseActivo);
					$(this).next('ul.'+ defaults.ulOptions).toggle();
				}
			});
			clickingOption(obj);
		},
		clickingDocument = function(obj){
			$(obj).siblings('.'+ defaults.inputSelect).removeClass(defaults.claseActivo);
			$('.'+defaults.ulOptions).hide();
		},
		clickingOption = function(obj){
			$(obj).change().parent().on('click', 'ul li', function(e){
				resetSelected(obj);
				e.stopPropagation();
				styledSelect = $(obj).siblings('.'+ defaults.inputSelect);
				var $this = $(this);
				if($(obj).data('inputselect')) {
					styledSelect.val($this.text());
				} else {
					styledSelect.text($this.text());
				}
				styledSelect.removeClass(defaults.claseActivo)
				.addClass(defaults.selectActive);
				$(obj).val($this.attr('rel'));
				for(var o=0, opts = $(obj).children('option'); o < opts.length; o++){
					if(opts.eq(o).val() === $this.attr('rel')) {
						opts.eq(o).attr('selected', 'selected');
						if(o === 0){
							styledSelect.val('');
							styledSelect.removeClass(defaults.selectActive);
						}
					}
				}
				$(obj).siblings('ul').hide();
				$(obj).trigger('change');
			});
			$(obj).on('change', function(e){
				e.stopPropagation();
				if(defaults.onChangeSelect){
					changeSelect(obj);
				}
			});
			$(document).click(function(){
				clickingDocument(obj);
			});
		},
		resetSelected = function(obj){
			$(obj).children('option').each(function(){
				$(this).removeAttr('selected');
			});
		},
		wrappingSelect = function(obj){
			numberOfOptions = $(obj).children('option').length;
			$(obj).addClass(defaults.selectHidden);
			$(obj).wrap('<div class="'+ defaults.divSelect +'"/>');
			addClass(obj);
			addInput(obj);
		};
		return this.each(function(){
			wrappingSelect(this);
		});
	};