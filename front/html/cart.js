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

    

