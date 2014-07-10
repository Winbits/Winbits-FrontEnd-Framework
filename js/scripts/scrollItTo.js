// +++++++++++++++++++++++++++++++++++
//      SCROLLTO: Scroll al objeto
// ++++++++++++++++++++++++++++++++++++

	jQuery.fn.scrollItTo = function(options){
		var defaults = $.extend({
			currentClass: 'current',
			tags: 'html, body',
			marginTop: 60,
			intervalo: 500,
			range: 50,
			anchor: 'a',

		}, options),
		clickItem = function(obj){
			$(obj).click(function(e){
				var top = defaults.marginTop;
				if($(obj).data('margintop')){
					top = $(this).data('margintop');
				}
				e.preventDefault();
				var id = $(this.hash);
				if(id.length){
					$(defaults.tags).animate({
						scrollTop: id.offset().top - top
					}, defaults.intervalo);
					$(this).parent().addClass(defaults.currentClass)
					.siblings().removeClass(defaults.currentClass);
				}
			});
		},
		windowScroll = function(obj){
			var id = $(obj.hash),
				top = defaults.marginTop;
			if($(obj).data('margintop')){
				top = $(this).data('margintop');
			}
			var scrollTop = id.offset().top - top,
				minVal = scrollTop - defaults.range,
				maxVal = scrollTop + defaults.range,
				minMenuVal = parseInt($(obj).parent().parent().parent().offset().top, 10);
			$(window).scroll( function() {
				var scrollVal = parseInt($(document).scrollTop(), 10);
				if((scrollVal >= minVal) && (scrollVal <= maxVal)){
					$(obj).parent().addClass(defaults.currentClass)
					.siblings().removeClass(defaults.currentClass);
				}
				if(scrollVal <= (minMenuVal - defaults.range)) {
					$(obj).parent().removeClass(defaults.currentClass)
					.siblings().removeClass(defaults.currentClass);
				}
			});
		},
		clickAnchor = function(obj){
			$(obj).click(function(e){
				e.preventDefault();
				var id = $(this.hash),
					top = defaults.marginTop;
				if($(obj).data('margintop')){
					top = $(this).data('margintop');
				}
				if(id.length){
					$(defaults.tags).animate({
						scrollTop: id.offset().top - top
					}, defaults.intervalo);
					$(this).parent().addClass(defaults.currentClass)
					.siblings().removeClass(defaults.currentClass);
				}
			});
		};
		return this.each(function(){
			$(this).find(defaults.anchor).each(function(){
				clickAnchor(this);
			});
			// clickItem(this);
			// windowScroll(this);
		});
	};
	