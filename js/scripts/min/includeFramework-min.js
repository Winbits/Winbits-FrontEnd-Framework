var defaultsFramework={modernizr:"modernizr-2.6.2.js",jquerybrowser:"jquery.browser.min.js",jqueryui:"jQueryUI1.9.2/jquery-ui-1.9.2.js"},defautPath="http://www.dream-it.com.mx/WinbitsFramework/js/libs/",writeFile=function(t,r,e){var s='<script src="'+r,i='"></script>\n';e&&(s='<link rel="stylesheet" href="'+r,i='">\n'),document.writeln(s+t+i)},includeFile=function(t,r,e){var s=function(){var s="";e?(s=document.createElement("link"),s.href=r+t,s.rel="stylesheet"):(s=document.createElement("script"),s.type="text/javascript",s.src=r+t),document.getElementsByTagName("head")[0].appendChild(s)};window.addEventListener?window.addEventListener("load",s,!1):window.attachEvent?window.attachEvent("onload",s):window.onload=s},loadLibs=function(){for(var t in defaultsFramework)writeFile(defaultsFramework[t],defautPath)};jQuery.fn.includeFramework=function(t){var r=$.extend({cssLibs:{cssFontIcon:!0,cssForms:!1,cssProduct:!1},cssPathProd:"http://www.dream-it.com.mx/WinbitsFramework/js/",cssPathQA:"https://raw.githubusercontent.com/Winbits/Winbits-FrontEnd-Framework/master",cssQA:!1,scriptsLibs:{},scriptsPathProd:"http://www.dream-it.com.mx/WinbitsFramework/js/scripts/min/",scriptsPathQA:"https://raw.githubusercontent.com/Winbits/Winbits-FrontEnd-Framework/master/js/scripts/min/",scriptsQA:!1,scriptsSufix:"-min.js"},t),e=[],s=function(){for(var t=0;t<e.length;t++)r.scriptsQA?writeFile(e[t]+r.scriptsSufix,r.scriptsPathQA):writeFile(e[t]+r.scriptsSufix,r.scriptsPathProd)};for(var i in r.scriptsLibs)e.push(i);s()};