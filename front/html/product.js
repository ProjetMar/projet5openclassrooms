let paramsString = window.location.search;
let searchParams = new URLSearchParams (paramsString);
const id = searchParams.get ("id");

console.log(id) ;

let logo = document.querySelector('article .item__img'); 
logo.innerHTML = "<img src=" + "../images/logo.png" + " " + "alt=" + '"' + "Photographie d'un canapé" + '"'  + ">";
let apiProduit = "http://localhost:3000/api/products/" + id; 

let elt = document.getElementById('colors');

fetch(apiProduit)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
    })
    .then(function(value) {
     
      
  
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


        
let colorSelect = '';
let quantity = 0;
let produitSelect = {};
  

function produit() {
elt.addEventListener('change', retour);

function retour(e){
  
  colorSelect = e.target.value;
  console.log(colorSelect);
 
};

document.getElementById('quantity').addEventListener('input', quantitys);

function quantitys (e){
  quantity = e.target.valueAsNumber;
  console.log(quantity);
}
produitSelect={ id, colorSelect, quantity};
return(produitSelect);

};


 document.getElementById('addToCart').addEventListener('click', cart);
 let tab = [];
 function cart(){
  if (tab.length){
    for (let i=0;  i< tab.length;  i++ ){

      if (produit().id == tab[i].id && produit().colorSelect == tab[i].colorSelect ) {
        
          
          tab[i].quantity=tab[i].quantity+1;
         
      }else {
        tab.push(produit());
      }
    }
  }else{
    tab.push(produit());
  }

  
  return(tab);
  
 };
 
 
