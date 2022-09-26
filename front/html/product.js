var paramsString = window.location.search;
var searchParams = new URLSearchParams (paramsString);
const id = searchParams.get ("id");

console.log(id) ;

var logo = document.querySelector('article .item__img'); 
logo.innerHTML = "<img src=" + "../images/logo.png" + " " + "alt=" + '"' + "Photographie d'un canapé" + '"'  + ">";
var apiProduit = "http://localhost:3000/api/products/" + id; 


fetch(apiProduit)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
    })
    .then(function(value) {
     
      let elt = document.getElementById('colors');
  
      document.getElementById('title').innerText = value.name;
      document.getElementById('price').innerText = value.price; 
      document.getElementById('description').innerText = value.description; 

      for (let i=0; i< value.colors.length ; i++){

        elt.innerHTML+= "<option value=" + "'" + value.colors[i]  + "'"+ ">" + value.colors[i] + "</option>"
      }
      
      console.log(value);

    })
    .catch(function(err) {
    // Une erreur est survenue
    });

