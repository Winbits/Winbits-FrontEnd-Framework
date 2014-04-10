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
			onChangeSelect: false
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
			var valor = $(obj).children('option').eq(0).text();
			$(obj).children('option').each(function(){
				if ($(this).attr('selected') === 'selected'){
					valor = $(this).text();
				}
			});
			if($(obj).data('inputselect')) {
				styledSelect.attr('placeholder',valor)
				.addClass($(obj).children('option').eq(0).data('icon'));
			} else {
				styledSelect.text(valor)
				.addClass($(obj).children('option').eq(0).data('icon'));
			}
			addLista(obj);
		},
		addLista = function(obj){
			list = $('<ul />', {
					'class': defaults.ulOptions
				}).insertAfter($(obj).parent().find('span.'+ defaults.claseTrigger));
			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $(obj).children('option').eq(i).text(),
					rel: $(obj).children('option').eq(i).val(),
					'data-class': $(obj).children('option').eq(i).data('icon')
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
				e.stopPropagation();
				$(obj).siblings('.'+ defaults.inputSelect).toggleClass(defaults.claseActivo);
				$(this).next('ul.'+ defaults.ulOptions).toggle();
			});
			clickingOption(obj);
		},
		clickingDocument = function(obj){
			$(document).click(function () {
				$(obj).siblings('.'+ defaults.inputSelect).removeClass(defaults.claseActivo);
				$(obj).siblings('ul').hide();
			});
		},
		clickingOption = function(obj){
			$(obj).change().parent().on('click', 'ul li', function(e){
				resetSelected(obj);
				e.stopPropagation();
				styledSelect = $(obj).siblings('.'+ defaults.inputSelect);
				var $this = $(this);
				if($(obj).data('inputselect')) {
					styledSelect.val($this.text()).removeClass(defaults.claseActivo)
					.addClass(defaults.selectActive +' '+ $this.data('clase'));
				} else {
					styledSelect.text($this.text()).removeClass(defaults.claseActivo)
					.addClass(defaults.selectActive +' '+ $this.data('clase'));
				}
				$(obj).val($this.attr('rel'));
				for(var o=0, opts = $(obj).children('option'); o < opts.length; o++){
					if(opts.eq(o).val() === $this.attr('rel')) {
						opts.eq(o).attr('selected', 'selected');
					}
				}
				$(obj).siblings('ul').hide();
				clickingDocument(obj);
				$(obj).trigger('change');
			});
			$(obj).on('change', function(e){
				e.stopPropagation();
				if(defaults.onChangeSelect){
					changeSelect(obj);
				}
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