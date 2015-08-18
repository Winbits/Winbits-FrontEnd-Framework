// ---------------------------------------------------------------
//  WBTabs:       Tabuladores simples
//  Dependencias:   jQuery.js (1.8.3) http://jquery.com
// ----------------------------------------------------------------

var WBTabs = function (selector, params) {
	// El objeto
	_this = this;
	//  El selector
    _this.ele = selector;
    //  Configuración default del toggleCheck
    _this.defaults = $.extend({
		tabContainer: '.tab-container',
		tabSelected: 'tab-selected',
		tabNotSelected: 'tab-not-selected',
		tabTrigger: '.tab-trigger',
		firstShow: true,
		gototabs: false,
		margintop: 106,
		tabBack: '.tab-back',
		alltabs: false,
		tabAllTabs: '.tab-all-tabs'
	}, params);
// Métodos
    // 1. Activar los tabuladores
    _this.activateTabs = function(){
    	// Verifica los data attributes
        _this.checkData();
        // Verifica si existe firstshow
        if(_this.defaults.firstShow){
        	// Si existe, oculta los demas menos el primero
			_this.showFirst();
		// Si no
		} else {
			// Oculta todos
			_this.hideAll();
		}
		// Método para ejecutar en el click
        _this.clickTrigger();
        // Método para ejecutar cuando exista el botón alltabs
        if(_this.defaults.alltabs){
        	_this.showAll();
        }

    };
     // 2. Verificar si existen data en el objeto para modificar los defaults
    _this.checkData = function(){
        $.extend(_this.defaults, $(selector).data());
    };
    //  3. Si el primero debe mostrarse, ocultar el resto y el primero dejarlo así
    _this.showFirst = function(){
    	// Sacamos el id del div que debemos mostrar del primer elemento del tabulador
    	var showOne = $(selector).find(_this.defaults.tabTrigger).first().find('a').attr('href');
    	// Agregamos la clase los hermanos del primer elemento del tabulador de no seleccionado
    	$(selector).find(_this.defaults.tabTrigger).not(':first').addClass(_this.defaults.tabNotSelected);
    	// Agregamos la clase al primer elemento del tabulador de seleccionado
    	$(selector).find(_this.defaults.tabTrigger).first().addClass(_this.defaults.tabSelected);
    	// Agregamos la clase mostrado al div del href
    	$(showOne).addClass(_this.defaults.tabSelected);
    	// Agregamos la clase a los hermanos del div mostrado de no seleccionado
    	$(selector).find(_this.defaults.tabContainer).not(showOne).addClass(_this.defaults.tabNotSelected);
	};
    //  4. Si firstShow es falso, poner clase de no seleccionado a todos
    _this.hideAll = function(){
    	// Agregar clase a los divs
    	$(selector).find(_this.defaults.tabContainer).addClass(_this.defaults.tabNotSelected);
    	// Agregar clase a los links
    	$(selector).find(_this.defaults.tabTrigger).addClass(_this.defaults.tabNotSelected);
    };
    // 5. Método que ejecuta función en el click
    _this.clickTrigger = function(){
    	// Igualar en variable para que no se pierda
    	var myparent = selector;
    	// En el click de cada trigger
    	$(myparent).find(_this.defaults.tabTrigger).click(function(e){
    		// Eliminar comportamiento default
			e.preventDefault();
			// Nombre del id a mostrar, que viene en el atributo href
			var id = $(this).find('a').attr('href');
			// Agregamos la clase no seleccionado a los hermanos del div que viene en id
			$(myparent).find(_this.defaults.tabContainer).not(id).removeClass(_this.defaults.tabSelected).addClass(_this.defaults.tabNotSelected);
			// Agregar la clase seleccionado al div que viene en id
			$(id).show().removeClass(_this.defaults.tabNotSelected).addClass(_this.defaults.tabSelected);
			// Agregar la clase seleccionado al trigger
			$(this).removeClass(_this.defaults.tabNotSelected).addClass(_this.defaults.tabSelected);
			// Agregamos la clase no seleccionado a los hermanos del div que viene en id
			$(myparent).find(_this.defaults.tabTrigger).not($(this)).removeClass(_this.defaults.tabSelected).addClass(_this.defaults.tabNotSelected);
			setTimeout(function(){
				if(_this.defaults.gototabs){
					$('html, body').animate({
						scrollTop: $(id).offset().top - _this.defaults.margintop
					}, 500);
					$(myparent).find(_this.defaults.tabBack).click(function(e) {
						e.preventDefault();
						$('html, body').animate({
							scrollTop: 0
						}, 500);
					});
				}
			}, 500);
		});
    };
    // 6. Método que ejecuta el botón alltabs
    _this.showAll = function(){
    	// Igualar en variable para que no se pierda
    	var myparent = selector;
    	$(myparent).find(_this.defaults.tabAllTabs).click(function(e){
    		e.preventDefault();
    		// Nombre del id a mostrar, que viene en el atributo href
			var id = $(this).data('firstab');
    		$(myparent).find(_this.defaults.tabContainer).removeClass(_this.defaults.tabNotSelected).addClass(_this.defaults.tabSelected);
    		$('html, body').animate({
				scrollTop: $(id).offset().top - _this.defaults.margintop
			}, 500);
    	});
    };
    _this.activateTabs();
};