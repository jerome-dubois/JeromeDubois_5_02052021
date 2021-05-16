const url_product_id = new URLSearchParams(window.location.search);

const _id = url_product_id.get("id");

// const options = [colors, lenses, varnish];

// function insertSelectedCard (product_selected_by_id, option_name) {

//   const structureCard = `
//     <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
//     <div class="card-body">
//       <h5 class="card-title">Product Name : <span>${product_selected_by_id.name}</span></h5>
//       <p class="card-text">Price : <span>${product_selected_by_id.price}</span></p>
//       <p class="card-text">Description : <span>${product_selected_by_id.description}</span></p>
//       <label for="option-select">Choose a option:</label>
//         <select class="form-select" aria-label="Product options select">
//           <option selected>Open this select menu</option>
//           <option value="1">${product_selected_by_id.option_name[0]}</option>
//           <option value="2">${product_selected_by_id.option_name[1]}</option>
//           <option value="3">${product_selected_by_id.option_name[2]}</option>
//         </select>>
//     </div>
//   `;

//   document.querySelector(".card").innerHTML = structureCard;
  
// }

function insertSelectedTeddyCard (product_selected_by_id) {

  const structureCard = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
    <div class="card-body">
      <h5 class="card-title">Product Name : <span>${product_selected_by_id.name}</span></h5>
      <p class="card-text">Price : <span>${product_selected_by_id.price}</span></p>
      <p class="card-text">Description : <span>${product_selected_by_id.description}</span></p>
      <label for="option-select">Choose a option:</label>
        <select class="form-select" aria-label="Product options select">
          <option selected>Open this select menu</option>
          <option value="1">${product_selected_by_id.colors[0]}</option>
          <option value="2">${product_selected_by_id.colors[1]}</option>
          <option value="3">${product_selected_by_id.colors[2]}</option>
        </select>>
    </div>
  `;

  document.querySelector(".card").innerHTML = structureCard;
  
}

function insertSelectedCameraCard (product_selected_by_id) {

  const structureCard = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
    <div class="card-body">
      <h5 class="card-title">Product Name : <span>${product_selected_by_id.name}</span></h5>
      <p class="card-text">Price : <span>${product_selected_by_id.price}</span></p>
      <p class="card-text">Description : <span>${product_selected_by_id.description}</span></p>
      <label for="option-select">Choose a option:</label>
        <select class="form-select" aria-label="Product options select">
          <option selected>Open this select menu</option>
          <option value="1">${product_selected_by_id.lenses[0]}</option>
          <option value="2">${product_selected_by_id.lenses[1]}</option>
          <option value="3">${product_selected_by_id.lenses[2]}</option>
        </select>>
    </div>
  `;

  document.querySelector(".card").innerHTML = structureCard;
  
}

function insertSelectedFurnitureCard (product_selected_by_id) {

  const structureCard = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
    <div class="card-body">
      <h5 class="card-title">Product Name : <span>${product_selected_by_id.name}</span></h5>
      <p class="card-text">Price : <span>${product_selected_by_id.price}</span></p>
      <p class="card-text">Description : <span>${product_selected_by_id.description}</span></p>
      <label for="option-select">Choose a option:</label>
        <select class="form-select" aria-label="Product options select">
          <option selected>Open this select menu</option>
          <option value="1">${product_selected_by_id.varnish[0]}</option>
          <option value="2">${product_selected_by_id.varnish[1]}</option>
          <option value="3">${product_selected_by_id.varnish[2]}</option>
        </select>>
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

    switch (url) {
      case url_teddies : insertSelectedTeddyCard(product_selected_by_id);
      break;
      case url_cameras : insertSelectedCameraCard(product_selected_by_id);
      break;
      case url_furniture : insertSelectedFurnitureCard(product_selected_by_id);
      break;
      default:
        console.log(`Error`);
    }

    // insertSelectedCard(product_selected_by_id);
       
  })
  .catch(function(error) {
     console.log(error);
  });

}

url_array.forEach(element => fetch_search_product(element));