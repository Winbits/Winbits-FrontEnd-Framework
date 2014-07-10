// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      GRADIENT: Gradiente aleatorio en movimiento del mouse
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.fixedMenu = function(options){
		var defaults = $.extend({
			fixedClass: 'fixedClass',
            offsetTop: 550
		}, options);
        return this.each(function(){
            var $obj = $(this);
            $(window).scroll(function() {
                if ($(window).scrollTop() > 550) {
                    $obj.addClass(defaults.fixedClass);
                } else {
                    $obj.removeClass(defaults.fixedClass);
                }
            });
        });
    };