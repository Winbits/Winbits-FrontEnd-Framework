jQuery.fn.customSlider=function(a){var t=$.extend({wrapper:"slider-wrapper",holder:"slider-holder",handle:"ui-slider-handle",bit:"iconBit bit13px",amount:"slider-amount",textValue:"slider-textValue",textMin:"slider-minValue",textMax:"slider-maxValue",sliderBG:"iconFont-slideBG"},a),e,i,n,r,d,p,s,l,c,o=function(a){u(a),$(a).wrap('<div class="'+t.wrapper+'"><div class="'+t.holder+'"/>'),$(a).parent().append('<div class="'+t.sliderBG+'"></div><a href="#" class="'+t.handle+'"><div class="'+t.bit+'"><span class="iconBG"/><span class="iconFont-bit"/></div><span class="'+t.amount+'">$<em>'+$(a).val()+"</em></span></a>"),$(a).parent().parent().append('<span class="'+t.textValue+" "+t.textMin+'">'+$(a).data("min")+'</span><span class="'+t.textValue+" "+t.textMax+'">'+n+"</span>"),v(a)},u=function(a){$(a).data("moveprice")&&(i=$("."+$(a).data("priceitem")),e=parseInt($(a).data("price"),10),i.text(e),n=$(a).data("max")>e?e:$(a).data("max")),$(a).data("realprice")&&(r=$("."+$(a).data("realpriceitem")),d=parseInt($(a).data("realprice"),10),r.text(x(d))),$(a).data("percent")&&$(a).data("realprice")&&(s=$("."+$(a).data("percent")),p=100-parseInt(100*e/d,10),s.text(p)),$(a).data("save")&&$("."+$(a).data("saveitem")).text(x($(a).data("save"))),$(a).data("price")&&$("."+$(a).data("priceitem")).text(x($(a).data("price"))),$(a).data("shipping")&&$("."+$(a).data("shippingitem")).text(x($(a).data("shipping"))),$(a).data("totalprice")&&(c=$("."+$(a).data("totalpriceitem")),l=$(a).data("shipping")?parseInt($(a).data("price"),10)+parseInt($(a).data("shipping"),10):$(a).data("price"),c.text(x(l)))},v=function(a){$(a).parent().parent().find("."+t.holder).slider({range:"min",value:+$(a).val(),min:+$(a).data("min"),max:+n,slide:function(i,n){$(a).val(n.value),$(a).parent().find("."+t.amount+" em").text(+n.value),$(a).data("moveprice")&&c.text(x(l-n.value)),$(a).data("percent")&&$(a).data("realprice")&&(p=100-parseInt(100*(e-n.value)/d,10),s.text(p)),$(a).data("save")&&$("."+$(a).data("saveitem")).text(x($(a).data("save")+n.value))},step:$(a).data("step")})},x=function(a){var t=[],e="",i=a.toString(),n=",";i=i.replace(/\D/g,""),t=i.split("");for(var r=t.length-1,d=3,p=2;r>p;)t.splice(r-p,0,n),p+=d;for(var s=0;s<=t.length-1;s++)e+=t[s];return e};return this.each(function(){o(this)})};