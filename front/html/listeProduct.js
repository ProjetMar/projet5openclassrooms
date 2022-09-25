fetch("http://localhost:3000/api/products")
      .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      })
      .then(function(value) {
        /*document
        .getElementById("items")
        .innerText = value[1].name;*/
    
        for (let i=0; i < value.length; i++){
          const lien = document.createElement("a");
          document.getElementById("items").append(lien);
          var liens = document.querySelectorAll("#items a");
          const article = document.createElement("article") ;
          liens[i].appendChild(article);
          
          liens[i].setAttribute("href", "./product.html?" + value[i]._id);
          const image =document.createElement("img");
          const titre =document.createElement("h3");
          const description =document.createElement("p");
          var articles = document.querySelectorAll("#items article");
          articles[i].appendChild(image);
          articles[i].appendChild(titre);
          articles[i].appendChild(description);
         
          image.setAttribute("src" , value[i].imageUrl);
          image.setAttribute("alt", value[i].altTxt);

          titre.innerText=value[i].name;

          description.innerText=value[i].description;
          /*article.innerText =value[i].name;*/
        }
       console.log(value);
      

      })
      .catch(function(err) {
      // Une erreur est survenue
      });