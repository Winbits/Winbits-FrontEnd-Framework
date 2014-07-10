// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SHOWBITS: Incrementa número de winbits ganados en x segundos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.showBit = function(options){
		var defaults = $.extend(
		{
			minValue: 200000,
			maxValue: 2000000,
			maxDefaultValue: 19867650,
			minDefaultValue: 1986760,
			minInterval: 1000,
			maxInterval: 10000,
			simb: ',',
		}, options),
		myDate = new Date(),
		milliseconds = myDate.getTime(),
		string = milliseconds.toString(),
		slice = string.slice(1, 4) + string.slice(7, 10),
		stamp,
		getNumber = function(obj){
			stamp = parseInt(slice, 10);
			$(obj).text(putCommas(stamp));
			increaseNumb(obj);
		},
		putCommas = function(numero){
			var nums = [],
				res = "",
				value = numero.toString();
			value = value.replace(/\D/g, ""); // Expresión regular que permite ingresar sólo números
			nums = value.split("");
			var long = nums.length -1,
				patron = 3, // Cada cuando se pone la coma
				prox = 2; // En qué lugar se inserta la siguiente coma
			while (long > prox){
				nums.splice((long - prox), 0, defaults.simb); // Se agrega la coma
				prox += patron;
			}
			for (var i=0; i<=nums.length-1; i++){
				res += nums[i];
			}
			return res;
		},
		increaseNumb = function(obj){
			var intervalo = Math.floor(Math.random() * (defaults.maxInterval - defaults.minInterval + 1)) + defaults.minInterval,
				increase = Math.floor(Math.random() * (10 -1 + 1)) + 10;
			setInterval(function(){
				var incremento = parseInt(stamp, 10) + increase;
				$({someValue: stamp}).animate({
					someValue: incremento
				}, {
					duration: 200,
					easing: 'swing',
					step: function(){
						stamp = Math.round(this.someValue);
						$(obj).text(putCommas(stamp));
					}
				});
			}, intervalo);
		};
		return this.each(function(){
			getNumber(this);
		});
	};