let searchCountry = (e, event) => {
  if (event.keyCode === 13) {
    let tabindex = document.querySelectorAll("input[tabindex]")

    let current = e.tabIndex
    tabindex[current].focus()

  } else {
    getCountries(e.value)
  }
}

let getCountries = (countryName) => {
  let url = `https://restcountries.eu/rest/v2/all`
  if (countryName && countryName !== "") url = `https://restcountries.eu/rest/v2/name/${countryName}`
  fetch(url)
    .then(json => json.json())
    .then((countries) => {
      document.getElementById("countryList").innerHTML = ""
      let options = ""
      countries.map((country) => {
        options += `<option value=${country.name}>${country.name}</option>`
      })
      document.getElementById("countryList").innerHTML = options
    })
    .catch(err => err)
}

getCountries()

let selectPayment = (e) => {
  let id = e.id
  if (id === 'visa') {
    document.getElementById('paypal').classList.remove('selectedPay')
    document.getElementById('visa').classList.add('selectedPay')
  }
  if (id === 'paypal') {
    document.getElementById('visa').classList.remove('selectedPay')
    document.getElementById('paypal').classList.add('selectedPay')
  }
}

let getCart = () => {
  /**
   * cesta : [
   *  {
   *    ...,
   *    price: #
   *  },
   *  {...}]
   */
  // Make an array map an sum the values
  let cart = JSON.parse(localStorage.getItem('cesta'))
  let finalPrice = 0
  if (cart) {
    cart.cesta.map((item) => {
      finalPrice += parseInt(item.price)
    })
    document.getElementById("finalPrice").innerText = finalPrice + "€"
  } else {
    document.getElementById("finalPrice").innerText = "0 €"
  }
}

getCart()

let verifyPayment = () => {
  let visa = document.getElementById("visa").classList.value.includes("selectedPay")
  let paypal = document.getElementById("paypal").classList.value.includes("selectedPay")
  let country = document.getElementById("countryPayment").value
  let address = document.getElementById("addressPayment").value
  
  if (!visa) {
    if (!paypal) {
      alert("Debe Seleccionar un metodo de pago")
    } else {
      if (country !== "") {
        if (address !== "") {
          alert("Gracias Por su Compra!")
        } else alert("Debe Seleccionar una direccion de envio")
      } else alert("Debe Seleccionar una direccion de envio")
    }
  } else {
    if (country !== "") {
      if (address !== "") {
        alert("Gracias Por su Compra!")
      } else alert("Debe Seleccionar una direccion de envio")
    } else alert("Debe Seleccionar una direccion de envio")
  }
}
