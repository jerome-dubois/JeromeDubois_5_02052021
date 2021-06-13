var url_teddies = 'http://localhost:3000/api/teddies';
var url_cameras = 'http://localhost:3000/api/cameras';
var url_furniture = 'http://localhost:3000/api/furniture';

var url_array = [url_teddies, url_cameras, url_furniture];

// url_array.forEach(element => fetch_insertCards(element));

insertProducts(url_array[1]);

// products display on index.html with fetch promise on url API
function insertProducts(url) {

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {   
       
    data.forEach(element => insertProduct(element._id, element.name, element.price, element.description, element.imageUrl));     

    // return true;
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

function insertProduct (_id, name, price, description, imageUrl) {

  // const structureCard = `
  //   <div class="col-12 col-md-6 col-xl-4">
  //     <a class="card product-card p-4" href="product.html?id=${_id}">                  
  //       <img src="${imageUrl}" class="d-block w-100 imgcover product-card__img" alt="${name}">
  //       <div class="product-card__description mt-2">
  //           <div class="product-card__heading">
  //             <h5 class="card-title"><span>${name}</span></h5>                
  //           </div>
  //           <div>
  //             <p class="card-text product-card__price"><span>${price/100}.00 €</span></p>
  //           </div>
  //       </div>
  //     </a>
  //   </div> 
  // `;

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