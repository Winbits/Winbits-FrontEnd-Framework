// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSLIDER: Deslizar el rango para cambiar valor de bits
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.customSlider = function(options){
		var defaults = $.extend({
			wrapper: 'slider-wrapper',
			holder: 'slider-holder',
			handle: 'ui-slider-handle',
			bit: 'iconBit bit13px',
			amount: 'slider-amount',
			textValue: 'slider-textValue',
			textMin: 'slider-minValue',
			textMax: 'slider-maxValue'
		}, options),
		price, priceItem, datamax, realpriceItem, realprice, percent, percentItem,
		wrappingInput = function(obj){
			asignaValues(obj);
			$(obj).wrap('<div class="'+ defaults.wrapper +'"><div class="'+ defaults.holder +'"/>');
			$(obj).parent().append('<a href="#" class="'+ defaults.handle +'"><div class="'+ defaults.bit +'"><span class="iconBG"/><span class="iconFont-bit"/></div><span class="'+ defaults.amount +'">$<em>'+$(obj).val()+'</em></span></a>');
			$(obj).parent().parent().append('<span class="'+ defaults.textValue +' '+ defaults.textMin +'">'+$(obj).data('min')+'</span><span class="'+ defaults.textValue +' '+ defaults.textMax +'">'+datamax+'</span>');
			initSlider(obj);
		},
		asignaValues = function(obj){
			if($(obj).data('moveprice')){
				priceItem = $('.'+$(obj).data('priceitem'));
				price = parseInt($(obj).data('price'), 10);
				priceItem.text(price);
				if($(obj).data('max') > price) {
					datamax = price;
				} else {
					datamax = $(obj).data('max');
				}
			}
			if($(obj).data('realprice')){
				realpriceItem = $('.'+$(obj).data('realpriceitem'));
				realprice = parseInt($(obj).data('realprice'),10);
				realpriceItem.text(realprice);
			}
			if($(obj).data('percent') && $(obj).data('realprice')){
				percentItem = $('.'+$(obj).data('percent'));
				percent = 100 - parseInt((100 * price) / realprice, 10);
				percentItem.text(percent);
			}
			if($(obj).data('save')){
				$('.'+$(obj).data('saveitem')).text($(obj).data('save'));
			}
		},
		initSlider = function(obj){
			$(obj).parent().parent().find('.'+defaults.holder).slider({
				range: 'min',
				value: +$(obj).val(),
				min: +$(obj).data('min'),
				max: +datamax,
				slide: function(event, ui){
					$(obj).val(ui.value);
					$(obj).parent().find('.'+ defaults.amount +' em').text(+ui.value);
					if($(obj).data('moveprice')) {
						priceItem.text(price - ui.value);
					}
					if($(obj).data('percent') && $(obj).data('realprice')){
						percent = 100 - parseInt((100 * (price - ui.value)) / realprice, 10);
						percentItem.text(percent);
					}
					if($(obj).data('save')){
						$('.'+$(obj).data('saveitem')).text($(obj).data('save')+ui.value);
					}
				},
				step: $(obj).data('step')
			});
		};
		return this.each(function(){
			wrappingInput(this);
		});
	};