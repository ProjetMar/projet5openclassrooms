produits = JSON.parse(localStorage.produit);
let cart = document.getElementById('cart__items');
let priceProduits = 0; 
let quantityProduits = 0;


let quantitysSelect = document.getElementById('cart__items').getElementsByClassName('itemQuantity');
let deletProduitsSelect = document.getElementById('cart__items').getElementsByClassName('deleteItem');
let prices = [];

let Url = "http://localhost:3000/api/products";
fetch(Url)
.then(function(res) {
    if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        
        for (let i=0; i < produits.length; i++){
            for (let j=0; j< value.length ; j++){
                if (produits[i].id == value[j]._id){

                    cart.innerHTML += "<article class= \"cart__item\" data-id=" + produits[i].id + " data-color =" + produits[i].colorSelect + "> <div class=\"cart__item__img\"><img src='" + value[j].imageUrl + "'alt=" +'"' + value[i].altTxt +'"' + "></div><div class=\"cart__item__content\"><div class=\"cart__item__content__description\"><h2>" + value[j].name + "</h2><p>" + produits[i].colorSelect + "</p><p>"+ value[j].price  + "€</p></div><div class=\"cart__item__content__settings\"><div class=\"cart__item__content__settings__quantity\"><p>Qté : </p><input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=" + produits[i].quantity +"></div><div class=\"cart__item__content__settings__delete\"><p class=\"deleteItem\">Supprimer</p></div></div></div></article";
                    priceProduits += value[j].price * produits[i].quantity;
                    quantityProduits += produits[i].quantity;
                    prices.push(value[j].price);
                }
            }

        }
        document.getElementById('totalPrice').innerText = priceProduits.toString(); 
        document.getElementById('totalQuantity').innerText = quantityProduits.toString();

       console.log(value);

       
       modifierPanier(quantitysSelect, deletProduitsSelect);



    })

    .catch(function(err) {
      // Une erreur est survenue
    });   

function modifierPanier(){
    
    
    for (let i=0; i < quantitysSelect.length ; i++){

        let produitListener = quantitysSelect[i];
        produitListener.addEventListener('input', quantityF);
      
    };


   
    for (let i=0; i < deletProduitsSelect.length ; i++){

        /*supprimeClick = false; */
        deletProduitsSelect[i].addEventListener('click', deleteP);
       


        
    };
 
};
function deleteP(e){
    e.stopPropagation();
  
        for (let j=0; j< produits.length ; j++) {
            if (e.target.closest('.cart__item').dataset.id == produits[j].id && e.target.closest('.cart__item').dataset.color == produits[j].colorSelect){
                
                for (let i=0; i<prices.length; i++){
                    if (i == j){

                    priceProduits = priceProduits - (produits[j].quantity * prices[i]);
                    prices.splice(i,1);

                    };

                }
                quantityProduits = quantityProduits - produits[j].quantity;
                

                produits.splice(j,1);

            }
        };
        e.target.closest('.cart__item').remove();
      
   
    document.getElementById('totalPrice').innerText = priceProduits.toString(); 
    document.getElementById('totalQuantity').innerText = quantityProduits.toString();
    localStorage.setItem("produit", JSON.stringify(produits)); 
};

function quantityF(e){
    e.stopPropagation();
    newQuantity = e.target.valueAsNumber; 
    if (newQuantity != undefined){
             
        for (let j=0; j< produits.length ; j++) {
            if (e.target.closest('.cart__item').dataset.id == produits[j].id && e.target.closest('.cart__item').dataset.color == produits[j].colorSelect){
                for (let i=0; i<prices.length; i++){
                    if (i == j){

                    priceProduits = priceProduits - (produits[j].quantity * prices[i]) + (newQuantity * prices[i]);

                    };

                }
                quantityProduits = quantityProduits - produits[j].quantity + newQuantity;
                produits[j].quantity = newQuantity;
            };
        };
    };
    document.getElementById('totalPrice').innerText = priceProduits.toString(); 
    document.getElementById('totalQuantity').innerText = quantityProduits.toString();
    
    localStorage.setItem("produit", JSON.stringify(produits));
};

