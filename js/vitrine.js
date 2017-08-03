var createMarkup = (function() {

function getData(data)
{
    var el = document.getElementById("chaordicOnSite"); // vascon; carousel
    // console.log('chaordicOnSite')
    createReference(data);
    createRecommendation(data);
}

function createItem(obj, selector){
    var reference = selector;
    var item      = obj;
    var container = newElement("li", {"class" :"item" });
    var figure    = newElement("figure", {"class" : "figure-align"});
    var a         = newElement("a", {'class': "linkImg" ,"href" : "http:" + item.detailUrl });
    var img       = newElement("img", {"src" : "http:" + item.imageName });
    var title     = newElement("span", {"class" : "text"}, item.name );
    var oldPrice  = item.oldPrice  ? newElement("span", {"class" : "old-price"}, "De: " + item.oldPrice) : false;
    var price     = newElement("p", {"class" : "price"}, "Por:<span class=\"bigger\"> " + item.price + '</span>');
    var paymentConditions   = newElement("p", {"class" : "paymentConditions"}, item.productInfo.paymentConditions);
    var interest   = newElement("p", {"class" : "interest"}, "Sem juros");
    // console.log("item.detailUrl");
    // console.log(item.detailUrl);


    a.appendChild(img);
    figure.appendChild(a);

    container.appendChild(figure);

    container.appendChild(title);
    if(oldPrice){
        container.appendChild(oldPrice);
    }
    container.appendChild(price);
    container.appendChild(paymentConditions);
    container.appendChild(interest);
    reference.appendChild(container);
}

function createReference(obj){
    var list = newElement("ul", {"class" : "list"}),
        selector = document.querySelector(".reference");

    selector.appendChild(list);
    createItem(obj.reference.item, selector.querySelector(".list") );
}

  function createRecommendation(obj){
    var recommend = obj.recommendation,
        list = newElement("ul", {"class" : "list"}),
        selector = document.querySelector(".recommendation .carousel"),
        event = new Event("completeRecommendation");

    selector.appendChild(list);
    var i = 1;
    for(var prop in recommend) {
      createItem(recommend[prop], document.querySelector(".recommendation .list")  );
      //showData(recommend[prop]);

      if(recommend.length === i++){
        // Dispatch the event.
        document.dispatchEvent(event);
      }
    }

  }

  HTMLElement.prototype.text = function(text) {
    this.innerHTML = text;
  }

  function showData(obj){
    for (var prop in obj) {
    }
  }

  function newElement(element, attr, text) {
    var el = document.createElement(element);
    for (var prop in attr) {
      el.setAttribute(prop, attr[prop]);
    }

    if(text !== undefined){
      el.text(text);
    }
    return el;
  }

function documentReady(){
    var script = document.createElement('script');
    script.src = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X";
    // script.src = "js/local_data.json?callback=X";
    document.getElementsByTagName('body')[0].appendChild(script);
}


    function init() {
        documentReady();
    }

  return {
    getData : getData,
    init : init,
    newElement: newElement
  };

})();

createMarkup.init();

function X(data){
  createMarkup.getData(data.data);
}
