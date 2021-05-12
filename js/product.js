const url_product_id = new URLSearchParams(window.location.search);

const _id = url_product_id.get("id")

function insertSelectedCard (product_selected_by_id) {

  const structureCard = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
    <div class="card-body">
      <h5 class="card-title">Product Name : <span>${product_selected_by_id.name}</span></h5>
      <p class="card-text">Price : <span>${product_selected_by_id.price} €</span></p>
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
       
  })
  .catch(function(error) {
     console.log(error);
  });

}

url_array.forEach(element => fetch_search_product(element));