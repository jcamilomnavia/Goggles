"use strict";

var token;
var CurrentGlass;
var apiurl = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/init";
fetch(apiurl, {
  method: 'GET'
}).then(function (result) {
  return result.text();
}).then(function (result2) {
  console.log(result2);
  var stringtoken = result2.split(" ");
  token = stringtoken[4];
  getListItems();
});

function getListItems() {
  var urlList = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/" + token;
  fetch(urlList, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }).then(function (result) {
    return result.json();
  }).then(function (result2) {
    console.log(result2);
    reqListenerGlassesList(result2);
  });
}

function reqListenerGlassesList(object) {
  var fullList = object.data.glasses; // console.log(fullList)

  printGlasses(fullList);
}

function printGlasses(fullList) {
  var glassesList = "";
  fullList.map(function (glasses) {
    glassesList += "<div class=\"item\" onClick=\"getDetail('".concat(glasses.id, "')\">\n      <div>\n      <img src=\"").concat(glasses.images[0], "\" style=\"max-width: 100%; max-height: 450px;\" alt=\"sunglasses_1\">\n      </div>\n      <div class=\"details\">\n          <div class=\"detail\">").concat(glasses.title, " <br> ").concat(glasses.colors[0], "</div>\n          <div class=\"number\">").concat(glasses.price, "$</div>\n      </div>\n  </div>");
  });
  document.getElementById("items").innerHTML = glassesList;
}
/** GET DETAILS */


function getDetail(id) {
  var detailUrl = "http://puigpedros.salle.url.edu/pwi/glasses/api/detail/" + token + "/" + id;
  fetch(detailUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (response2) {
    console.log(response2);
    reqListenerGlassDetail(response2);
  });
}

function reqListenerGlassDetail(object) {
  var detail = object.data;
  printDetail(detail);
}

function buyItem() {
  // console.log(glass)
  // let cart = true
  // let glass = JSON.parse(glass)
  var cart = JSON.parse(localStorage.getItem('cesta'));

  if (cart) {
    cart.cesta.push(CurrentGlass);
    console.log(cart);
    localStorage.setItem('cesta', JSON.stringify(cart));
  } else {
    var aux = [];
    aux.push(CurrentGlass);
    console.log(aux);
    var cesta = {
      "cesta": aux
    };
    console.log(cesta);
    localStorage.setItem('cesta', JSON.stringify(cesta));
  }

  alert("Agregado a la cesta!");
}

function printDetail(detail) {
  // let textdetails = JSON.stringify(detail)
  CurrentGlass = detail; // console.log("details",JSON.stringify(detail))
  // console.log("details",detail)

  var glassDetail = "<div class=\"title\">\n    <div class=\"style titleStyle\">".concat(detail.title, "</div>\n    <img src=\"https://static.thenounproject.com/png/299412-200.png\" class=\"likebutton\" width=50 height=50 alt=\"like\">\n  </div>\n  <div class=\"foto\"><img src=\"").concat(detail.images[0], "\" width=\"350\" height=\"250\" alt=\"sunglasses\"></div>\n  <div class=\"title\">\n    <div class=\"detail\">VERSION & COLORS</div>\n    <div class=\"detail\">PRICE</div>\n  </div>\n  <div class=\"title\">\n    <div class=\"number\">").concat(detail.bgColor, "</div>\n    <div class=\"number\">").concat(detail.price, "</div>\n  </div>\n\n  <div><button onClick=\"buyItem('").concat(detail.id, "')\" class=\"boto\">BUY</button></div>\n\n  <div class=\"description\">\n    <p class=\"subtitle\">DETAILS</p>\n    <div class=\"details_item\">\n        <div class=\"subcategory\">").concat(detail.details.lensesDiameter, "</div>\n        <div class=\"subcategory\">").concat(detail.details.bridgeMaterial, "</div>\n        <div class=\"subcategory\">").concat(detail.details.rimsMaterial, "</div>\n    </div>\n    <div class=\"details_item\">\n        <div class=\"subdescription\">Lenses <br>Diameter</div>\n        <div class=\"subdescription\">Bridge <br>material</div>\n        <div class=\"subdescription\">Rims <br>material</div>\n    </div>\n    <p class=\"subtitle\">DESCRIPTION</p>\n    <p class=\"subdescription\">").concat(detail.description, "</p>\n  </div>");
  document.getElementById("mainpage").innerHTML = glassDetail;
  document.getElementById("bodyList").style.display = "none";
}

function test() {
  console.log(test);
}