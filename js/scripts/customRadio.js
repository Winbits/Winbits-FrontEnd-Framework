// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMRADIO: Cambiar radio buttons por input text para el género
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.customRadio = function(options){
		var defaults = $.extend({
			wrapper: 'radio-wrapper',
			spanRadio: 'radio-span',
			spanSelected: 'radio-selected',
			radio: 'input[type="radio"]',
			classColor: 'radio-color',
			tooltipClass: 'tool-tip',
			classSoldout: 'radio-soldout',
			classImg: 'radio-img',
			justClick: false,
			onClickRadio: false

		}, options),
		wrappingInput = function(obj){
			$(obj).find(defaults.radio).each(function(){
				var $this = $(this);
				if($this.next().is('label')){
					$this.next().andSelf().wrapAll('<div class="'+ defaults.wrapper +'"/>');
				} else {
					$this.wrap('<div class="'+ defaults.wrapper +'"/>');
				}
				if($this.prop('checked')){
					$this.parent().prepend('<span class="'+ defaults.spanRadio +' '+ defaults.spanSelected +'">'+$(this).val()+'</span>');
				} else {
					$this.parent().prepend('<span class="'+ defaults.spanRadio +'">'+$(this).val()+'</span>');
				}
				if($this.data('color')){
					customColor(this);
				}
				if($this.data('soldout')){
					soldOut(this);
				}
				if($this.data('img')){
					customImg(this);
				}
				if($this.data('class')){
					addClass(this);
				}
				$this.appendTo($this.next());
			});
			clickingRadio(obj);
			$(obj).find('label').click(function(){
				$(this).parent().find('.' + defaults.spanRadio).trigger('click');
			});
		},
		addClass = function(obj){
			$(obj).parent().find('.'+defaults.spanRadio).addClass($(obj).data('class')).text('');
		},
		unchecRadio = function(obj){
			$(obj).find(defaults.radio).each(function(){
				$(this).prop('checked', false);
				$(this).parent().parent().find('.'+defaults.spanRadio).removeClass(defaults.spanSelected);
			});
		},
		clickingRadio = function(obj){
			$(obj).find('.'+ defaults.spanRadio).click(function(){
				var $input = $(this).parent().find(defaults.radio);
				unchecRadio(obj);
				if(!($input.prop('checked'))){
					$input.prop('checked', true);
					if($input.length) {
						$(this).addClass(defaults.spanSelected);
					}
				}
				if(defaults.onClickRadio){
					defaults.onClickRadio(obj);
				}
			});
		},
		customColor = function(obj){
			$(obj).parent().find('.'+defaults.spanRadio).addClass(defaults.classColor).css('background-color', '#'+$(obj).data('color'));
			$(obj).parent().find('.'+defaults.spanRadio).toolTip({clase: defaults.tooltipClass});
		},
		customImg = function(obj){
			$(obj).parent().find('.'+defaults.spanRadio).addClass(defaults.classImg).css('background-image', 'url('+$(obj).data('img')+')');
			$(obj).parent().find('.'+defaults.spanRadio).toolTip({clase: defaults.tooltipClass});
		},
		soldOut = function(obj){
			$(obj).parent().find('.'+defaults.spanRadio).addClass(defaults.classSoldout);
			$(obj).remove();
		};
		return this.each(function(){
			if(!defaults.justClick) {
				wrappingInput(this);
			} else {
				clickingRadio(this);
				$(this).find('label').click(function(){
					$(this).parent().find('.' + defaults.spanRadio).trigger('click');
				});
			}
		});
	};