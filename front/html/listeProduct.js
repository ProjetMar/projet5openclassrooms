let elt = document.getElementById('items');

fetch("http://localhost:3000/api/products")
      .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      })
      .then(function(value) {
       
    
        for (let i=0; i < value.length; i++){

            elt.innerHTML+="<a href=./product.html?id=" + value[i]._id + "><article><img src='" + value[i].imageUrl + "'" + "alt=" +'" '+  value[i].altTxt +'"' + "><h3>"
             + value[i].name + "</h3><p>" + value[i].description + "</p></article></a>"
        
        }

       console.log(value);

      })
      .catch(function(err) {
      // Une erreur est survenue
      });