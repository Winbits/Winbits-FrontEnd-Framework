// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SCROLLPANE: Scroll que aparece / desaparece
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.scrollpane = function (options) {
		var defaults= $.extend({
			parent: '.scrollpane',
			horizontalDragMinWidth: 40,
			horizontalDragMaxWidth: 40,
			reinitialize: false,
			delay: 500
		}, options),
		initializeScrollPane = function(obj){
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