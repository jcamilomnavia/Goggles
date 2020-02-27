
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

let fullList = []
let status = 0;
let token = 0
let list = [];
let totalList = 0;

var ajaxGlassesList = {
    request: function (url){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListenerGlassesList);
        xhr.open("GET", url, true);
        xhr.send();
    }
};

var ajaxGlass = {
    request: function (url){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListenerGlass);
        xhr.open("GET", url, true);
        xhr.send();
    }
};

var ajaxToken = {
    request: function (url){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListenerToken);
        xhr.open("GET", url, true);
        xhr.send();
    }
};

var ajaxRemove = {
    request: function (url, body){
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", reqListenerRemove);
        xhr.open("POST", url, true);
        xhr.send(body);
    }
};

function reqListenerGlassesList () {
    var object = JSON.parse(this.responseText);
    // debugger;
    fullList = object.data.glasses
    localStorage.setItem('cesta' , JSON.stringify(fullList))
    getCesta()
}

function reqListenerGlass () {
    var object = JSON.parse(this.responseText);
    // debugger;
    list.push(object.data);
    printGlasses();
}

function reqListenerToken () {
    var object = this.responseText;
    // debugger;
    var result = object.split(" ")
    token = result[4]
    getCesta()
}

function reqListenerRemove () {
    var object = JSON.parse(this.responseText);
    // debugger;
    status = object  
}

function getGlassesList () {
    var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/" + token;
        ajaxGlassesList.request(string)
}

function getGlass (id) {
    var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/detail/" + token + "/" + id;
        ajaxGlass.request(string)
}

function getToken () {
    var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/list/init";
        ajaxToken.request(string);
}

function makeRemove (id) {
    var string = "http://puigpedros.salle.url.edu/pwi/glasses/api/remove/" + token;
    var body = new FormData;
    body.append("id" , id);
        ajaxRemove.request(string, body);
}

function getCesta(){
    let cart = JSON.parse(localStorage.getItem('cesta'))
    console.log('cesta',cart.cesta)
    if (cart){
        totalList = cart.cesta.length
        // list = cart.cesta
        // printGlasses()
        cart.cesta.map((gafas)=> {
            getGlass(gafas.id)
        })
    }else{
        getGlassesList()
    }
}

function removeGlasses () {
    list.map((gafas)=>{
        makeRemove(gafas.id)
        // let elem = document.getElementById(gafas.id);
        // elem.parentNode.removeChild(elem);
    })
    // localStorage.removeItem('cesta')
    setTimeout(()=>{
        document.getElementById("cartBody").style.display = "none"
        document.getElementById("paymentBody").style.display = ""
    },300)
    
}

function printGlasses() {
    // if (list.length == totalList){
        let totalPrice = 0
        let itemlist = ""
        console.log(list)
        list.map((gafas)=>{
            console.log(gafas)
            itemlist +=`<div class="item" id="${gafas.id}">
                <img class="cartImg" src="${gafas.images[0]}" alt="gafas_1" data-weight="250" height="137">
                <h4>${gafas.title}</h4> 
                <h4> ${gafas.price} $</h4> 
                <div class="container">
                    <input type="number" min="1" step="1" value="1" >
                </div>
            </div>`
            totalPrice += gafas.price //* gafas.quantity
        })

        document.getElementById("items").innerHTML = itemlist
        document.getElementById("price").innerHTML = totalPrice + " $"
    // }
}

getToken();