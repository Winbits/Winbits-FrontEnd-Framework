jQuery.fn.changeBox=function(i){var t=$.extend({activo:"selected",items:"div",inputRadio:'input[type="radio"]'},i),n=function(i){$(i).on("click",t.items,function(){e(i),$(i).find(t.items).removeClass(t.activo),$(this).addClass(t.activo),$(this).find(t.inputRadio).attr("checked",!0)})},e=function(i){$(i).find(t.items).find(t.inputRadio).attr("checked",!1)};return this.each(function(){n(this)})};