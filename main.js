const url_teddies = 'http://localhost:3000/api/teddies';
const url_cameras = 'http://localhost:3000/api/cameras';
const url_furniture = 'http://localhost:3000/api/furniture';

const url_array = [url_teddies, url_cameras, url_furniture];

console.log(url_array[0]);

const url_product_id = new URLSearchParams(window.location.search);
// console.log(url_product_id);

const _id = url_product_id.get("id")
// console.log(_id);


function insertCard (product_selected_by_id) {

  const positionCard = document.querySelector(".card");

  const structureCard = `
    <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="${product_selected_by_id.name}" />
    <div class="card-body">
      <h5 class="card-title">${product_selected_by_id.name}</h5>
      <p class="card-text"></p>
    </div>
  `;

  positionCard.innerHTML = structureCard;
  
}

// product search with fetch promise on url API
function fetch_url (url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   

    const product_selected_by_id = data.find((product) => product._id === _id);

    console.log(product_selected_by_id);

    insertCard(product_selected_by_id);
       
  })
  .catch(function(error) {
     console.log(error);
  });

}

url_array.forEach(element => fetch_url(element));