//fonction pour activer ou désactiver le bouton commander 
/*function disableSubmit(disabled) {
    let formulaire = document.getElementsByClassName("cart__order__form");
    /*let form1 = formulaire[0];*/
  /*  if (disabled) {
        formulaire[0].setAttribute("disabled", true);
    } else {
        
        formulaire[0].removeAttribute("disabled");
    }
  }
// verification des formulaires 

disableSubmit(false);

document.getElementById('firstName').addEventListener("input", function(e) {

    let myInput = document.getElementById('firstName');
    let myRegex = /^[a-zA-Z-\s]+$/;
    if (myInput.value.trim()==""){
        let myError = document.getElementById('firstNameErrorMsg');
        myError.innerHTML="le champ de firstname est requis. ";
        myError.style.color = 'black';
        e.preventDefault();
        disableSubmit(true);
    }else if(myRegex.test(myInput.value)==false){
        let myError =document.getElementById('firstNameErrorMsg');
        myError.innerHTML ="le prénom doit comporter des lettres et des tirets uniquement. ";
        myError.style.color = 'black';
        e.preventDefault();
        disableSubmit(true);
    };
});

document.getElementById('lastName').addEventListener("input", function(e) {

    let myInput = document.getElementById('lastName');
    let myRegex = /^[a-zA-Z-\s]+$/;
    if (myInput.value.trim()==""){
        let myError = document.getElementById('lastNameErrorMsg');
        myError.innerHTML="le champ de firstname est requis. ";
        myError.style.color = 'black';
        e.preventDefault();
        disableSubmit(true);
    }else if(myRegex.test(myInput.value)==false){
        let myError =document.getElementById('lastNameErrorMsg');
        myError.innerHTML ="le nom doit comporter des lettres et des tirets uniquement. ";
        myError.style.color = 'black';
        e.preventDefault();
        disableSubmit(true);
    };
});
document.getElementById('email').addEventListener("input", function(e) {

    let myInput = document.getElementById('email');
    let myRegex = /^([a-zA-Z0-9_-])+([.]?[a-zA-Z0-9_-]{1,})*@([a-zA-Z0-9-_]{2,}[.])+[a-zA-Z]{2,3}$/;
    if (myInput.value.trim()==""){
        let myError = document.getElementById('emailErrorMsg');
        myError.innerHTML="le champ email est requis. ";
        myError.style.color = 'black';
        e.preventDefault();
        disableSubmit(true);
    }else if(myRegex.test(myInput.value)==false){
        let myError =document.getElementById('emailErrorMsg');
        myError.innerHTML ="l'adresse mail est invalide. ";
        myError.style.color = 'black';
        e.preventDefault();
        disableSubmit(true);
    };
});*/

function send (e){
    e.preventDefault();
    let activeBouton = true ; 
    // vérification que le panier est n'est pas vide 
    if (produits.length == 0){
        activeBouton = false ; 
        alert('le panier est vide');
    }
    // verification de firstName
    let myRegex1 = /^[a-zA-Z-\s]+$/;
    let myRegex2 = /^([a-zA-Z0-9_-])+([.]?[a-zA-Z0-9_-]{1,})*@([a-zA-Z0-9-_]{2,}[.])+[a-zA-Z]{2,3}$/;
    if ( document.getElementById("firstName").value.trim()==""){
        let myError = document.getElementById('firstNameErrorMsg');
        myError.innerHTML="le champ de firstname est requis. ";
        myError.style.color = 'black';
        e.preventDefault();
        activeBouton = false ; 
    }else if(myRegex1.test( document.getElementById("firstName").value)==false){
        let myError =document.getElementById('firstNameErrorMsg');
        myError.innerHTML ="le prénom doit comporter des lettres et des tirets uniquement. ";
        myError.style.color = 'black';
        e.preventDefault();
        activeBouton = false ; 
    };
    // verification de lastName
    if (document.getElementById("lastName").value.trim()==""){
        let myError = document.getElementById('lastNameErrorMsg');
        myError.innerHTML="le champ de firstname est requis. ";
        myError.style.color = 'black';
        e.preventDefault();
        activeBouton = false ; 
    }else if(myRegex1.test(document.getElementById("lastName").value)==false){
        let myError =document.getElementById('lastNameErrorMsg');
        myError.innerHTML ="le nom doit comporter des lettres et des tirets uniquement. ";
        myError.style.color = 'black';
        e.preventDefault();
        activeBouton = false ; 
    };
    // verification de email
    if (document.getElementById("email").value.trim()==""){
        let myError = document.getElementById('emailErrorMsg');
        myError.innerHTML="le champ email est requis. ";
        myError.style.color = 'black';
        e.preventDefault();
        activeBouton = false ; 
    }else if(myRegex2.test(document.getElementById("email").value)==false){
        let myError =document.getElementById('emailErrorMsg');
        myError.innerHTML ="l'adresse mail est invalide. ";
        myError.style.color = 'black';
        e.preventDefault();
        activeBouton = false ; 
    };
    //préparation d'un tableau des Id des produits du panier
    let products = [];
    for (let i=0; i< produits.length; i++){
        products.push(produits[i].id);
    }
    // préparation de l'objet contact du formulaire
    let contact = {};
    contact.firstName= document.getElementById("firstName").value;
    contact.lastName= document.getElementById("lastName").value;
    contact.address= document.getElementById("address").value;
    contact.city = document.getElementById("city").value;
    contact.email = document.getElementById("email").value;
    //les inf à envoyer à l'api taleau et contact
    let Aenvoyer = {
        products, contact
    }
    // si les champs sont bien formaté on peut envoyer à l'api 
    if(activeBouton == true){
        let options =  fetch(Url +"/order",{
                method: "POST",
                body: JSON.stringify(Aenvoyer),
                headers: {
                    "Accept": "application/json",
                    "Content-Type" : "application/json"
                }
            });
            options.then(async(response)=>{
                try{
                    const contenue = await response.json();
                    console.log(contenue)
                    //Si la réponse du serveur est OK
                    if (response.ok){
                    let orderId = contenue.orderId ;
                    console.log(orderId);
                    // ouvrir la page de confirmation on passant dans l'url l'Id de la commande
                    window.location.href = "./confirmation.html?orderid=" + orderId ;
                    
                    }
                }
                catch(e){
                    //On demande l'erreur dans la console
                    console.log(e);
                }
            }) 
        }  
    

};
const form1 = document.getElementsByClassName("cart__order__form")
form1[0].addEventListener("submit", send);