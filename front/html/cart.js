produits = JSON.parse(localStorage.produit);
let cart = document.getElementById('cart__items');
let priceProduits = 0; 
let quantityProduits = 0;

for ( let i=0; i < produits.length; i++){

    cart.innerHTML += "<article>"

}
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
                }
            }

        }
        document.getElementById('totalPrice').innerText = priceProduits.toString(); 
        document.getElementById('totalQuantity').innerText = quantityProduits.toString();

       console.log(value);

      })
      .catch(function(err) {
      // Une erreur est survenue
      });   

