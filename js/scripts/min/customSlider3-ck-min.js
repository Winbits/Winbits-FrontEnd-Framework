jQuery.fn.customSlider=function(a){var t=$.extend({wrapper:"slider-wrapper",holder:"slider-holder",handle:"ui-slider-handle",bit:"iconBit bit13px",amount:"slider-amount",textValue:"slider-textValue",textMin:"slider-minValue",textMax:"slider-maxValue",sliderBG:"iconFont-slideBG",maxSelection:"maxselection"},a),e,i,n,r,d,s,p,l,c,v,o=function(a){x(a),v=parseInt($(a).data(t.maxSelection)||"0"),$(a).wrap('<div class="'+t.wrapper+'"><div class="'+t.holder+'"/>'),$(a).parent().append('<div class="'+t.sliderBG+'"></div><a href="#" class="'+t.handle+'"><div class="'+t.bit+'"><span class="iconBG"/><span class="iconFont-bit"/></div><span class="'+t.amount+'">$<em>'+$(a).val()+"</em></span></a>"),$(a).parent().parent().append('<span class="'+t.textValue+" "+t.textMin+'">'+$(a).data("min")+'</span><span class="'+t.textValue+" "+t.textMax+'">'+n+"</span>"),m(a)},x=function(a){$(a).data("moveprice")&&(i=$("."+$(a).data("priceitem")),e=parseInt($(a).data("price"),10),i.text(e),n=$(a).data("max")>e?e:$(a).data("max")),$(a).data("realprice")&&(r=$("."+$(a).data("realpriceitem")),d=parseInt($(a).data("realprice"),10),r.text(u(d))),$(a).data("percent")&&$(a).data("realprice")&&(p=$("."+$(a).data("percent")),s=100-parseInt(100*e/d,10),p.text(s)),$(a).data("save")&&$("."+$(a).data("saveitem")).text(u($(a).data("save"))),$(a).data("price")&&$("."+$(a).data("priceitem")).text(u($(a).data("price"))),$(a).data("shipping")&&$("."+$(a).data("shippingitem")).text(u($(a).data("shipping"))),$(a).data("totalprice")&&(c=$("."+$(a).data("totalpriceitem")),l=$(a).data("shipping")?parseInt($(a).data("price"),10)+parseInt($(a).data("shipping"),10):$(a).data("price"),c.text(u(l)))},m=function(a){$(a).parent().parent().find("."+t.holder).slider({range:"min",value:+$(a).val(),min:+$(a).data("min"),max:+n,slide:function(i,n){var r=$(a).val();return n.value>v?(r!=v&&($(this).slider("value",v),$(a).val(v),$(a).parent().find("."+t.amount+" em").text(+v),c.text(u(l-v)),$("."+$(a).data("saveitem")).text(u($(a).data("save")+v))),!1):($(a).val(n.value),$(a).parent().find("."+t.amount+" em").text(+n.value),$(a).data("moveprice")&&c.text(u(l-n.value)),$(a).data("percent")&&$(a).data("realprice")&&(s=100-parseInt(100*(e-n.value)/d,10),p.text(s)),void($(a).data("save")&&$("."+$(a).data("saveitem")).text(u($(a).data("save")+n.value))))},step:$(a).data("step")})},u=function(a){var t=[],e="",i=a.toString(),n=",";i=i.replace(/\D/g,""),t=i.split("");for(var r=t.length-1,d=3,s=2;r>s;)t.splice(r-s,0,n),s+=d;for(var p=0;p<=t.length-1;p++)e+=t[p];return e};return this.each(function(){o(this)})};