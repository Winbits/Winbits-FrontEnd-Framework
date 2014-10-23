// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SHOWRECOMMENDATIONS: Flujo para abrir/cerrar/panel de Recommendations (GINGLE)
//		Dependencias: customCheckbox.js, toolTip.js, resizeInput.js
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	jQuery.fn.showRecommendations = function(options){
		var defaults = $.extend({
			recomendations: '.recomendations',
			openDivs: '.recomendations-link',
			divsContent: '.recomendations-div',
			currentClass: 'current',
			showQuestionBtn: '.showQuestionBtn',
			hideQuestionsBtn: '.hideQuestions',
			nextQuestionBtn: '.nextQuestion',
			searchRecommendationsBtn: '.searchRecommendationsBtn',
			headerChoose: '.header-choose'
		}, options),
		clickRecommendations = function(obj){
			$(obj).click(function(e) {
				e.preventDefault();
				$('body, html').animate({
				scrollTop: 0
				}, 500, function(){
					$(defaults.recomendations).slideDown();
					if($(defaults.headerChoose).length){
						$(defaults.headerChoose).slideUp();
					}
					clickMenu(defaults.recomendations);
					clickShowQuestions(defaults.recomendations);
					clickHideQuestions(defaults.recomendations);
					clickNextQuestion(defaults.recomendations);
				});
			});
		},
		clickMenu = function(obj){
			$(obj).find(defaults.openDivs).click(function(e){
				e.preventDefault();
				var $next = $(obj).find('.' + $(this).data('opendiv'));
				$(obj).find(defaults.openDivs).parent().removeClass(defaults.currentClass);
				$(this).parent().addClass(defaults.currentClass);
				$(obj).find(defaults.divsContent).not('.' + $(this).data('opendiv')).slideUp();
				$next.slideDown();
				$(obj).find(defaults.hideQuestionsBtn+', '+defaults.nextQuestionBtn).show();
				$(obj).find(defaults.showQuestionBtn).hide();
				$(obj).find(defaults.searchRecommendationsBtn).hide();
				if($next.data('next')){
					$(defaults.nextQuestionBtn).data('nextquestion', '.recomendations-step'+ $next.data('next')).data('actualquestion', '.recomendations-step'+ parseInt($next.data('next') - 1, 10));
				} else {
					$(defaults.nextQuestionBtn).data('nextquestion', '.recomendations-step2').data('actualquestion','.recomendations-step1').hide();
					$(obj).find(defaults.searchRecommendationsBtn).show();
				}
			});
		},
		clickShowQuestions = function(obj){
			$(obj).find(defaults.showQuestionBtn).click(function(e){
				e.preventDefault();
				var opendiv = $(this).data('opendiv');
				$(obj).find('.' + opendiv).slideDown();
				$(this).hide().siblings(defaults.hideQuestionsBtn+', '+defaults.nextQuestionBtn).show();
				$(obj).find(defaults.openDivs).each(function(){
					if($(this).data('opendiv') === opendiv){
						$(obj).find(defaults.openDivs).parent().removeClass(defaults.currentClass);
						$(this).parent().addClass(defaults.currentClass);
					}
				});
			});
		},
		clickHideQuestions = function(obj){
			$(obj).find(defaults.hideQuestionsBtn).click(function(e){
				e.preventDefault();
				$(obj).find(defaults.divsContent).slideUp();
				$(obj).find(defaults.openDivs).parent().removeClass(defaults.currentClass);
				$(this).hide().siblings(defaults.nextQuestionBtn).hide();
				$(this).siblings(defaults.showQuestionBtn).show();
				$(obj).find(defaults.searchRecommendationsBtn).hide();
			});
		},
		clickNextQuestion = function(obj){
			$(obj).find(defaults.nextQuestionBtn).click(function(e) {
				e.preventDefault();
				var $next = $(obj).find($(this).data('nextquestion')),
				    $actual = $(obj).find($(this).data('actualquestion'));
				$next.slideDown();
				$actual.slideUp();
				$(obj).find(defaults.openDivs).parent().removeClass(defaults.currentClass);
				if($next.data('next')){
					$(obj).find(defaults.openDivs+':eq('+$next.data('next') - 2+')').parent().addClass(defaults.currentClass);
					$(this).data('nextquestion', '.recomendations-step'+ $next.data('next')).data('actualquestion', '.recomendations-step'+$next.data('next') - 1);
				} else {
					$(obj).find(defaults.openDivs+':eq('+$actual.data('next') - 1+')').parent().addClass(defaults.currentClass);
					$(this).data('nextquestion', '.recomendations-step2').data('actualquestion','.recomendations-step1').hide();
					$(obj).find(defaults.searchRecommendationsBtn).show();
				}
			});
		};
		return this.each(function(){
			clickRecommendations(this);
		});
	};