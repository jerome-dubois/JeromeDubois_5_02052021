var url_product_id = new URLSearchParams(window.location.search);

var _id = url_product_id.get("id");

function insertSelectedCard (product_selected_by_id) {

  let structureCard = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
    <div class="card-body">
      <h5 class="card-title">Product Name : <span>${product_selected_by_id.name}</span></h5>
      <p class="card-text">Price : <span>${product_selected_by_id.price}</span></p>
      <p class="card-text">Description : <span>${product_selected_by_id.description}</span></p>
      <form>
        <label for="product-option">Choose a option:</label>
            <select class="form-select" name="product-option" id="product-option" aria-label="Furniture options selected">
              <option selected>Open this select menu</option>
    `;

  let options = [];

  if (product_selected_by_id.colors !== undefined) {
      options = product_selected_by_id.colors;
  } else if (product_selected_by_id.lenses !== undefined) {
      options = product_selected_by_id.lenses;
  } else if (product_selected_by_id.varnish !== undefined) {
    options = product_selected_by_id.varnish;
  }

  console.log(options);

  options.forEach(function(option) {

    structureCard += `
    <option value="${option}">${option}</option>        
    `;
  });

  structureCard += `
    </select>
    </form>
    <button id="validationButton" class="btn btn-primary" type="submit" name="validationButton">Ajouter l'article au panier</button>
    </div>
    `;

  document.querySelector(".card").innerHTML = structureCard; 
}

// product search with fetch promise on url API
function fetch_search_product (url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   

    let product_selected_by_id = data.find((product) => product._id === _id);

    insertSelectedCard(product_selected_by_id);

    let btn_shoppingCart = document.querySelector("#validationButton");
    console.log(btn_shoppingCart);

    btn_shoppingCart.addEventListener("click", (event)=>{
      event.preventDefault();
      
      let optionSelectedByForm = document.querySelector("#product-option").value;
      console.log(optionSelectedByForm);

      let productQuantity = 1 ;
           
      let selectedProduct = {
        selectedProductId : product_selected_by_id._id,
        selectedProductOption : optionSelectedByForm,
        selectedProductQuantity : productQuantity,
      };
      
      // déclaration des objets correspondants aux 3 clés du Local Storage "teddies", "cameras" et "furniture"

      var teddiesInLocalStorage = JSON.parse(localStorage.getItem("teddies"));
      var camerasInLocalStorage = JSON.parse(localStorage.getItem("cameras"));
      var furnitureInLocalStorage = JSON.parse(localStorage.getItem("furniture"));

      // lorsque les clés existent, on recherche parmi les valeurs celle correspondant au produit sélectionné

      if (teddiesInLocalStorage != undefined) {
        var teddyFoundInStorage = teddiesInLocalStorage.find((product) => product.selectedProductId === _id && product.selectedProductOption == optionSelectedByForm);
      }
      
      if (camerasInLocalStorage != undefined) {
        var cameraFoundInStorage = camerasInLocalStorage.find((product) => product.selectedProductId === _id && product.selectedProductOption == optionSelectedByForm);
      }

      if (furnitureInLocalStorage != undefined) {
        var furnitureFoundInStorage = furnitureInLocalStorage.find((product) => product.selectedProductId === _id && product.selectedProductOption == optionSelectedByForm);
      }  

      // ensuite, on teste à chaque passage successif sur les 3 API, lorsque que le 
      // produit sélectionné dans la page produit est trouvé dans l'API interrogée, 3 cas différents suivants:
      // 1. si la clé correspondante à l'API testée n'existe pas, on la crée et on y insére le produit,
      // 2. si la clé existe mais que le produit n'apparaît pas dans les valeurs de cette clé, on y insère simplement le produit,
      // 3. enfin, si la clé existe et que le produit apparaît dans cette clé, on incrémente sa quantité de 1.

      switch (url) {
        case url_teddies :
          if (teddiesInLocalStorage == undefined) {
            let teddies = [];
            teddies.push(selectedProduct);
            localStorage.setItem("teddies", JSON.stringify(teddies));
          } else if (teddiesInLocalStorage != undefined && teddyFoundInStorage == undefined) {
            teddiesInLocalStorage.push(selectedProduct);
            localStorage.setItem("teddies", JSON.stringify(teddiesInLocalStorage));
          } else if (teddiesInLocalStorage !== undefined && teddyFoundInStorage !== undefined) {
            teddyFoundInStorage.selectedProductQuantity++;
            localStorage.setItem("teddies", JSON.stringify(teddiesInLocalStorage));
          }
          break;
        case url_cameras :
          if (camerasInLocalStorage == undefined) {
            let cameras = [];
            cameras.push(selectedProduct);
            localStorage.setItem("cameras", JSON.stringify(cameras));
          } else if (camerasInLocalStorage != undefined && cameraFoundInStorage == undefined) {
            camerasInLocalStorage.push(selectedProduct);
            localStorage.setItem("cameras", JSON.stringify(camerasInLocalStorage));
          } else if (camerasInLocalStorage !== undefined && cameraFoundInStorage !== undefined) {
            cameraFoundInStorage.selectedProductQuantity++;
            localStorage.setItem("cameras", JSON.stringify(camerasInLocalStorage));
          }
          break;
        case url_furniture :
          if (furnitureInLocalStorage == undefined) {
            let furniture = [];
            furniture.push(selectedProduct);
            localStorage.setItem("furniture", JSON.stringify(furniture));
          } else if (furnitureInLocalStorage != undefined && furnitureFoundInStorage == undefined) {
            furnitureInLocalStorage.push(selectedProduct);
            localStorage.setItem("furniture", JSON.stringify(furnitureInLocalStorage));
          } if (furnitureInLocalStorage !== undefined && furnitureFoundInStorage !== undefined) {
            furnitureFoundInStorage.selectedProductQuantity++;
            localStorage.setItem("furniture", JSON.stringify(furnitureInLocalStorage));
          }
          break;
          default:
            console.log(`Error`);
      } 

    });
            
  })
  .catch(function(error) {
     console.log(error);
  });

};

// url_array.forEach(element => fetch_search_product(element));

fetch_search_product(url_array[0]);