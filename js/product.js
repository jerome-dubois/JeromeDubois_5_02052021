var url_teddies = 'http://localhost:3000/api/teddies';
var url_cameras = 'http://localhost:3000/api/cameras';
var url_furniture = 'http://localhost:3000/api/furniture';

var url_array = [url_teddies, url_cameras, url_furniture];


// declaration of url_product_id variable equal to url on product.html 
var url_product_id = new URLSearchParams(window.location.search);


// now we returns the value associated with the given search parameter here the product id provided in the call of api url
var _id = url_product_id.get("id");


// call of the function searchProduct on the selected url
searchProduct(url_array[1]);


// This function performs 2 main actions:
// 1 / searches for the selected product from the home page using the id contained in the url (use of the URLSearchParams object) to be able to display the product and all of its attributes on the product page using a query fetch on the API
// 2 / from a selection button to add the product to the cart, create the key corresponding to the type of product then store in the local Storage the attributes differentiating the product, namely its id, its quantity and its option
function searchProduct (url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   

    let product_selected_by_id = data.find((product) => product._id === _id);

    insertSelectedProduct(product_selected_by_id);

    let btn_shoppingCart = document.querySelector("#validationButton");
    console.log(btn_shoppingCart);

    btn_shoppingCart.addEventListener("click", (event)=>{

      event.preventDefault();

      let confirme = document.getElementById('confirmation-feedback');
      confirme.innerHTML = `Added to cart.`;
      confirme.classList.add('confirmation-feedback--visible');
      confirme.hideTimeout = setTimeout(() => {
        confirme.classList.remove('confirmation-feedback--visible');
      }, 3000);
      
      let optionSelectedByForm = document.querySelector("#product-option").value;
      console.log(optionSelectedByForm);

      let productQuantity = 1 ;
           
      let selectedProduct = {
        selectedProductId : product_selected_by_id._id,
        selectedProductOption : optionSelectedByForm,
        selectedProductQuantity : productQuantity,
      };
      
      // declaration of the objects corresponding to the 3 keys of Local Storage "teddies", "cameras" and "furniture"

      if (localStorage.getItem("teddies") != undefined) {
        var teddiesInLocalStorage = JSON.parse(localStorage.getItem("teddies"));
      }

      if (localStorage.getItem("cameras") != undefined) {
        var camerasInLocalStorage = JSON.parse(localStorage.getItem("cameras"));
      }
      
      if (localStorage.getItem("furniture") != undefined) {
        var furnitureInLocalStorage = JSON.parse(localStorage.getItem("furniture"));
      }         

      // when the keys exist, we search among the values that corresponding to the selected product

      if (teddiesInLocalStorage != undefined) {
        var teddyFoundInStorage = teddiesInLocalStorage.find((product) => product.selectedProductId === _id && product.selectedProductOption == optionSelectedByForm);
      }
      
      if (camerasInLocalStorage != undefined) {
        var cameraFoundInStorage = camerasInLocalStorage.find((product) => product.selectedProductId === _id && product.selectedProductOption == optionSelectedByForm);
      }

      if (furnitureInLocalStorage != undefined) {
        var furnitureFoundInStorage = furnitureInLocalStorage.find((product) => product.selectedProductId === _id && product.selectedProductOption == optionSelectedByForm);
      }  

      // then, on each successive run on the 3 APIs, when the product selected in the product page is found in the API queried, 3 different cases are tested:
      // 1. if the key corresponding to the tested API does not exist, we create it and insert the product,
      // 2. if the key exists but the product does not appear in the values of this key, we simply insert the product,
      // 3. finally, if the key exists and the product appears in this key, its quantity is increased by 1.

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


// This function displays the product selected in index.html in the product page product.html from the identifier of the product in question retrieved in the url of the product.html page present as a parameter
function insertSelectedProduct (product_selected_by_id) {

  let productImage = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100 shadow product" alt="${product_selected_by_id.name}" />    
    `;

  let productDescription = `    
    <div class="card-body product product__description py-0">
      <h1 class="card-title"><span>${product_selected_by_id.name}</span></h1>
      <h3 class="card-text"><span>${product_selected_by_id.price/100} €</span></h3>
      <p class="card-text"><span>${product_selected_by_id.description}</span></p>
      <form class="py-3 d-flex">
        <label for="product-option" class="pe-2 align-self-center">Choose a lense:</label>
        <select class="form-select w-50" name="product-option" id="product-option" aria-label="Furniture options selected">
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

    productDescription += `
      <option value="${option}">${option}</option>        
    `;
  });

  productDescription += `
    </select>
    </form>
    <button id="validationButton" class="main-btn product-btn" type="submit" name="validationButton">Add to cart</button>
    <p id="confirmation-feedback" class="confirmation-feedback"></p>
    </div>
  `;

  document.querySelector(".productImage").innerHTML = productImage;

  document.querySelector(".productDescription").innerHTML = productDescription;

}