const url_teddies = 'http://localhost:3000/api/teddies';
const url_cameras = 'http://localhost:3000/api/cameras';
const url_furniture = 'http://localhost:3000/api/furniture';

const url_array = [url_teddies, url_cameras, url_furniture];

function insertCard (_id, name, price, imageUrl) {

    const structureCard = `
    <div class="col-12 col-lg-4">
      <a class="card" href="product.html?id=${_id}">                  
          <img src="${imageUrl}" class="d-block w-100 imgcover" alt="${name}">
          <div class="card-body">
              <h5 class="card-title">Product Name : <span>${name}</span></h5>
              <p class="card-text">Price : <span>${price}</span></p>
          </div>
      </a>
    </div> 
    `;

    document.querySelector(".container-products").innerHTML += structureCard; 
    
}

// products display on index.html with fetch promise on url API
function fetch_insertCards (url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   
       
    data.forEach(element => insertCard(element._id, element.name, element.price, element.imageUrl));
    
  })

  .catch(function(error) {
     console.log(error);
  });

}

url_array.forEach(element => fetch_insertCards(element));