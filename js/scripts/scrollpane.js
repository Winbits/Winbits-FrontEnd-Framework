// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SCROLLPANE: Scroll que aparece / desaparece
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.scrollpane = function (options) {
		var defaults = $.extend({
			parent: '.scrollpane',
			horizontalDragMinWidth: 40,
			horizontalDragMaxWidth: 40,
			reinitialize: false,
			delay: 500
		}, options),
		initializeScrollPane = function(obj){
			var $this = $(obj),
				$minHeight = parseInt($this.css('minHeight'), 10),
				$height = parseInt($this.css('height'), 10),
				$maxHeight = parseInt($this.css('maxHeight'), 10);
			if($maxHeight > $height){
				$(obj).css('height', ($height+10)+'px');
			}
			$(obj).jScrollPane({
				horizontalDragMinWidth: defaults.horizontalDragMinWidth,
				horizontalDragMaxWidth: defaults.horizontalDragMaxWidth,
				autoReinitialise: defaults.reinitialize,
				autoReinitialiseDelay: defaults.delay
			});
		};
		return this.each(function(){
			if(defaults.parent) {
				if($(defaults.parent).css('display') === 'none') {
					$(defaults.parent).css('display', 'block');
					initializeScrollPane(this);
				$(defaults.parent).css('display', 'none');
				} else {
					initializeScrollPane(this);
				}
			}
		});
	};