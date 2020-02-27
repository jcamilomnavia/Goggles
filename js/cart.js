"use strict";

/*
var detailGlass = {
    status: 200,
    data: { 
      id: "string",
      title: "string",
      description: "string",
      price: number,
      images: ["string", "string", "string"],
      colors: ["string", "string", "string"],
      details: {
        lensesDiameter: "string",
        bridgeMaterial: "string",
        rimsMaterial: "string"
      },
      bgColor: 'string'
    }
  }
  */
//localStorage.removeItem('cesta')  
var fullList = [];
var status = 0;
var token = 0;
var list = [];
var totalList = 0;
var ajaxGlassesList = {
  request: function request(url) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListenerGlassesList);
    xhr.open("GET", url, true);
    xhr.send();
  }
};
var ajaxGlass = {
  request: function request(url) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListenerGlass);
    xhr.open("GET", url, true);
    xhr.send();
  }
};
var ajaxToken = {
  request: function request(url) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListenerToken);
    xhr.open("GET", url, true);
    xhr.send();
  }
};
var ajaxRemove = {
  request: function request(url, body) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListenerRemove);
    xhr.open("POST", url, true);
    xhr.send(body);
  }
};

function reqListenerGlassesList() {
  var object = JSON.parse(this.responseText); // debugger;

  fullList = object.data.glasses;
  localStorage.setItem('cesta', JSON.stringify(fullList));
  getCesta();
}

function reqListenerGlass() {
  var object = JSON.parse(this.responseText); // debugger;

  list.push(object.data);
  printGlasses();
}

function reqListenerToken() {
  var object = this.responseText; // debugger;

  var result = object.split(" ");
  token = result[4];
  getCesta();
}

function reqListenerRemove() {
  var object = JSON.parse(this.responseText); // debugger;

  status = object;
}

function getGlassesList() {
  var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/" + token;
  ajaxGlassesList.request(string);
}

function getGlass(id) {
  var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/detail/" + token + "/" + id;
  ajaxGlass.request(string);
}

function getToken() {
  var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/init";
  ajaxToken.request(string);
}

function makeRemove(id) {
  var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/remove/" + token;
  var body = new FormData();
  body.append("id", id);
  ajaxRemove.request(string, body);
}

function getCesta() {
  var cart = JSON.parse(localStorage.getItem('cesta'));
  console.log('cesta', cart.cesta);

  if (cart) {
    totalList = cart.cesta.length; // list = cart.cesta
    // printGlasses()

    cart.cesta.map(function (gafas) {
      getGlass(gafas.id);
    });
  } else {
    getGlassesList();
  }
}

function removeGlasses() {
  list.map(function (gafas) {
    makeRemove(gafas.id); // let elem = document.getElementById(gafas.id);
    // elem.parentNode.removeChild(elem);
  }); // localStorage.removeItem('cesta')

  setTimeout(function () {
    document.getElementById("cartBody").style.display = "none";
    document.getElementById("paymentBody").style.display = "";
  }, 300);
}

function printGlasses() {
  // if (list.length == totalList){
  var totalPrice = 0;
  var itemlist = "";
  console.log(list);
  list.map(function (gafas) {
    console.log(gafas);
    itemlist += "<div class=\"item\" id=\"".concat(gafas.id, "\">\n                <img class=\"cartImg\" src=\"").concat(gafas.images[0], "\" alt=\"gafas_1\" data-weight=\"250\" height=\"137\">\n                <h4>").concat(gafas.title, "</h4> \n                <h4> ").concat(gafas.price, " $</h4> \n                <div class=\"container\">\n                    <input type=\"number\" min=\"1\" step=\"1\" value=\"1\" >\n                </div>\n            </div>");
    totalPrice += gafas.price; //* gafas.quantity
  });
  document.getElementById("items").innerHTML = itemlist;
  document.getElementById("price").innerHTML = totalPrice + " $"; // }
}

getToken();