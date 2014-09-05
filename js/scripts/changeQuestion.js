// +++++++++++++++++++++++++++++++++++++++++
//      CHANGEQUESTION: Cambiar encuesta
// +++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.changeQuestion = function(options){
		var defaults = $.extend({
			trigger: 'td',
			changer: '.changer'
		}, options),
		changeTarget = function(obj){
			$(obj).find(defaults.trigger).each(function(){
				var $this = $(this);
				$this.click(function(){
					$(obj).find(defaults.changer).find('p').html($this.data('title'));
					$(obj).find(defaults.changer).find('input[type="submit"]').attr('data-encuesta', $this.data('encuesta'));
				});
			});
		};
		return this.each(function(){
			changeTarget(this);
		});
	};