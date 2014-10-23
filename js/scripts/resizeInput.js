// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      RESIZEINPUT: Redimensionar automáticamente en la escritura el input
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.resizeInput = function(){
		var resizingInput = function(obj){
			$(obj).attr('size', $(obj).val().length);
		},
		onKeyUp = function(obj){
			$(obj).keyup(function(){
				resizingInput(this);
			}).each(function(){
				resizingInput(this);
			});
		};
		return this.each(function(){
			onKeyUp(this);
		});
	};