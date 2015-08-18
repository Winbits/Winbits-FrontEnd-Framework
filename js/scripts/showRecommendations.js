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
			$(obj).click(function() {
				$('body, html').animate({
					scrollTop: 0
				}).promise().done(function(){
					$(defaults.recomendations).slideDown();
					if($(defaults.headerChoose).length){
						$(defaults.headerChoose).slideUp();
					}
					clickMenu(defaults.recomendations);
					clickShowQuestions(defaults.recomendations);
					clickHideQuestions(defaults.recomendations);
					clickNextQuestion(defaults.recomendations);
				});
				return false;
			});
		},
		clickMenu = function(obj){
			$(obj).find(defaults.openDivs).click(function(e){
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
				return false;
			});
		},
		clickShowQuestions = function(obj){
			$(obj).find(defaults.showQuestionBtn).click(function(){
				var opendiv = $(this).data('opendiv');
				$(obj).find('.' + opendiv).slideDown();
				$(this).hide().siblings(defaults.hideQuestionsBtn+', '+defaults.nextQuestionBtn).show();
				$(obj).find(defaults.openDivs).each(function(){
					if($(this).data('opendiv') === opendiv){
						$(obj).find(defaults.openDivs).parent().removeClass(defaults.currentClass);
						$(this).parent().addClass(defaults.currentClass);
					}
				});
				return false;
			});
		},
		clickHideQuestions = function(obj){
			$(obj).find(defaults.hideQuestionsBtn).click(function(){
				$(obj).find(defaults.divsContent).slideUp();
				$(obj).find(defaults.openDivs).parent().removeClass(defaults.currentClass);
				$(this).hide().siblings(defaults.nextQuestionBtn).hide();
				resetBtnNextQuestion($(obj).find(defaults.nextQuestionBtn));
				$(this).siblings(defaults.showQuestionBtn).show();
				$(obj).find(defaults.searchRecommendationsBtn).hide();
				return false;
			});
		},
		resetBtnNextQuestion = function(obj){
			$(obj).attr({
				'data-nextquestion': '.recomendations-step2',
				'data-actualquestion':'.recomendations-step1'
			});
		},
		clickNextQuestion = function(obj){
			$(obj).find(defaults.nextQuestionBtn).click(function() {
				var $next = $(obj).find($(this).attr('data-nextquestion')),
				    $actual = $(obj).find($(this).attr('data-actualquestion'));
			    $next.stop().slideDown();
				$actual.stop().slideUp();
				$(obj).find(defaults.openDivs).parent().removeClass(defaults.currentClass);
				if($next.attr('data-next')){
					$(obj).find(defaults.openDivs).parent().filter(':eq(' + (parseInt($next.attr('data-next'), 10) - 2) + ')').addClass(defaults.currentClass);
					$(this).attr({
						'data-nextquestion': '.recomendations-step' + $next.attr('data-next'),
						'data-actualquestion': '.recomendations-step' + (parseInt($next.attr('data-next'), 10) - 1)
					});
				} else {
					$(obj).find(defaults.openDivs).parent().filter(':eq(' + (parseInt($actual.attr('data-next'), 10) - 1) + ')').addClass(defaults.currentClass);
					$(this).hide();
					resetBtnNextQuestion(this);
					$(obj).find(defaults.searchRecommendationsBtn).show();
				}
				return false;
			});
		};
		return this.each(function(){
			clickRecommendations(this);
		});
	};