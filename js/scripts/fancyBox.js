// ++++++++++++++++++++++++++++++++++++++
//      FANCYBOX: Modales con FancyBox
// ++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.fancyBox = function(options){
		var defaults = $.extend({
			afterShow: false
		}, options),
		optionsFancybox = {},
		defaultFancybox = function(obj){
			optionsFancybox = {
				padding: 0,
				margin: 0,
				width: $(obj).data('fancyboxwidth'),
				type: 'ajax',
				afterShow: defaults.afterShow
			};
		},
		hrefFancybox = function(obj) {
			optionsFancybox = {
				padding: 0,
				margin: 0,
				width: $(obj).data('fancyboxwidth'),
				href: $(obj).data('fancyboxhref'),
				iframe: {
					scrolling: 'auto',
					preload: true
				},
				type: 'iframe',
				afterShow: defaults.afterShow
			};
		},
		noCloseFancybox = function(obj){
			optionsFancybox = {
				padding: 0,
				margin: 0,
				closeBtn: false,
				width: $(obj).data('fancyboxwidth'),
				href: $(obj).data('fancyboxhref'),
				iframe: {
					scrolling: 'auto',
					preload: true
				},
				type: 'iframe'
			};
		};
		return this.each(function(){
			if ($(this).data('fancyboxhref')){
				hrefFancybox(this);
				$(this).fancybox(optionsFancybox);
			} else if ($(this).data('fancybox-noclosebtn')){
				noCloseFancybox(this);
				$(this).fancybox(optionsFancybox);
			} else {
				defaultFancybox(this);
				$(this).fancybox(optionsFancybox);
			}
		});
	};