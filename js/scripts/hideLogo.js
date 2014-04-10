// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      HIDELOGO: Muestra / oculta el logo con el scroll
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.hideLogo = function(){
		return this.each(function(){
			var $obj = $(this),
				offset = $obj.offset();
			$(window).scroll(function() {
				if ($(window).scrollTop() > offset.top) {
					$obj.slideUp();
				} else {
					$obj.slideDown();
				}
			});
		});
	};