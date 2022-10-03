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
let button = document.getElementById('addToCart');

button.disabled = true;


function retour(e){
    e.stopPropagation();
    colorSelect = e.target.value;
    console.log(colorSelect);
    //pour verifier que le client a bien choisi un produit alors le boutton ajouter au panier sera activé 
    if (document.getElementById('colors').value ==='' || document.getElementById('quantity').value === '0'){
        button.disabled = true ; 
    }else{
        button.disabled = false; 
    }
  
};

function quantitys (e){
    e.stopPropagation();
    quantity = e.target.valueAsNumber;
    console.log(quantity);
    //pour verifier que le client a bien choisi un produit alors le boutton ajouter au panier sera activé 
    if (document.getElementById('colors').value ==='' || document.getElementById('quantity').value === '0'){
        button.disabled = true ; 
    }else{
        button.disabled = false;
    }
};
elt.addEventListener('change', retour);
document.getElementById('quantity').addEventListener('input', quantitys);

    let tableau = new Array;

 if (localStorage.produit != undefined){
    let produits = localStorage.getItem("produit");
    tableau = JSON.parse(produits); 
 };


document.getElementById('addToCart').addEventListener('click', cart);


function cart(){
    
    let produitSelect = new Object();

    produitSelect.id = id;
    produitSelect.colorSelect = colorSelect;
    produitSelect.quantity = quantity;
 
    let found = false;

    if (tableau.length == 0){
        tableau.push(produitSelect);  
    }else{
        for (let i=0;  i< tableau.length;  i++ ){
            if ( tableau[i].id == produitSelect.id  && tableau[i].colorSelect == produitSelect.colorSelect ) {
                x = tableau[i].quantity;
                y = produitSelect.quantity;
                z = x + y ; 
                produitSelect.quantity = z;
                tableau.splice(i, 1 , produitSelect) ;
                found = true; 
            };
        };
        if (found == false){
            tableau.push(produitSelect);  
        }
    };

    let produits = JSON.stringify(tableau);
    localStorage.setItem("produit",produits);

};
 
