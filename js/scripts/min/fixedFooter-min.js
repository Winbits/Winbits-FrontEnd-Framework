jQuery.fn.fixedFooter=function(e){var i=$.extend({clase:"footer-fixed",minHeigth:500},e),n=function(e){var n="html";$(".msie8, .msie7, .msie6").length&&(n="body"),$(n).height()<$(window).height()?$(e).addClass(i.clase):$(e).removeClass(i.clase)};return this.each(function(){var e=this;n(e),$(window).resize(function(){n(e)})})};