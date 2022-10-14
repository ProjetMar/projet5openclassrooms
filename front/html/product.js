//récupération de l'id du produit qu'on l'a trouve dans l'url 
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
     
      
     // récupération des données d'un produit de l'api 
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
// mettre le bouton non fonctionnel au début 
button.disabled = true;

// fonction qui retourne le couleur choisi par le client 
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
// fonction qui retourne le couleur choisi par le client 
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
// ajouter les ecouteur pour le choix du couleur et pour l'input du quantité saisi 
elt.addEventListener('change', retour);
document.getElementById('quantity').addEventListener('input', quantitys);

    let tableau = new Array;
// création 'un tableau dans la localStorage pour stocker les produits 
 if (localStorage.produit != undefined){
    let produits = localStorage.getItem("produit");
    tableau = JSON.parse(produits); 
 };

// ajouter un écouteur pour le bouton ajouter au panier 
document.getElementById('addToCart').addEventListener('click', cart);

// fonction qui s'active lors de du clic sur le bouton ajouter au panier et qui permet de créer le panier et stocké les produits sélectionnés dans la localStorage 
function cart(){
    
    let produitSelect = new Object();

    produitSelect.id = id;
    produitSelect.colorSelect = colorSelect;
    produitSelect.quantity = quantity;
 
    let found = false;

    if (tableau.length == 0){
        tableau.push(produitSelect);
        alert('le produit est ajouté au panier');  
    }else{
        for (let i=0;  i< tableau.length;  i++ ){
            // si le produits est déja été sélectionner meme id et meme couleur modifer alors la quantité par la nouvelle et remplacer le produit existant par le nouveau modifié
            if ( tableau[i].id == produitSelect.id  && tableau[i].colorSelect == produitSelect.colorSelect ) {
                x = tableau[i].quantity;
                y = produitSelect.quantity;
                z = x + y ; 
                produitSelect.quantity = z;
                tableau.splice(i, 1 , produitSelect) ;
                alert('le quantité du produit a été modifié dans le panier');
                found = true; 
            };
        };
        // si il n'y a pas de produits dans le panier alors ajouter le nouveau 
        if (found == false){
            tableau.push(produitSelect);  
            alert('le produit est ajouté au panier');
        }
    };
    // stockage du tableau dans la localStorage pour le récupérer aprés dans la page panier 
    let produits = JSON.stringify(tableau);
    localStorage.setItem("produit",produits);

};
 
