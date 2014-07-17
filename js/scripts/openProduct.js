// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//		OPENPRODUCT: Mueve el div del detalle del producto a ser hermano del padre del item que se de click
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.openProduct = function(options){
		var defaults = $.extend({
			parents: '.catalog-list',
			productDetail: '.productDetail',
			arrow: '.productDetail-arrow',
			closeBtn: '.close',
			currentClass: 'itemCurrent',
			currentClassParent: 'item-current',
			marginSlide: 0,
			attrSlide: 'left',
			timeSlide: 500,
			scrollTopMargin: 0
		}, options),
		removeClass = function(obj){
			$(objects).removeClass(defaults.currentClass).parent().removeClass(defaults.currentClassParent);
			$(obj).addClass(defaults.currentClass).parent().addClass(defaults.currentClassParent);
		},
		slideProduct = function(obj){
			$(defaults.productDetail).slideUp(defaults.timeSlide, function(){
				$(defaults.productDetail).appendTo($(obj).closest(defaults.parents)).slideDown(defaults.timeSlide, function(){
					$(defaults.productDetail).find(defaults.arrow).css(defaults.attrSlide, $(obj).offset().left - defaults.marginSlide);
				});
			});
			slideBody();
		},
		slideBody = function(){
			$('html, body').animate({
				scrollTop: $(defaults.productDetail).offset().top - defaults.scrollTopMargin
			}, defaults.timeSlide);
		},
		closeBtn = function(obj){
			$(defaults.productDetail).find(defaults.closeBtn).click(function(){
				$(defaults.productDetail).slideUp();
				removeClass(obj);
			});
		},
		clickingProduct = function(obj){
			$(obj).click(function(e){
				e.preventDefault();
				slideProduct(this);
				removeClass(this);
			});
		};
		var objects = this;
		return this.each(function(){
			$(defaults.productDetail).hide();
			clickingProduct(this);
			closeBtn(this);
		});
	};