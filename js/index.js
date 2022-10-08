// declaration of variables corresponding to the url provided by the API

//var url_teddies = 'http://localhost:3000/api/teddies';
//var url_cameras = 'http://localhost:3000/api/cameras';
//var url_furniture = 'http://localhost:3000/api/furniture';

let apiUrl =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://mvp-site-ecommerce-orinoco.herokuapp.com'

var url_teddies = '${apiUrl}/api/teddies';
var url_cameras = 'https://mvp-site-ecommerce-orinoco.herokuapp.com/api/cameras';
var url_furniture = '${apiUrl}/api/furniture';

var url_array = [url_teddies, url_cameras, url_furniture];

insertProducts(url_array[1]);

// this function calls the insertProduct function to retrieve each product in the API url with a fecth request
function insertProducts(url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   
       
    data.forEach(element => insertProduct(element._id, element.name, element.price, element.description, element.imageUrl));     

  })
  .then(function() {

    const slidesCarousel = document.getElementById('slides-carousel');

    console.log(slidesCarousel);

    slidesCarousel.firstElementChild.classList.add("active");

  }) 
  .catch(function(error) {
     console.log(error);
  });

}

// This function displays a product in the index.html page in the form of a carousel and a card from its attributes defined by the API.
function insertProduct (_id, name, price, description, imageUrl) {
  
  const slideCarousel = `
    <div class="carousel-item carousel-parent">
      <a href="product.html?id=${_id}">            
        <img class="d-block w-100 imgcover" src="${imageUrl}" />                        
        <div class="overlay"></div>                      
        <div class="search">
          <h1>Get the camera that suits you</h1>
          <p>Discover our cameras, selected by us.</p>
          <a href="#our-cameras">
            <button type="submit" class="main-btn">Our cameras</button>
          </a>
        </div>
        <div class="carousel-caption carousel-caption-bottom-0 d-none d-md-block">        
          <h5>${name}</h5>
          <p>${description}</p>
        </div>
      </a>
    </div> 
  `;

  // document.getElementsByClassName("carousel-inner").innerHTML += slideCarousel;
  document.getElementById("slides-carousel").innerHTML += slideCarousel;  

  const structureCard = `
    <div class="card px-5 pb-5">      
      <a href="product.html?id=${_id}">  
        <div class="shadow zoom">
          <img src="${imageUrl}" class="d-block w-100 imgcover product-card__img" alt="${name}">
          <div class="card-body">
            <div class="product-card__description">
              <h5 class="card-title product-card__heading"><span>${name}</span></h5>
              <p class="card-text product-card__price"><span>${price/100}.00 €</span></p>
            </div>
            <p>${description}</p>
          </div>
        </div>
      </a>
    </div>   
    `;

  document.getElementById("products-list").innerHTML += structureCard;

  return true;
    
}
