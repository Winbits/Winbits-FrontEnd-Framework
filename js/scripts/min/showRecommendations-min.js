jQuery.fn.showRecommendations=function(n){var e=$.extend({recomendations:".recomendations",openDivs:".recomendations-link",divsContent:".recomendations-div",currentClass:"current",showQuestionBtn:".showQuestionBtn",hideQuestionsBtn:".hideQuestions",nextQuestionBtn:".nextQuestion",searchRecommendationsBtn:".searchRecommendationsBtn",headerChoose:".header-choose"},n),t=function(n){$(n).click(function(n){n.preventDefault(),$("body, html").animate({scrollTop:0},500,function(){$(e.recomendations).slideDown(),$(e.headerChoose).length&&$(e.headerChoose).slideUp(),s(e.recomendations),i(e.recomendations),o(e.recomendations),a(e.recomendations)})})},s=function(n){$(n).find(e.openDivs).click(function(t){t.preventDefault();var s=$(n).find("."+$(this).data("opendiv"));$(n).find(e.openDivs).parent().removeClass(e.currentClass),$(this).parent().addClass(e.currentClass),$(n).find(e.divsContent).not("."+$(this).data("opendiv")).slideUp(),s.slideDown(),$(n).find(e.hideQuestionsBtn+", "+e.nextQuestionBtn).show(),$(n).find(e.showQuestionBtn).hide(),$(n).find(e.searchRecommendationsBtn).hide(),s.data("next")?$(e.nextQuestionBtn).data("nextquestion",".recomendations-step"+s.data("next")).data("actualquestion",".recomendations-step"+parseInt(s.data("next")-1,10)):($(e.nextQuestionBtn).data("nextquestion",".recomendations-step2").data("actualquestion",".recomendations-step1").hide(),$(n).find(e.searchRecommendationsBtn).show())})},i=function(n){$(n).find(e.showQuestionBtn).click(function(t){t.preventDefault();var s=$(this).data("opendiv");$(n).find("."+s).slideDown(),$(this).hide().siblings(e.hideQuestionsBtn+", "+e.nextQuestionBtn).show(),$(n).find(e.openDivs).each(function(){$(this).data("opendiv")===s&&($(n).find(e.openDivs).parent().removeClass(e.currentClass),$(this).parent().addClass(e.currentClass))})})},o=function(n){$(n).find(e.hideQuestionsBtn).click(function(t){t.preventDefault(),$(n).find(e.divsContent).slideUp(),$(n).find(e.openDivs).parent().removeClass(e.currentClass),$(this).hide().siblings(e.nextQuestionBtn).hide(),$(this).siblings(e.showQuestionBtn).show(),$(n).find(e.searchRecommendationsBtn).hide()})},a=function(n){$(n).find(e.nextQuestionBtn).click(function(t){t.preventDefault();var s=$(n).find($(this).data("nextquestion")),i=$(n).find($(this).data("actualquestion"));s.slideDown(),i.slideUp(),$(n).find(e.openDivs).parent().removeClass(e.currentClass),s.data("next")?($(n).find(e.openDivs+":eq("+s.data("next")-2+")").parent().addClass(e.currentClass),$(this).data("nextquestion",".recomendations-step"+s.data("next")).data("actualquestion",".recomendations-step"+s.data("next")-1)):($(n).find(e.openDivs+":eq("+i.data("next")-1+")").parent().addClass(e.currentClass),$(this).data("nextquestion",".recomendations-step2").data("actualquestion",".recomendations-step1").hide(),$(n).find(e.searchRecommendationsBtn).show())})};return this.each(function(){t(this)})};