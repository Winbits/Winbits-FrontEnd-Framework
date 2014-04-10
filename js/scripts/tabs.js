// +++++++++++++++++++++++++++++++++++
//      TABS: Pestañas
// ++++++++++++++++++++++++++++++++++++

	jQuery.fn.tabs = function (options) {
		var defaults = $.extend({
			tabClass: 'tabClass',
			item: 'li',
			tabSelected: 'tabSelected'
		}, options);
		return this.each(function(){
			$(defaults.tabClass).hide().eq(0).show();
			$(this).find(defaults.item).click(function(e){
				e.preventDefault();
				$(defaults.tabClass).hide();
				var id = $(this).find('a').attr('href');
				$(id).fadeToggle();
				$(this).addClass(defaults.tabSelected).siblings().removeClass(defaults.tabSelected);
			});
		});
	};