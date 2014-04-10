// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CHANGEOFER: Cambiar entre ofertas para hombre/mujer
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.changeOffer = function(options){
		var defaults = $.extend({
			filter: '.clickoneroFP-filter',
			itemFilter: 'li',
			itemMenu: 'li',
			currentClass: 'current'
		}, options),
		clickOption = function(obj){
			$(obj).on('click', defaults.itemFilter, function(){
				$(this).addClass(defaults.currentClass).siblings().removeClass(defaults.currentClass);
				filterItems(this);
			});
		},
		filterItems = function(obj){
			var filtrar = $(obj).data('filter'),
				item = $(defaults.filter).find(defaults.itemMenu);
			if(filtrar) {
				$(defaults.filter).animate({ opacity: 0 }, 400, function(){
					item.each(function(){
						if($(this).data('filter') === filtrar){
							$(this).show();
						} else {
							$(this).hide();
						}
					});
					$(this).animate({ opacity: 1 });
				});
			} else {
				$(defaults.filter).animate({ opacity: 0 }, 400, function(){
					item.show();
					$(this).animate({ opacity: 1 });
				});
			}
		};
		return this.each(function(){
			clickOption(this);
		});
	};