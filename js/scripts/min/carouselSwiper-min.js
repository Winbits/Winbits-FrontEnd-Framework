jQuery.fn.carouselSwiper=function(i){var e=$.extend({arrow:!0,arrowLeft:".arrowLeft",arrowRight:".arrowRight",slidesNum:0,slideCSS:".carrusel-slide",loop:!1,optionsSwiper:{grabCursor:!0,useCSS3Transforms:!1},calculateHeight:!1,onClickSlide:!1,initialSlide:!1,carruselNum:"swiperCarrusel-",externalSwipeTo:!1,externalSwipeToItem:".swipeToObj",externalSwipeScrollTo:!1,lastAction:!1,anulateLastAction:!1,numSlideCarousel:"carrusel-slides-"},i),s=0,t=function(i){s=parseInt($(i).find(e.slideCSS).size(),10),e.initialSlide&&$(i).find(e.slideCSS).each(function(i){$(this).addClass("slide"+i)}),e.slidesNum?s>e.slidesNum?a(i):($(i).addClass(e.numSlideCarousel+s),$(i).find(e.slideCSS).first().addClass("swiper-slide-active"),$(i).siblings(e.arrowLeft).hide(),$(i).siblings(e.arrowRight).hide()):s>1?a(i):($(i).siblings(e.arrowLeft).hide(),$(i).siblings(e.arrowRight).hide())},a=function(i){var s=new Swiper(i,e.optionsSwiper);e.loop||(s.addCallback("TouchEnd",function(){e.loop||r(i,s)}),s.addCallback("SlideNext",function(){e.loop||r(i,s)}),s.addCallback("SlidePrev",function(){e.loop||r(i,s)})),e.initialSlide&&o(i,s),e.arrow&&l(i,s),e.calculateHeight&&(n(i,s),s.params.onSlideChangeStart=function(e){n(i,e)}),e.onClickSlide&&$(i).find(e.slideCSS).on("click",function(i){i.stopPropagation(),e.onClickSlide(s)}),s.params.queueStartCallbacks=!0,s.params.queueEndCallbacks=!0,s.params.onSlideChangeEnd=function(s){e.loop||r(i,s)},e.externalSwipeTo&&$(e.externalSwipeToItem).on("click",function(){d(s,i,$(this))})},o=function(i,s){var t=0;$(i).find(e.slideCSS).each(function(i){($(this).find(e.initialSlide).length||$(this).hasClass(e.initialSlide))&&(t=i)}),s.swipeTo(t),e.loop||r(i,s)},l=function(i,s){e.loop||r(i,s),$(i).siblings(e.arrowLeft).on("click",function(t){t.stopPropagation(),e.loop||r(i,s),s.swipePrev()}),$(i).siblings(e.arrowRight).on("click",function(t){t.stopPropagation(),e.loop||r(i,s),s.swipeNext()})},n=function(i,s){var t=$(s.activeSlide()).outerHeight();$(i).animate({height:t+"px"}),$(i).siblings(e.arrowRight+", "+e.arrowLeft).css("top",t/2+"px")},r=function(i,s){$(i).removeArrows({arrowLeft:e.arrowLeft,arrowRight:e.arrowRight,slidesNum:e.slidesNum,slideCSS:e.slideCSS,swiper:s,lastAction:e.lastAction,anulateLastAction:e.anulateLastAction})},d=function(i,s,t){var a=$(t).attr("data-swipeto");i.swipeTo(a,1e3),e.externalSwipeScrollTo&&$("html, body").animate({scrollTop:$(e.externalSwipeScrollTo).offset().top},1e3,"swing")};return this.each(function(i){var s=e.carruselNum+i;$(this).addClass(s),t(this)})},jQuery.fn.removeArrows=function(i){var e=$.extend({slideCSS:".carrusel-slide",slidesNum:0,arrowLeft:".arrowLeft",arrowRight:".arrowRight",slideActive:"swiper-slide-active",addCallback:0,swiper:"swiper",lastAction:!1,anulateLastAction:!1},i);return this.each(function(){var i=$(this).find(e.slideCSS).size(),s=$(this).siblings(e.arrowLeft),t=$(this).siblings(e.arrowRight),a=i-1;e.slidesNum&&(a=i-e.slidesNum),i>e.slidesNum?($(this).find(e.slideCSS).each(function(i){$(this).hasClass("slide"+i)||$(this).addClass("slide"+i),i===a&&($(this).hasClass("pointOfNoReturn")||$(this).addClass("pointOfNoReturn"))}),$(this).find("."+e.slideActive).each(function(){$(this).hasClass("pointOfNoReturn")?(s.show(),t.hide(),e.lastAction&&e.lastAction()):$(this).hasClass("slide0")?(s.hide(),t.show(),e.anulateLastAction&&e.anulateLastAction()):(s.show(),t.show(),e.anulateLastAction&&e.anulateLastAction())})):(s.hide(),t.hide())})};