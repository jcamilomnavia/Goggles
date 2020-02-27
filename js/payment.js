"use strict";

var searchCountry = function searchCountry(e, event) {
  if (event.keyCode === 13) {
    var tabindex = document.querySelectorAll("input[tabindex]");
    var current = e.tabIndex;
    tabindex[current].focus();
  } else {
    getCountries(e.value);
  }
};

var getCountries = function getCountries(countryName) {
  var url = "https://restcountries.eu/rest/v2/all";
  if (countryName && countryName !== "") url = "https://restcountries.eu/rest/v2/name/".concat(countryName);
  fetch(url).then(function (json) {
    return json.json();
  }).then(function (countries) {
    document.getElementById("countryList").innerHTML = "";
    var options = "";
    countries.map(function (country) {
      options += "<option value=".concat(country.name, ">").concat(country.name, "</option>");
    });
    document.getElementById("countryList").innerHTML = options;
  })["catch"](function (err) {
    return err;
  });
};

getCountries();

var selectPayment = function selectPayment(e) {
  var id = e.id;

  if (id === 'visa') {
    document.getElementById('paypal').classList.remove('selectedPay');
    document.getElementById('visa').classList.add('selectedPay');
  }

  if (id === 'paypal') {
    document.getElementById('visa').classList.remove('selectedPay');
    document.getElementById('paypal').classList.add('selectedPay');
  }
};

var getCart = function getCart() {
  /**
   * cesta : [
   *  {
   *    ...,
   *    price: #
   *  },
   *  {...}]
   */
  // Make an array map an sum the values
  var cart = JSON.parse(localStorage.getItem('cesta'));
  var finalPrice = 0;

  if (cart) {
    cart.cesta.map(function (item) {
      finalPrice += parseInt(item.price);
    });
    document.getElementById("finalPrice").innerText = finalPrice + "€";
  } else {
    document.getElementById("finalPrice").innerText = "0 €";
  }
};

getCart();

var verifyPayment = function verifyPayment() {
  var visa = document.getElementById("visa").classList.value.includes("selectedPay");
  var paypal = document.getElementById("paypal").classList.value.includes("selectedPay");
  var country = document.getElementById("countryPayment").value;
  var address = document.getElementById("addressPayment").value;

  if (!visa) {
    if (!paypal) {
      alert("Debe Seleccionar un metodo de pago");
    } else {
      if (country !== "") {
        if (address !== "") {
          alert("Gracias Por su Compra!");
        } else alert("Debe Seleccionar una direccion de envio");
      } else alert("Debe Seleccionar una direccion de envio");
    }
  } else {
    if (country !== "") {
      if (address !== "") {
        alert("Gracias Por su Compra!");
      } else alert("Debe Seleccionar una direccion de envio");
    } else alert("Debe Seleccionar una direccion de envio");
  }
};