// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CLOSEVIDEOHOME: Abre / Cierra div con el video y lo reinicia
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.closeVideoHome = function(options){
		var defaults = $.extend({
			videoOverlay : '.video-overlay',
			closeBtn: '.iconFont-close',
			video: '.video-frame',
			father: '.knowMoreMax',
			videoClass: 'video-toggle'
		}, options), src,
		clickingTrigger = function(obj, show){
			$(obj).click(function(){
				$(defaults.father).find(defaults.videoOverlay).toggleClass(defaults.videoClass);
				$(defaults.video).attr('src', show);
			});
		};
		return this.each(function(){
			src = $(defaults.video).attr('src');
			$(defaults.video).attr('src', '');
			clickingTrigger(this, src);
			clickingTrigger($(defaults.father).find(defaults.videoOverlay).find(defaults.closeBtn), '');
		});
	};