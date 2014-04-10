// +++++++++++++++++++++++++++++++++++++++++++++
//      POINT: Puntos en el look diario
// +++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.point = function(options){
		var defaults = $.extend({
			tooltip: 'tooltip'
		}, options);
		return this.each(function(){
			if($(this).data('top')){
				$(this).css({
					top: $(this).data('top')+'px',
					left: $(this).data('left')+'px'
				});
			}
		}).toolTip({clase: defaults.tooltip});
	};