jQuery.fn.moveGradient=function(o){var r=$.extend({colorInit1:{r:255,g:70,b:75},colorInit2:{r:255,g:60,b:165},colorLeft1:{r:86,g:167,b:237},colorLeft2:{r:59,g:241,b:252},colorRight1:{r:88,g:235,b:120},colorRight2:{r:205,g:249,b:60},maximumDegrees:45,increaseSensibility:4},o),t,e,c,i,n,l,g=0,a=function(){$("html").css({backgroundImage:"linear-gradient(rgb("+t+", "+e+", "+c+"), rgb("+i+", "+n+", "+l+"))"})},f=function(o,r,t,e){var c=$(document).width()/2,i=0,n=0,l=0;return c>o?(i=u(r,t),n=o/c*100,l=parseInt(i*n/100,10),o>g&&(n=o/c*100/1,l=parseInt(i*n/100,10)/1),t>r?t-l:t+l):(i=u(r,e),n=o/c*100-100,l=parseInt(i*n/100,10),o>g&&(n=o/c*100/1-100,l=parseInt(i*n/100,10)/1),e>r?r+l:r-l)},b=function(o,t,e,c){var i=0,n=0,l=0;if(o>0)return i=u(t,e),n=o/r.maximumDegrees*100,l=parseInt(i*n/100,10),e>t?t-l:t+l;var g=Math.abs(o);return i=u(t,c),n=g/r.maximumDegrees*100-100,l=parseInt(i*n/100,10),c>t?t+l:t-l},u=function(o,r){return o>r?o-r:r-o},h=function(o,u){u?(g=u*r.increaseSensibility,t=b(g,r.colorInit1.r,r.colorLeft1.r,r.colorRight1.r),e=b(g,r.colorInit1.g,r.colorLeft1.g,r.colorRight1.g),c=b(g,r.colorInit1.b,r.colorLeft1.b,r.colorRight1.b),i=b(g,r.colorInit2.r,r.colorLeft2.r,r.colorRight2.r),n=b(g,r.colorInit2.g,r.colorLeft2.g,r.colorRight2.g),l=b(g,r.colorInit2.b,r.colorLeft2.b,r.colorRight2.b)):(g=o.pageX,t=f(g,r.colorInit1.r,r.colorLeft1.r,r.colorRight1.r),e=f(g,r.colorInit1.g,r.colorLeft1.g,r.colorRight1.g),c=f(g,r.colorInit1.b,r.colorLeft1.b,r.colorRight1.b),i=f(g,r.colorInit2.r,r.colorLeft2.r,r.colorRight2.r),n=f(g,r.colorInit2.g,r.colorLeft2.g,r.colorRight2.g),l=f(g,r.colorInit2.b,r.colorLeft2.b,r.colorRight2.b)),a()};return this.each(function(){if(t=r.colorLeft1.r,e=r.colorLeft1.g,c=r.colorLeft1.b,i=r.colorLeft2.r,n=r.colorLeft2.g,l=r.colorLeft2.b,a(),$(document).mousemove(h),window.DeviceMotionEvent){var o=null!==navigator.userAgent.match(/iPad/i);o&&window.addEventListener("deviceorientation",function(o){h("",Math.round(o.beta))},!0)}})};