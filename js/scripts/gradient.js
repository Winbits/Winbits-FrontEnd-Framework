// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      GRADIENT: Gradiente aleatorio en movimiento del mouse
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	jQuery.fn.gradient = function(options){
		var defaults = $.extend({
			claseName: 'gradient',
			items: 10
		}, options),
		gradientClass = [],
		randomOrder = function(){
			return(Math.round(Math.random()) - 0.5);
		},
		pushClass = function(){
			for(var i=0; i<defaults.items; i++){
				gradientClass.push(defaults.claseName+[i]);
			}
		},
		removeClass = function(obj){
			for( var i=0;i<gradientClass.length; i++){
				$(obj).removeClass(defaults.claseName+[i]);
			}
		},
		changeColor = function(obj){
			$(obj).bind({
				mousemove: function(){
					gradientClass.sort(randomOrder);
					removeClass(obj);
					$(obj).addClass(gradientClass[0]);
				}
			});
		};
		pushClass();
		return this.each(function(){
			changeColor(this);
		});
	};