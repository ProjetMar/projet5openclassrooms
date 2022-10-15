//récupération de l'id du produit ajouté dans l'url 
let paramsString = window.location.search;
let searchParams = new URLSearchParams (paramsString);
const id = searchParams.get ("id");

console.log(id) ;

let logo = document.querySelector('article .item__img'); 
logo.innerHTML = "<img src=" + "../images/logo.png" + " " + "alt=" + '"' + "Photographie d'un canapé" + '"'  + ">";
let apiProduit = "http://localhost:3000/api/products/" + id; 

let list_colors = document.getElementById('colors');

fetch(apiProduit)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {  
        // récupération des données d'un produit de l'api 
        console.log("produit " + id);
        console.log(value);
        
        // remplir les informations d'un produit
        document.getElementById('title').innerText = value.name;
        document.getElementById('price').innerText = value.price; 
        document.getElementById('description').innerText = value.description; 

        //Ajouter la liste des couleurs d'un produit
        for (let i=0; i< value.colors.length ; i++){
            list_colors.innerHTML+= "<option value=" + "'" + value.colors[i]  + "'"+ ">" + value.colors[i] + "</option>";
        }
    })
    .catch(function(err) {
        console.log("Erreur de récupération du produit " + id);
        console.log(err);
    });

let colorSelect = '';
let quantity = 0;
let button = document.getElementById('addToCart');
// mettre le bouton non fonctionnel au début 
button.disabled = true;

function CheckColorsAndQuantity(){
    if (document.getElementById('colors').value ==='' || document.getElementById('quantity').value === '0'){
        button.disabled = true ; 
    }else{
        button.disabled = false; 
    }
}

// Activer le bouton Ajouter au panier quand une couleur est sélectionnée et la quantité est supérieure à 0 
list_colors.addEventListener('change', function(e){
    e.stopPropagation();
    CheckColorsAndQuantity();
});
document.getElementById('quantity').addEventListener('input', function(e){
    e.stopPropagation();
    CheckColorsAndQuantity();
});

// Récupérer le contenu du localStorage dans un tableau
let products_array = new Array; 
if (localStorage.produit != undefined){
    products_array = JSON.parse(localStorage.produit); 
};


document.getElementById('addToCart').addEventListener('click', addTocart);

// fonction qui s'active lors de du clic sur le bouton ajouter au panier et qui permet de créer le panier et stocké les produits sélectionnés dans la localStorage 
function addTocart(){
    
    let produitSelect = new Object();

    produitSelect.id = id;
    produitSelect.colorSelect = document.getElementById('colors').value;
    produitSelect.quantity = document.getElementById('quantity').valueAsNumber;
 
    let found = false;

    for (let i=0;  i< products_array.length;  i++ ){
        // si le produits est déja été sélectionner meme id et meme couleur modifer alors la quantité par la nouvelle et remplacer le produit existant par le nouveau modifié
        if ( products_array[i].id == produitSelect.id  && products_array[i].colorSelect == produitSelect.colorSelect ) {
            produitSelect.quantity += products_array[i].quantity;
            products_array.splice(i, 1 , produitSelect) ;
            alert('la quantité du produit a été modifiée dans le panier');
            found = true; 
        };
    };
    // si il n'y a pas de produits dans le panier alors ajouter le nouveau 
    if (found == false){
        products_array.push(produitSelect);  
        alert('le produit est ajouté au panier');
    }
    // stockage du tableau dans la localStorage pour le récupérer aprés dans la page panier 
    localStorage.setItem("produit",JSON.stringify(products_array));

};
 