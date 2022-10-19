produits = JSON.parse(localStorage.produit);
let cart = document.getElementById('cart__items');
let totalAmount = 0; 
let totalNumberItems = 0;


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

                    cart.innerHTML += "<article class= \"cart__item\" data-id=" + produits[i].id + " data-color =" + produits[i].colorSelect + "> <div class=\"cart__item__img\"><img src='" + value[j].imageUrl + "'alt=" +'"' + value[i].altTxt +'"' + "></div><div class=\"cart__item__content\"><div class=\"cart__item__content__description\"><h2>" + value[j].name + "</h2><p>" + produits[i].colorSelect + "</p><p>"+ value[j].price  + "€</p></div><div class=\"cart__item__content__settings\"><div class=\"cart__item__content__settings__quantity\"><p>Qté : </p><input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=" + produits[i].quantity +"></div><div class=\"cart__item__content__settings__delete\"><p class=\"deleteItem\">Supprimer</p></div></div></div></article>";
                    totalAmount += value[j].price * produits[i].quantity;
                    totalNumberItems += produits[i].quantity;
                    prices.push(value[j].price);
                }
            }

        }
        
        document.getElementById('totalPrice').innerText = totalAmount.toString(); 
        document.getElementById('totalQuantity').innerText = totalNumberItems.toString();

        modifierPanier(quantitysSelect, deletProduitsSelect);
    })

    .catch(function(err) {
      // Une erreur est survenue
    });   

function modifierPanier(){
    for (let i=0; i < quantitysSelect.length ; i++){
        quantitysSelect[i].addEventListener('input', quantityF);      
    }

    for (let i=0; i < deletProduitsSelect.length ; i++){
        deletProduitsSelect[i].addEventListener('click', deleteP);        
    }
 
}

//
function updateTotals(){
    document.getElementById('totalPrice').innerText = totalAmount.toString(); 
    document.getElementById('totalQuantity').innerText = totalNumberItems.toString();
    
    localStorage.setItem("produit", JSON.stringify(produits));
}
function deleteP(e){
    e.stopPropagation();
  
    for (let i=0; i< produits.length ; i++) {
        if (e.target.closest('.cart__item').dataset.id == produits[i].id && e.target.closest('.cart__item').dataset.color == produits[i].colorSelect){
            totalAmount = totalAmount - (produits[i].quantity * prices[i]);
            totalNumberItems = totalNumberItems - produits[i].quantity;
            
            prices.splice(i,1);
            produits.splice(i,1);
            break;
        }
    }
    e.target.closest('.cart__item').remove();
    
    updateTotals();
}

function quantityF(e){
    e.stopPropagation();
    newQuantity = e.target.valueAsNumber; 
    if (newQuantity != undefined){
             
        for (let i=0; i< produits.length ; i++) {
            if (e.target.closest('.cart__item').dataset.id == produits[i].id && e.target.closest('.cart__item').dataset.color == produits[i].colorSelect){
                totalAmount += (newQuantity - produits[i].quantity) * prices[i];
                totalNumberItems += newQuantity- produits[i].quantity;
                produits[i].quantity = newQuantity;
                break;
            }
        }
        updateTotals();
    }
}

function setElementMsg(elementId, msgText){
    let myError =document.getElementById(elementId);
    myError.innerHTML = msgText;
    myError.style.color = 'black';
    
}

function send (e){
    e.preventDefault();
    let activeBouton = true ; 
    // vérification que le panier est n'est pas vide 
    if (produits.length == 0){
        activeBouton = false ; 
        alert('le panier est vide');
    }
    // verification de firstName
    let patternName = /^[a-zàáâäçèéêëìíîïñòóôöùúûüA-Z-\s]+$/;
    let patternEmail = /^([a-zA-Z0-9_-])+([.]?[a-zA-Z0-9_-]{1,})*@([a-zA-Z0-9-_]{2,}[.])+[a-zA-Z]{2,3}$/;
    if(patternName.test( document.getElementById("firstName").value)==false){
        setElementMsg('firstNameErrorMsg', "le prénom doit comporter des lettres et des tirets uniquement. "); 
        activeBouton = false ; 
    }
    // verification de lastName
    if(patternName.test(document.getElementById("lastName").value)==false){
        setElementMsg('lastNameErrorMsg', "le nom doit comporter des lettres et des tirets uniquement. ");
        activeBouton = false ; 
    }
    // verification de email
    if(patternEmail.test(document.getElementById("email").value)==false){
        setElementMsg('emailErrorMsg', "l'adresse mail est invalide. ");
        activeBouton = false ; 
    }
    
    // si les champs sont bien formatés on peut envoyer à l'api 
    if(activeBouton == true){
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
        
        // envoyer à l'api
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