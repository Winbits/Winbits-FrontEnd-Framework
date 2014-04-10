(function(){
	var loadFiles = function (path) {
		var escribe = '<script src="' + path + 'idangerous.swiper-2.4.3.js"><\/script>\n';
		escribe += '<script src="' + path + 'idangerous.swiper.scrollbar-2.0.js"><\/script>\n';
		document.write(escribe);
	};
	loadFiles("winbitsInclude/include/js/libs/swiper/");
})();