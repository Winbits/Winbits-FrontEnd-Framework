// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSLIDER: Deslizar el rango para cambiar valor de bits
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	var putCommas = function (numero) {
        var res;
        if(numero%1){
        	var parts = numero.toString().split('.');
        	res = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '.' + parts[1];
        } else {
        	res = numero.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
        return res;
    };
    
	jQuery.fn.customSlider = function (options) {
	    var defaults = $.extend({
	        wrapper: 'slider-wrapper',
	        holder: 'slider-holder',
	        handle: 'ui-slider-handle',
	        bit: 'iconBit bit18px',
	        amount: 'slider-amount',
	        textValue: 'slider-textValue',
	        textMin: 'slider-minValue',
	        textMax: 'slider-maxValue',
	        sliderBG: 'iconFont-slideBG',
	        maxSelection: "maxselection"
	    }, options),
	    price, priceItem, datamax, realpriceItem, realprice, percent, percentItem, totalprice, totalpriceItem, maxSelection = 0, 
	    wrappingInput = function (obj) {
	        asignaValues(obj);
	        if($(obj).data(defaults.maxselection)){
	        	maxSelection = parseInt($(obj).data(defaults.maxSelection));
	        }
	        if(!$(obj).parents('.'+defaults.wrapper).length){
	        	$(obj).wrap('<div class="' + defaults.wrapper + '"><div class="' + defaults.holder + '"/>');
	        	$(obj).parent().append('<div class="' + defaults.sliderBG + '"></div><a href="#" class="' + defaults.handle + '"><div class="' + defaults.bit + '"><span class="iconBG"/><span class="iconFont-bit"/></div><span class="' + defaults.amount + '">$<em>' + $(obj).val() + '</em></span></a>');
	        	$(obj).parent().parent().append('<span class="' + defaults.textValue + ' ' + defaults.textMin + '">' + $(obj).data('min') + '</span><span class="' + defaults.textValue + ' ' + defaults.textMax + '">' + putCommas(datamax) + '</span>');
	        }
	        initSlider(obj);
	    },
	    asignaValues = function (obj) {
	        if ($(obj).data('moveprice')) {
	            priceItem = $('.' + $(obj).data('priceitem'));
	            price = parseInt($(obj).data('price'), 10);
	            priceItem.text(price);
	            if ($(obj).data('max') > price) {
	                datamax = price;
	            } else {
	                datamax = $(obj).data('max');
	            }
	        }
	        if ($(obj).data('realprice')) {
	            realpriceItem = $('.' + $(obj).data('realpriceitem'));
	            realprice = parseInt($(obj).data('realprice'), 10);
	            realpriceItem.text(putCommas(realprice));
	        }
	        if ($(obj).data('percent') && $(obj).data('realprice')) {
	            percentItem = $('.' + $(obj).data('percent'));
	            percent = 100 - parseInt((100 * price) / realprice, 10);
	            percentItem.text(percent);
	        }
	        if ($(obj).data('save')) {
	            $('.' + $(obj).data('saveitem')).text(putCommas($(obj).data('save')));
	        }
	        if ($(obj).data('price')) {
	            $('.' + $(obj).data('priceitem')).text(putCommas($(obj).data('price')));
	        }
	        if ($(obj).data('shipping')) {
	            $('.' + $(obj).data('shippingitem')).text(putCommas($(obj).data('shipping')));
	        }
	        if ($(obj).data('totalprice')) {
	            totalpriceItem = $('.' + $(obj).data('totalpriceitem'));
	            if ($(obj).data('shipping')) {
	                totalprice = parseInt($(obj).data('price'), 10) + parseInt($(obj).data('shipping'), 10);
	            } else {
	                totalprice = $(obj).data('price');
	            }
	            totalpriceItem.text(putCommas(totalprice));
	        }
	    },
	    initSlider = function (obj) {
	        $(obj).parent().parent().find('.' + defaults.holder).slider({
	            range: 'min',
	            value: +$(obj).val(),
	            min: +$(obj).data('min'),
	            max: +datamax,
	            slide: function (event, ui) {
	                var previousValue = $(obj).val();
	                if (ui.value > maxSelection) {
	                    if (previousValue != maxSelection) {
	                        $(this).slider('value', maxSelection);
	                        $(obj).val(maxSelection);                        
	                        $(obj).parent().find('.' + defaults.amount + ' em').text(+maxSelection);
	                        totalpriceItem.text(putCommas(totalprice - maxSelection));
	                        $('.' + $(obj).data('saveitem')).text(putCommas($(obj).data('save') + maxSelection));
	                    }
	                    return false;
	                }
	                $(obj).val(ui.value);
	                var valor = +ui.value;
	                $(obj).parent().find('.' + defaults.amount + ' em').text(putCommas(valor));
	                if ($(obj).data('moveprice')) {
	                    totalpriceItem.text(putCommas(totalprice - ui.value));
	                }
	                if ($(obj).data('percent') && $(obj).data('realprice')) {
	                    percent = 100 - parseInt((100 * (price - ui.value)) / realprice, 10);
	                    percentItem.text(percent);
	                }
	                if ($(obj).data('save')) {
	                    $('.' + $(obj).data('saveitem')).text(putCommas($(obj).data('save') + ui.value));
	                }
	                
	            },
	            step: $(obj).data('step')
	        });
	    };
	    return this.each(function () {
	        wrappingInput(this);
	    });
	};