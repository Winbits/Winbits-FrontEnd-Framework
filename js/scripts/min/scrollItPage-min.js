jQuery.fn.scrollItPage=function(t){var s=$.extend({nav:"nav",toggleClass:"fixedClass",sections:".mainHome-main",selectedLink:"current",topMargin:60,offset:130,allBody:"html, body",intervalo:1e3,currentClass:"current"},t),a,o,e=!0,n=!1,l=[],i=[{item:"lastNav",back:"clickRightNav"},{item:"firstNav",back:"clickLeftNav"}],r=function(t){var l=s.topMargin;n=!0,$(t).data("topmargin")&&(l=$(t).data("topmargin"));var i=$(t.hash),r=i.offset().top-l;e===!0&&(r=i.offset().top-2*l,e=!1),i.length&&(a.removeClass(s.currentClass),o.find(".downNav").attr("class","downNav"),$(s.allBody).animate({scrollTop:r},s.intervalo,"swing",function(){n=!1,$(t).addClass(s.currentClass),c($(t).parent()),o.hasClass(s.toggleClass)||o.addClass(s.toggleClass)}))},f=function(t){$(t).each(function(){var t=$(this.hash),a=t.offset(),o=s.offset,e=$(document).height();$(t).next().length&&(e=t.next().offset().top-o-1),l.push({item:this.hash,offsetTop:a.top-o,offsetBottom:e})})},c=function(t){for(var s=0;s<i.length;s++)$(t).attr("class")===i[s].item&&o.find(".downNav").addClass(i[s].back)},d=function(){for(var t=$(window).scrollTop(),e=0;e<l.length;e++)t>=l[e].offsetTop&&t<=l[e].offsetBottom&&(a.removeClass(s.currentClass),a.eq(e).addClass(s.currentClass),o.find(".downNav").attr("class","downNav"),c(a.eq(e).parent()),o.hasClass(s.toggleClass)||o.addClass(s.toggleClass));t<l[0].offsetTop&&o.hasClass(s.toggleClass)&&o.removeClass(s.toggleClass)};return this.each(function(){o=$(this),a=$(this).find(s.nav).find("a"),a.on({click:function(t){t.preventDefault(),r(this)}}),f(a),$(s.allBody).scrollTop(0),$(window).scroll(function(){n===!1&&d()})})};