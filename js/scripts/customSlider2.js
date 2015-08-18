// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSLIDER: Deslizar el rango para cambiar valor de bits
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var putCommas = function (numero) {
        var nums = [],
            res = "",
            value = numero.toString(),
            simb = ',';
        value = value.replace(/\D/g, ""); // Expresión regular que permite ingresar sólo números
        nums = value.split("");
        var long = nums.length - 1,
            patron = 3, // Cada cuando se pone la coma
            prox = 2; // En qué lugar se inserta la siguiente coma
        while (long > prox) {
            nums.splice((long - prox), 0, simb); // Se agrega la coma
            prox += patron;
        }
        for (var i = 0; i <= nums.length - 1; i++) {
            res += nums[i];
        }
        return res;
    };
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
		price, priceItem, datamax, realpriceItem, realprice, percent, percentItem, totalprice, totalpriceItem,
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
				realpriceItem.text(putCommas(realprice));
			}
			if($(obj).data('percent') && $(obj).data('realprice')){
				percentItem = $('.'+$(obj).data('percent'));
				percent = 100 - parseInt((100 * price) / realprice, 10);
				percentItem.text(percent);
			}
			if($(obj).data('save')){
				$('.'+$(obj).data('saveitem')).text(putCommas($(obj).data('save')));
			}
			if($(obj).data('price')){
				$('.'+$(obj).data('priceitem')).text(putCommas($(obj).data('price')));
			}
			if($(obj).data('shipping')){
				$('.'+$(obj).data('shippingitem')).text(putCommas($(obj).data('shipping')));
			}
			if($(obj).data('totalprice')){
				totalpriceItem = $('.'+$(obj).data('totalpriceitem'));
				if($(obj).data('shipping')) {
					totalprice = parseInt($(obj).data('price'), 10) + parseInt($(obj).data('shipping'), 10);
				} else {
					totalprice = $(obj).data('price');
				}
				totalpriceItem.text(putCommas(totalprice));
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
					var maxSelection, previousValue, value, $this=$(obj);
					maxSelection = parseInt($this.data('max-selection') || '0');
					value = Math.min(maxSelection, ui.value);
					previousValue = $this.val();
					$this.val(value);
					$this.parent().find(".slider-amount em").text(value);
					if (ui.value > maxSelection) {
						if (previousValue !== maxSelection) {
							$(this).slider('value', maxSelection);
						}
						return false;
					}
				},
				step: $(obj).data('step')
			});
		},
		putCommas = function(numero){
			var nums = [],
				res = "",
				value = numero.toString(),
				simb = ',';
			value = value.replace(/\D/g, ""); // Expresión regular que permite ingresar sólo números
			nums = value.split("");
			var long = nums.length -1,
				patron = 3, // Cada cuando se pone la coma
				prox = 2; // En qué lugar se inserta la siguiente coma
			while (long > prox){
				nums.splice((long - prox), 0, simb); // Se agrega la coma
				prox += patron;
			}
			for (var i=0; i<=nums.length-1; i++){
				res += nums[i];
			}
			return res;
		};
		return this.each(function(){
			wrappingInput(this);
		});
	};