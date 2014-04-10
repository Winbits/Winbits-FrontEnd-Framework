// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      OPENFOLDER: Abrir el DIV superior del encabezado
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.openFolderWidget = function(options){
		var defaults = $.extend({
			evento: 'click',
			trigger: '#winbits-widget .openClose',
			clase: 'downBar'
		}, options),
		openFolder = function(obj){
			if($(obj).hasClass(defaults.clase)) {
				$(obj).removeClass(defaults.clase);
			} else {
				$(obj).addClass(defaults.clase);
			}
		};
		return this.each(function(){
			var obj = this;
			$(document).on(defaults.evento, defaults.trigger, function(){
				openFolder(obj);
			});
		});
	};