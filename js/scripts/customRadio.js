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
			classBorder: 'radio-border',
			innerBorder: 'radio-border-inside',
			outerBorder: 'radio-border-outside',
			classLightBorder: 'radio-border-light',
			textSpanRadio: 'radio-text',
			tooltipClass: 'tool-tip',
			classSoldout: 'radio-soldout',
			classImg: 'radio-img',
			justClick: false,
			onClickRadio: false

		}, options),
		wrappingInput = function(obj){
			$(obj).find(defaults.radio).each(function(){
				var $this = $(this);
				if(!$this.parents('.'+defaults.wrapper).length){
					if($this.next().is('label') ){
						$this.next().andSelf().wrapAll('<div class="'+ defaults.wrapper +'"/>');
					} else {
						$this.wrap('<div class="'+ defaults.wrapper +'"/>');
					}
					if($this.prop('checked')){
						$this.parent().prepend('<span class="'+ defaults.spanRadio +' '+ defaults.spanSelected +'" title="'+ $(this).val() +'"><span class="'+defaults.textSpanRadio+'">'+$(this).val()+'</span></span>');
					} else {
						$this.parent().prepend('<span class="'+ defaults.spanRadio +'" title="'+ $(this).val() +'"><span class="'+defaults.textSpanRadio+'">'+$(this).val()+'</span></span>');
					}
				}
				if($this.data('color')){
					customColor(this);
				}
				if($this.data('colorborder')){
					customBorder(this);
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
			$(obj).find('label').click(function(e){
				e.stopPropagation();
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
		checkContrast = function(hexcolor){
			var r = parseInt(hexcolor.substr(0,2),16);
			var g = parseInt(hexcolor.substr(2,2),16);
			var b = parseInt(hexcolor.substr(4,2),16);
			var yiq = ((r*299)+(g*587)+(b*114))/1000;
			// console.log(yiq);
			return (yiq <= 210) ? 0 : 1;
		},
		clickingRadio = function(obj){
			$(obj).find('.'+ defaults.spanRadio).click(function(e){
				e.stopPropagation();
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
		customBorder = function(obj){
			var borderAttr = 'background-color: #'+$(obj).data('colorborder'),
				contrast = checkContrast(String($(obj).data('colorborder'))),
				$spanRadio = $(obj).parent().find('.'+defaults.spanRadio),
				spanClass = defaults.spanRadio+' '+defaults.classBorder;
			if(contrast > 0) {
				spanClass = spanClass+' '+defaults.classLightBorder;
			}
			$spanRadio.attr({'class': spanClass, 'style': borderAttr})
				.append('<span class="'+ defaults.outerBorder +'" ></span>')
				.append('<span class="'+ defaults.innerBorder +'" style="'+ borderAttr +'"></span>');
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
				$(this).find('label').click(function(e){
					e.stopPropagation();
					$(this).parent().find('.' + defaults.spanRadio).trigger('click');
				});
			}
		});
	};