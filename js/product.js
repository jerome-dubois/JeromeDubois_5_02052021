const url_product_id = new URLSearchParams(window.location.search);

const _id = url_product_id.get("id");

function insertSelectedCard (product_selected_by_id) {

  const structureCard = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
    <div class="card-body">
      <h5 class="card-title">Product Name : <span>${product_selected_by_id.name}</span></h5>
      <p class="card-text">Price : <span>${product_selected_by_id.price}</span></p>
      <p class="card-text">Description : <span>${product_selected_by_id.description}</span></p>
      <form>
        <label for="product-option">Choose a option:</label>
            <select class="form-select" name="product-option" id="product-option" aria-label="Furniture options selected">
              <option selected>Open this select menu</option>
            </select>
    </form>
    <button id="validationButton" class="btn btn-primary" type="submit" name="validationButton">Ajouter l'article au panier</button>
    </div>
  `;

  document.querySelector(".card").innerHTML = structureCard; 
}

function insertSelectedTeddyOptionsForm (product_selected_by_id) {

  for (let i = 0; i < product_selected_by_id.colors.length; i++) {

    const structureTeddyOptionsForm = `
    <option value="${i}">${product_selected_by_id.colors[i]}</option>        
  `;

  document.querySelector("#product-option").innerHTML += structureTeddyOptionsForm;

  }
  
}

function insertSelectedCameraOptionsForm (product_selected_by_id) {

  for (let i = 0; i < product_selected_by_id.lenses.length; i++) {

    const structureCameraOptionsForm = `
    <option value="${i}">${product_selected_by_id.lenses[i]}</option>        
  `;

  document.querySelector("#product-option").innerHTML += structureCameraOptionsForm;

  }
  
}

function insertSelectedFurnitureOptionsForm (product_selected_by_id) {

  for (let i = 0; i < product_selected_by_id.varnish.length; i++) {

    const structureFurnitureCameraOptionsForm = `
    <option value="${i}">${product_selected_by_id.varnish[i]}</option>        
  `;

  document.querySelector("#product-option").innerHTML += structureFurnitureCameraOptionsForm;
  // console.log(document.querySelector("#product-option"));

  }
  
}

// product search with fetch promise on url API
function fetch_search_product (url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   

    const product_selected_by_id = data.find((product) => product._id === _id);

    console.log(product_selected_by_id);

    insertSelectedCard(product_selected_by_id);

    switch (url) {
      case url_teddies : insertSelectedTeddyOptionsForm(product_selected_by_id);
      break;
      case url_cameras : insertSelectedCameraOptionsForm(product_selected_by_id);
      break;
      case url_furniture : insertSelectedFurnitureOptionsForm(product_selected_by_id);
      break;
      default:
        console.log(`Error`);
    }

    console.log(document.querySelector("#product-option"));
            
  })
  .catch(function(error) {
     console.log(error);
  });

}

url_array.forEach(element => fetch_search_product(element));
