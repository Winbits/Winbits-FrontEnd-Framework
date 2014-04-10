// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SCROLLPANE: Scroll que aparece / desaparece
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.scrollpane = function (options) {
		var defaults= $.extend({
			parent: '.scrollpane',
			horizontalDragMinWidth: 40,
			horizontalDragMaxWidth: 40
		}, options);
		return this.each(function(){
			if(defaults.parent) {
				if($(defaults.parent).css('display') === 'none') {
					$(defaults.parent).css('display', 'block');
					$(this).jScrollPane({
						horizontalDragMinWidth: defaults.horizontalDragMinWidth,
						horizontalDragMaxWidth: defaults.horizontalDragMaxWidth
					});
				$(defaults.parent).css('display', 'none');
				} else {
					$(this).jScrollPane({
						horizontalDragMinWidth: defaults.horizontalDragMinWidth,
						horizontalDragMaxWidth: defaults.horizontalDragMaxWidth
					});
				}
			}
		});
	};