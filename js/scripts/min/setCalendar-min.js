jQuery.fn.setCalendar=function(e){var a=$.extend({answers:[[]],answerWithClass:"givePoints",answerWithoutClass:"notGivePoints",onSelect:!1,minDate:"",maxDate:""},e),t=function(e){$(e).datepicker({inline:!0,beforeShowDay:r,onSelect:a.onSelect,minDate:a.minDate,maxDate:a.maxDate})},r=function(e){for(var t=!0,r="",n=$.datepicker.formatDate("dd-mm-yy",e),s=0;s<a.answers.length;s++)a.answers[s][0]===n&&(t=!1,1===a.answers[s][1]?r=a.answerWithClass:0===a.answers[s][1]&&(r=a.answerWithoutClass));return[t,r]};return $.datepicker.regional.es={closeText:"Cerrar",prevText:"&#x3c;Ant",nextText:"Sig&#x3e;",currentText:"Hoy",monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthNamesShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],dayNames:["Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado"],dayNamesShort:["Dom","Lun","Mar","Mi&eacute;","Juv","Vie","S&aacute;b"],dayNamesMin:["D","L","M","M","J","V","S"],weekHeader:"Sm",dateFormat:"yy-mm-dd",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},$.datepicker.setDefaults($.datepicker.regional.es),this.each(function(){t(this)})};