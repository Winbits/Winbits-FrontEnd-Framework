// ++++++++++++++++++++++++++++++++++++
//		TOOLTIP: Tooltips en objetos
// ++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.toolTip = function(options){
		var defaults = {
			clase: 'tooltip'
		},
		asignaValor = function(obj){
			var $this = $(obj), valor;
			if ($this.text() !== '') {
				valor = $this.text();
			} else if($this.val()){
				valor = $this.val();
			} else if ($this.data('tooltip')){
				valor = $this.data('tooltip');
			} else if($this.attr('title')){
				valor = $this.attr('title');
			} else if($this.attr('alt')){
				valor = $this.attr('alt');
			} else {
				valor = '';
			}
			return valor;
		},
		appendHTML = function(valor, obj){
			$('body').append('<div class="'+ defaults.clase +'">' + valor + '</div>');
			$(obj).attr('title', '');
		},
		mueveTooltip = function(e){
			if ($('.msie').length){
				$('.'+defaults.clase).css({
					top: e.clientY + 5,
					left: e.clientX + 5
				});
			} else {
				$('.'+defaults.clase).css({
					top: e.pageY + 5,
					left: e.pageX + 5
				});
			}
		},
		remueveHTML = function(valor, obj){
			$('body').find('.'+defaults.clase).remove();
			$(obj).attr('title', valor);
		};
		return this.each(function(){
			if(options){
				defaults = $.extend(defaults, options);
			}
			var val = asignaValor(this);
			if (val !== ''){
				$(this).on({
					mouseenter: function(){appendHTML(val, this);},
					mousemove: mueveTooltip,
					mouseleave: function(){remueveHTML(val, this);}
				});
			}
		});
	};