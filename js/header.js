"use strict";

var showCart = function showCart() {
  document.getElementById("cartBody").style.display = "";
  document.getElementById("paymentBody").style.display = "none";
};

var showList = function showList() {
  document.getElementById("bodyList").style.display = "";
  document.getElementById("mainpage").style.display = "none";
};