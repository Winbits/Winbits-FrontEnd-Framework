jQuery.fn.buyers=function(s){var i={wrapper:".buyers-wrapper",slide:".buyers-slide",classLastChild:"lastChild",classFirstChild:"firstChild",tiempo:500},t=function(s){var t=$(s),a=t.find(i.slide),d=0;a.each(function(s){$(this).css("left",d+"px"),d+=$(this).outerWidth()+parseInt($(this).css("marginRight"),10),5===s?$(this).addClass(i.classLastChild):0===s&&$(this).addClass(i.classFirstChild)}),t.find(i.wrapper).css("width",d+"px")},a=function(s){var t=$(s),a=t.find("."+i.classLastChild),d=t.find("."+i.classFirstChild),l=t.find(i.slide),e=0;d.slideUp(i.tiempo,function(){l.each(function(s){var d=$(this);d.attr("data-index",s),d.hasClass(i.classFirstChild)?d.appendTo(t.find(i.wrapper)):(d.animate({left:e+"px"}),e+=$(this).outerWidth()+parseInt($(this).css("marginRight"),10)),a.slideDown(i.tiempo,function(){0===s?d.addClass(i.classFirstChild):5===s?d.addClass(i.classLastChild):d.removeClass(i.classFirstChild).removeClass(i.classLastChild)})})})};return this.each(function(){s&&(i=$.extend(i,s));var d=this,l=function(){a(d);var s=Math.round(11e3*Math.random())+500;setTimeout(l,s)};t(d),l()})};