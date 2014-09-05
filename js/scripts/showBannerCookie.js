// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SHOWBANNERCOOKIE: Slide Up y Down banner superior con cookie
// 		Dependencias: makeCookie.js
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.showBannerCookie = function(options){
		var defaults = $.extend({
			triggerSpan: 'span',
			triggerIcon: '.promoIcon'
		}, options),
		banner, show, showclass, hide, hideclass,
		slideBanner = function(obj){
			asignaValues(obj);
			var cookie = makeCookie.readCookie(obj.className);
			if(cookie){
				$(obj).find(defaults.triggerSpan).html(show);
				$(obj).find(defaults.triggerIcon).removeClass(hideclass).addClass(showclass);
				$(banner).hide();
			}
			$(obj).click(function(){
				if($(banner).css('display') === 'none'){
					$(this).find(defaults.triggerSpan).html(hide);
					$(this).find(defaults.triggerIcon).removeClass(showclass).addClass(hideclass);
					makeCookie.eraseCookie(obj.className);
				} else {
					$(this).find(defaults.triggerIcon).html(show);
					$(this).find(defaults.triggerIcon).removeClass(hideclass).addClass(showclass);
					makeCookie.createCookie(obj.className, true, 14);
				}
				$(banner).slideToggle();
			});
		},
		asignaValues = function(obj){
			banner = '.'+$(obj).data('banner');
			show = $(obj).data('show');
			showclass = $(obj).data('showclass');
			hide = $(obj).data('hide');
			hideclass = $(obj).data('hideclass');
		};
		return this.each(function(){
			slideBanner(this);
		});
	};

