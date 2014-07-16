// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//		RESIZEFILTER: Agrega botón par ver más items y sólo muestra 5 por default
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.resizeFilter = function(options){
		var defaults = $.extend({
			items: '.checkbox-wrapper',
			contador: 5,
			filterMoreContainer: 'clickoneroFilter-more',
			filterIcon: 'clickoneroFilter-icon',
			filterMoreIcon: 'iconFont-down',
			filterLessIcon: 'iconFont-up',
			filterMoreText: 'más ',
			filterLessText: 'menos ',
			filterClass: 'clickoneroFilter-txt',
			filterHide: 'clickoneroFilter-hide'
		}, options), toggleTxt = true,
		countItems = function(obj){
			var $lengthItems = $(obj).find(defaults.items);
			if($lengthItems.length > defaults.contador) {
				$(obj).append('<div class="' + defaults.filterMoreContainer + '"><span class="'+ defaults.filterClass + '">' + defaults.filterMoreText + '</span><span class="' + defaults.filterIcon + ' ' +defaults.filterMoreIcon + '"></span></div>');
				addClass(obj);
				clickFilterMore(obj);
			}
		},
		addClass = function(obj){
			$(obj).find(defaults.items).each(function(i){
				if(i >= defaults.contador){
					$(this).toggleClass(defaults.filterHide);
				}
			});
		},
		clickFilterMore = function(obj){
			$(obj).find('.' + defaults.filterMoreContainer).click(function(e){
				e.preventDefault();
				toggleText(obj);
				addClass(obj);
			});
		},
		toggleText = function(obj){
			if (toggleTxt){
				$(obj).find('.' + defaults.filterIcon).
						removeClass(defaults.filterMoreIcon).
						addClass(defaults.filterLessIcon);
				$(obj).find('.' + defaults.filterClass).text(defaults.filterLessText);
				toggleTxt = false;
			} else {
				$(obj).find('.' + defaults.filterIcon).
						removeClass(defaults.filterLessIcon).
						addClass(defaults.filterMoreIcon);
				$(obj).find('.' + defaults.filterClass).text(defaults.filterMoreText);
				toggleTxt = true;
			}
		};
		return this.each(function(){
			countItems(this);
		});
	};