jQuery.fn.customSlider=function(a){var t=$.extend({wrapper:"slider-wrapper",holder:"slider-holder",handle:"ui-slider-handle",bit:"iconBit bit13px",amount:"slider-amount",textValue:"slider-textValue",textMin:"slider-minValue",textMax:"slider-maxValue"},a),e,i,n,r,p,s,d,l,c,o=function(a){u(a),$(a).wrap('<div class="'+t.wrapper+'"><div class="'+t.holder+'"/>'),$(a).parent().append('<a href="#" class="'+t.handle+'"><div class="'+t.bit+'"><span class="iconBG"/><span class="iconFont-bit"/></div><span class="'+t.amount+'">$<em>'+$(a).val()+"</em></span></a>"),$(a).parent().parent().append('<span class="'+t.textValue+" "+t.textMin+'">'+$(a).data("min")+'</span><span class="'+t.textValue+" "+t.textMax+'">'+n+"</span>"),m(a)},u=function(a){$(a).data("moveprice")&&(i=$("."+$(a).data("priceitem")),e=parseInt($(a).data("price"),10),i.text(e),n=$(a).data("max")>e?e:$(a).data("max")),$(a).data("realprice")&&(r=$("."+$(a).data("realpriceitem")),p=parseInt($(a).data("realprice"),10),r.text(x(p))),$(a).data("percent")&&$(a).data("realprice")&&(d=$("."+$(a).data("percent")),s=100-parseInt(100*e/p,10),d.text(s)),$(a).data("save")&&$("."+$(a).data("saveitem")).text(x($(a).data("save"))),$(a).data("price")&&$("."+$(a).data("priceitem")).text(x($(a).data("price"))),$(a).data("shipping")&&$("."+$(a).data("shippingitem")).text(x($(a).data("shipping"))),$(a).data("totalprice")&&(c=$("."+$(a).data("totalpriceitem")),l=$(a).data("shipping")?parseInt($(a).data("price"),10)+parseInt($(a).data("shipping"),10):$(a).data("price"),c.text(x(l)))},m=function(a){$(a).parent().parent().find("."+t.holder).slider({range:"min",value:+$(a).val(),min:+$(a).data("min"),max:+n,slide:function(t,e){$(a).val(e.value);var i,n,r,p=$(a);return i=parseInt(p.data("max-selection")||"0"),r=Math.min(i,e.value),n=p.val(),p.val(r),p.parent().find(".slider-amount em").text(r),e.value>i?(n!==i&&$(this).slider("value",i),!1):void 0},step:$(a).data("step")})},x=function(a){var t=[],e="",i=a.toString(),n=",";i=i.replace(/\D/g,""),t=i.split("");for(var r=t.length-1,p=3,s=2;r>s;)t.splice(r-s,0,n),s+=p;for(var d=0;d<=t.length-1;d++)e+=t[d];return e};return this.each(function(){o(this)})};