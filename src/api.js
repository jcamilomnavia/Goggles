let token
let CurrentGlass
let apiurl = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/init"
fetch(apiurl, {
  method: 'GET'
})
  .then((result) => {
    return result.text()
  })
  .then((result2) => {
    console.log(result2)
    let stringtoken = result2.split(" ")
    token = stringtoken[4]
    getListItems()
  })

function getListItems() {
  var urlList = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/" + token;
  fetch(urlList, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
    .then((result) => {
      return result.json()
    })
    .then((result2) => {
      console.log(result2)
      reqListenerGlassesList(result2)
    })
}

function reqListenerGlassesList(object) {
  let fullList = object.data.glasses
  // console.log(fullList)
  printGlasses(fullList)
}

function printGlasses(fullList) {
  let glassesList = "";
  fullList.map((glasses) => {
    glassesList += `<div class="item" onClick="getDetail('${glasses.id}')">
      <div>
      <img src="${glasses.images[0]}" style="max-width: 100%; max-height: 450px;" alt="sunglasses_1">
      </div>
      <div class="details">
          <div class="detail">${glasses.title} <br> ${glasses.colors[0]}</div>
          <div class="number">${glasses.price}$</div>
      </div>
  </div>`
  })
  document.getElementById("items").innerHTML = glassesList;
}

/** GET DETAILS */
function getDetail(id) {
  let detailUrl = "http://puigpedros.salle.url.edu/pwi/glasses/api/detail/" + token + "/" + id
  fetch(detailUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      return response.json()
    })
    .then((response2) => {
      console.log(response2)
      reqListenerGlassDetail(response2)
    })
}

function reqListenerGlassDetail(object) {
  let detail = object.data
  printDetail(detail)
}

function buyItem(){
  // console.log(glass)
  // let cart = true
  // let glass = JSON.parse(glass)
  let cart = JSON.parse(localStorage.getItem('cesta'))
  if (cart){
      cart.cesta.push(CurrentGlass)
      console.log(cart)
      localStorage.setItem('cesta', JSON.stringify(cart));
  }else{
      let aux = [];
      aux.push(CurrentGlass)
      console.log(aux)
      let cesta = {
        "cesta" : aux
      }
      console.log(cesta)
      localStorage.setItem('cesta', JSON.stringify(cesta));
  }
  alert("Agregado a la cesta!")
}

function printDetail(detail) {
  // let textdetails = JSON.stringify(detail)
  CurrentGlass = detail
  // console.log("details",JSON.stringify(detail))
  // console.log("details",detail)
  let glassDetail = `<div class="title">
    <div class="style titleStyle">${detail.title}</div>
    <img src="https://static.thenounproject.com/png/299412-200.png" class="likebutton" width=50 height=50 alt="like">
  </div>
  <div class="foto"><img src="${detail.images[0]}" width="350" height="250" alt="sunglasses"></div>
  <div class="title">
    <div class="detail">VERSION & COLORS</div>
    <div class="detail">PRICE</div>
  </div>
  <div class="title">
    <div class="number">${detail.bgColor}</div>
    <div class="number">${detail.price}</div>
  </div>

  <div><button onClick="buyItem('${detail.id}')" class="boto">BUY</button></div>

  <div class="description">
    <p class="subtitle">DETAILS</p>
    <div class="details_item">
        <div class="subcategory">${detail.details.lensesDiameter}</div>
        <div class="subcategory">${detail.details.bridgeMaterial}</div>
        <div class="subcategory">${detail.details.rimsMaterial}</div>
    </div>
    <div class="details_item">
        <div class="subdescription">Lenses <br>Diameter</div>
        <div class="subdescription">Bridge <br>material</div>
        <div class="subdescription">Rims <br>material</div>
    </div>
    <p class="subtitle">DESCRIPTION</p>
    <p class="subdescription">${detail.description}</p>
  </div>`
  document.getElementById("mainpage").innerHTML = glassDetail;
  document.getElementById("bodyList").style.display = "none"
}

function test(){
  console.log(test)
}