var carousel = (function() {

  var config = { };

  config.slides       = 4;
  config.itemScroll   = 1;
  config.speed        = 500;
  config.effect       = "ease";
  config.delay        = 0;
  config.transition   = 'margin-left ' + config.speed + 'ms' + ' ' + config.effect + ' ' + config.delay + 'ms';
  config.carousel     = ".carousel";
  config.carouselList = ".carousel .list";
  config.nextName     = "triangleNextBox"; //btn-next
  config.prevName     = "trianglePrev"; //btn-prev
  config.btnList      = createMarkup.newElement("div", {"class" : "btn-list"});
  config.btnNext      = createMarkup.newElement("div", {"id" : config.nextName}, '<div id="triangleNextIn"></div>');
  config.btnPrev      = createMarkup.newElement("div", {"id" : config.prevName}, null);


  function addTransition(){
    document.querySelector(config.carouselList).style.transition = config.transition;
  }

function createButtons(){
    config.btnList.appendChild(config.btnPrev);
    config.btnList.appendChild(config.btnNext);
    document.querySelector(config.carousel).appendChild(config.btnList);
    goNext();
    goPrev();
}

  function goNext() {
    document.getElementById(config.nextName).addEventListener("click", function(){
      var scroll = document.querySelector(config.carouselList).style.marginLeft.replace("px",""),
          stopCondition = -1*(config.totalWidth - (config.slides * config.itemWidth ) );

      scroll = (scroll*1) - config.itemWidth * config.itemScroll;

      if(scroll >= stopCondition){
        roll(scroll);
      } else {
        roll(stopCondition);
      }

    });

  }

    function goPrev(){
        document.getElementById(config.prevName).addEventListener("click", function(){
        var scroll = document.querySelector(config.carouselList).style.marginLeft.replace("px","");
        scroll = (scroll*1) + config.itemWidth * config.itemScroll;
        if(scroll <= 0 ){
            roll(scroll);
            }
        });
    }

  function roll(scroll){
    document.querySelector(config.carouselList).style.marginLeft = scroll + "px";
  }


  function init(){
    // Listen for the event.
    document.addEventListener('completeRecommendation', function (e) {
       setItemWidth();
       addTransition();
       createButtons();
     }, false);

  }

  function setItemWidth(){
    var list    = document.querySelector(".carousel .list"),
        item    = list.getElementsByClassName("item"),
        listW   = list.offsetWidth,
        itemW   = listW / config.slides,
        totalW  = itemW * item.length ; // + 5

    config.listWidth = listW;
    config.itemWidth = itemW;
    config.totalWidth = totalW;

    for(var i=0; i < item.length; i++) {
      list.childNodes[i].style.width = itemW + "px";
    }
    list.style.width = totalW+"px";
    console.log("totalW");
    console.log(totalW);

  }
  return {
    init: init
  };

})();

carousel.init();
