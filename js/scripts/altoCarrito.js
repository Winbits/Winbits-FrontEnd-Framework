// +++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSELECT: Customizar el select
// +++++++++++++++++++++++++++++++++++++++++++

    jQuery.fn.altoCarrito = function(options){
        var defaults = $.extend({
            carritoItems: '.carritoDivLeft',
            carritoPrice: '.carritoDivRight',
            carritoItemsContent: '.carritoContainer'
        }, options);
        return this.each(function(){
            $(this).show();
            var altoItems = $(this).find(defaults.carritoItems).height(),
                altoPrice = $(this).find(defaults.carritoPrice).height();
            if (altoItems < altoPrice){
              $(this).find(defaults.carritoItems).find(defaults.carritoItemsContent).css('height', (altoPrice - 10)+'px');
            }
            $(this).hide();
        });
    };