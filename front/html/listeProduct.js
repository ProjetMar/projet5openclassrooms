let items = document.getElementById('items');
let Url = "http://localhost:3000/api/products";

fetch(Url)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log("list of all products : ");
        console.log(value);
        for (let i=0; i < value.length; i++){
            items.innerHTML += "<a href=./product.html?id=" + value[i]._id + "><article><img src='" + value[i].imageUrl + "'" + "alt=" +'" '+  value[i].altTxt +'"' + "><h3>"
                                + value[i].name + "</h3><p>" + value[i].description + "</p></article></a>";
        }
    })
    .catch(function(err) {
        console.log("Ereeur lors de la récupération de la liste de produits ");
        console.log(err);
    });