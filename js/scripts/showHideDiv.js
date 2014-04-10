// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SHOWHIDEDIV: Abrir el DIV superior del encabezado
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.showHideDiv = function (){
		return this.each(function(){
			$(this).on('click', function(){
				if($(this).data('claseactivo')){
					if($(this).data('showdiv')){
						$($(this).data('showdiv')).addClass($(this).data('claseactivo'));
					}
					$($(this).data('hidediv')).removeClass($(this).data('claseactivo'));
				} else {
					if ($(this).data('showdiv')){
						$($(this).data('showdiv')).slideDown();
					}
					$($(this).data('hidediv')).slideUp($);
				}
			});
		});
	};