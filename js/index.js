var url_teddies = 'http://localhost:3000/api/teddies';
var url_cameras = 'http://localhost:3000/api/cameras';
var url_furniture = 'http://localhost:3000/api/furniture';

var url_array = [url_teddies, url_cameras, url_furniture];

// url_array.forEach(element => fetch_insertCards(element));
insertProducts(url_array[0]);

// products display on index.html with fetch promise on url API
function insertProducts(url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   
       
    data.forEach(element => insertProduct(element._id, element.name, element.price, element.imageUrl));
    
    return true;
  })

  .catch(function(error) {
     console.log(error);
  });

}

function insertProduct (_id, name, price, imageUrl) {

  const structureCard = `
  <div class="col-12 col-md-6 col-xl-4">
    <a class="card product-card p-4" href="product.html?id=${_id}">                  
      <img src="${imageUrl}" class="d-block w-100 imgcover product-card__img" alt="${name}">
      <div class="product-card__description mt-2">
          <div class="product-card__heading">
            <h5 class="card-title"><span>${name}</span></h5>                
          </div>
          <div>
            <p class="card-text product-card__price"><span>${price/100}.00 €</span></p>
          </div>
      </div>
    </a>
  </div> 
  `;

  document.querySelector(".products__list").innerHTML += structureCard;

  return true;
    
}