// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SHOWDIV: Slide Up y Down divs
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.showDiv = function(options){
		var defaults = $.extend({
			trigger: 'span',
			claseActivo: 'active',
			openFirst: true
		}, options),
		openDiv = function(obj){
			$(obj).addClass(defaults.claseActivo).siblings().removeClass(defaults.claseActivo);
			$('.'+$(obj).data('show')).slideDown();
			$('.'+$(obj).data('hide')).slideUp();
		};
		return this.each(function(){
			$(this).find(defaults.trigger).each(function(i){
				if(i === 0 && defaults.openFirst){
					openDiv(this);
				}
				$(this).click(function(){
					openDiv(this);
				});
			});
		});
	};