jQuery.fn.dropMainMenu=function(n){var e=$.extend({contenedor:".dropMenu",claseActivo:"active",wrapper:".wrapper",closeBtn:".miCuenta-close",beforeOpen:$.noop},n),o,c=function(n){($(n).is(e.claseActivo)||e.beforeOpen()!==!1)&&($(n).siblings(e.contenedor).stop(!0,!0).slideToggle(),$(n).toggleClass(e.claseActivo))},t=function(n){$(n).siblings(e.contenedor).stop(!0,!0).slideUp(),$(n).removeClass(e.claseActivo)};return this.each(function(){var n=this,i=$(n).next(e.contenedor).find(e.wrapper);o=$(n).attr("class").split(" ")[0],$(n).on("click",function(i){i.stopPropagation(),"none"===$(n).siblings(e.contenedor).css("display")&&t("."+o),c(n)}),i.on("click",e.closeBtn,function(){$(n).trigger("click")}),$(this).data("cart")&&(i=$(n).next(e.contenedor).find(e.wrapper).children().eq(0)),i.on({click:function(n){n.stopPropagation()},mouseenter:function(){$(this).addClass(e.claseActivo),$(n).show()},mouseleave:function(){$(this).removeClass(e.claseActivo),$(document).click(function(){t(n),$(document).unbind("click")})}})})};