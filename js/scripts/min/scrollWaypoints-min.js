jQuery.fn.scrollWaypoints=function(s){var t=$.extend({nav:"nav",toggleClass:"fixedClass",sections:".mainHome-main",selectedLink:"current",topMargin:60,offset:130,allBody:"html, body",intervalo:1e3,currentClass:"current"},s),a,o,n=!0,e=!1,l=[],i=[{item:"lastNav",back:"clickRightNav"},{item:"firstNav",back:"clickLeftNav"}],r=function(s){var l=t.topMargin;e=!0,$(s).data("topmargin")&&(l=$(s).data("topmargin"));var i=$(s.hash),r=i.offset().top-l;n===!0&&(r=i.offset().top-2*l,n=!1),i.length&&(a.removeClass(t.currentClass),o.find(".downNav").attr("class","downNav"),$(t.allBody).animate({scrollTop:r},t.intervalo,"swing",function(){e=!1,$(s).addClass(t.currentClass),c($(s).parent()),o.hasClass(t.toggleClass)||o.addClass(t.toggleClass)}))},f=function(s){$(s).each(function(){var s=$(this.hash),a=s.offset(),o=t.offset,n=$(document).height();$(s).next().length&&(n=s.next().offset().top-o-1),l.push({item:this.hash,offsetTop:a.top-o,offsetBottom:n})})},c=function(s){for(var t=0;t<i.length;t++)$(s).attr("class")===i[t].item&&o.find(".downNav").addClass(i[t].back)},d=function(){for(var s=$(window).scrollTop(),n=0;n<l.length;n++)s>=l[n].offsetTop&&s<=l[n].offsetBottom&&(a.removeClass(t.currentClass),a.eq(n).addClass(t.currentClass),o.find(".downNav").attr("class","downNav"),c(a.eq(n).parent()),o.hasClass(t.toggleClass)||o.addClass(t.toggleClass));s<l[0].offsetTop&&o.hasClass(t.toggleClass)&&o.removeClass(t.toggleClass)};return this.each(function(){o=$(this),a=$(this).find(t.nav).find("a"),a.on({click:function(s){s.preventDefault(),r(this)}}),f(a),$(t.allBody).scrollTop(0),$(window).scroll(function(){e===!1&&d()})})};