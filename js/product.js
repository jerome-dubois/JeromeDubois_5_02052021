const url_product_id = new URLSearchParams(window.location.search);

const _id = url_product_id.get("id");

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

  options.forEach(function(option,key) {

    structureCard += `
    <option value="${key}">${option}</option>        
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

    const product_selected_by_id = data.find((product) => product._id === _id);

    console.log(product_selected_by_id);

    insertSelectedCard(product_selected_by_id);

    let productForm = document.querySelector("#product-option");

    console.log(productForm);

    let btn_shoppingCart = document.querySelector("#validationButton");

    console.log(btn_shoppingCart);

    // btn_shoppingCart.addEventListener("click", ()=> );
            
  })
  .catch(function(error) {
     console.log(error);
  });

}

url_array.forEach(element => fetch_search_product(element));

