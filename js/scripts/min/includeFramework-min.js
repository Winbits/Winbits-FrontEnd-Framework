var defaultsFramework={modernizr:"modernizr-2.6.2.js",jquerybrowser:"jquery.browser.min.js",jqueryui:"jQueryUI1.9.2/jquery-ui-1.9.2.js"},defautPath="http://www.dream-it.com.mx/WinbitsFramework/js/libs/",fileExist=function(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(),404!=t.status},includeFile=function(e,t,r){var i=function(){var i="";r?(i=document.createElement("link"),i.href=t+e,i.rel="stylesheet"):(i=document.createElement("script"),i.type="text/javascript",i.src=t+e),document.getElementsByTagName("head")[0].appendChild(i)};window.addEventListener?window.addEventListener("load",i,!1):window.attachEvent?window.attachEvent("onload",i):window.onload=i},loadLibs=function(){for(var e in defaultsFramework)includeFile(defaultsFramework[e],defautPath)};jQuery.fn.includeFramework=function(e){var t=$.extend({cssLibs:{cssFontIcon:!0,cssForms:!1,cssProduct:!1},cssPathProd:"http://www.dream-it.com.mx/WinbitsFramework/js/",cssPathQA:"https://raw.githubusercontent.com/Winbits/Winbits-FrontEnd-Framework/master",cssQA:!1,scriptsLibs:{acordeon:!1,acordeon2:!1,acordeonFilter:!1,altoCarrito:!1,buyers:!1,carouselSwiper:!1,carruselVerticalSwiper:!1,changeBox:!1,changeOffer:!1,changeQuestion:!1,chooseDate:!1,closeVideoHome:!1,coverMenu:!1,createGift:!1,customCheckbox:!1,customRadio:!1,customSelect:!1,customSlider:!1,customSlider2:!1,customSlider3:!1,datePicker:!1,dropMainMenu:!1,fancyBox:!1,fixedFooter:!1,fixedMenu:!1,gradient:!1,hideLogo:!1,imageError:!1,imageProduct:!1,mailingMenuCheckboxs:!1,makeCookie:!1,maskImg:!1,moveGradient:!1,moveParallax:!1,openFolderWidget:!1,openProduct:!1,placeholder:!1,point:!1,preloader:!1,requiredField:!1,resizeFilter:!1,scrollItPage:!1,scrollpane:!1,scrollWaypoints:!1,setCalendar:!1,showBannerCookie:!1,showBit:!1,showDiv:!1,showHideDiv:!1,tabs:!1,tooltip:!1},scriptsPathProd:"http://www.dream-it.com.mx/WinbitsFramework/js/scripts/min/",scriptsPathQA:"https://raw.githubusercontent.com/Winbits/Winbits-FrontEnd-Framework/master/js/scripts/min/",scriptsQA:!0,scriptsSufix:"-min.js"},e),r=[],i=function(){for(var e=0;e<r.length;e++)t.scriptsQA?includeFile(r[e]+t.scriptsSufix,t.scriptsPathQA):includeFile(r[e]+t.scriptsSufix,t.scriptsPathProd)};for(var s in t.scriptsLibs)r.push(s);i()};