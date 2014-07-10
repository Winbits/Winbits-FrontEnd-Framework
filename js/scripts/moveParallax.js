jQuery.fn.moveParallax = function(options){
	var defaults = $.extend({
		velX: 0.001,
		velY: 0.001,
		offsetX: 1,
		offsetY: 1
	}, options);
	return this.each(function(){
		var defaultX = parseInt($(this).css('marginTop'), 10),
			defaultY = parseInt($(this).css('marginLeft'), 10),
			$this = $(this);
		defaults.velX = Math.random() * (0.2 - (-0.2)) + (-0.2);
		defaults.velY = Math.random() * (0.2 - (-0.2)) - (-0.2);
		defaults.offsetX = Math.random() * (0.5 - (-0.5)) + (-0.5);
		defaults.offsetY = Math.random() * (0.5 - (-0.5)) - (-0.5);
		$(this).parent().on({
			mousemove: function(e){
				var cursorX = e.pageX,
					cursorY = e.pageY,
					newX = (cursorX * defaults.velX) + defaultX + defaults.offsetX,
					newY = (cursorY * defaults.velY) + defaultY + defaults.offsetY;
				$this.css({
					marginLeft: newY,
					marginTop: newX
				});
			}
		});
	});
};