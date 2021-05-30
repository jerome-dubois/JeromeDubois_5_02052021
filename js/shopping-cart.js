var priceProducts = [];
var teddiesInLocalStorage = JSON.parse(localStorage.getItem("teddies"));
console.log(teddiesInLocalStorage);
var productsInLocalStorage = teddiesInLocalStorage;

function insert_products_in_shopping_cart (url) {

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {     
         
        if (productsInLocalStorage != undefined) {

            for (let i = 0 ; i < productsInLocalStorage.length ; i++) {
                
                productFoundInApiById = data.find((product) => product._id === productsInLocalStorage[i].selectedProductId);
                               
                if (productFoundInApiById != undefined) {

                    let shoppingCartCard = `
                    <img src="${productFoundInApiById.imageUrl}" class="d-block w-100" alt="${productFoundInApiById.name}" />
                    <div class="card-body">
                        <p class="card-text">Name : <span>${productFoundInApiById.name}</span></p>
                        <p class="card-text">Option : <span>${productsInLocalStorage[i].selectedProductOption}</span></p>
                        <p class="card-text">Quantité : <span>${productsInLocalStorage[i].selectedProductQuantity}</span></p>
                        <p class="card-text">Description : <span>${productFoundInApiById.description}</span></p>
                        <p class="card-text">Price : <span>${productFoundInApiById.price}</span></p>
                    </div>
                `;
                    
                    document.querySelector(".card").innerHTML += shoppingCartCard;
                    priceProducts.push(productFoundInApiById.price);
                    console.log(priceProducts);                   
                }
                                   
            }       
            
        }
    
    })
    .catch(function(error) {
       console.log(error);
    });
  
}
  
// url_array.forEach(element => insert_products_in_shopping_cart(element));

insert_products_in_shopping_cart(url_array[0]);

setTimeout(function() {
    console.log(priceProducts.length);
    var sum = 0;    
    for (let i = 0 ; i < priceProducts.length ; i++) {
        sum += priceProducts[i];    
    }
    
    console.log(sum);

    let totalPriceShoppingCart = `        
        <div class="card-body">            
            <p class="card-text">Prix total du panier : <span>${sum}</span></p>
        </div>
        `;
                    
    document.querySelector(".card").insertAdjacentHTML("beforeend", totalPriceShoppingCart);

}, 1000);


var btnOrderConfirmation = document.querySelector("#btnOrderConfirmation");

btnOrderConfirmation.addEventListener("click", () => {

    var contact = {    
        firstName: document.querySelector("#inputFirstName").value,
        lastName: document.querySelector("#inputLastName").value,
        address: document.querySelector("#inputAddress").value,
        city: document.querySelector("#inputCity").value,
        email: document.querySelector("#inputEmail").value
    }

    localStorage.setItem("contact", JSON.stringify(contact));
    
    var databackEnd = {
        contact,
        teddiesInLocalStorage
    }

    var promise1 = fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        body: JSON.stringify(databackEnd),
        headers : {
            "Content-Type" : "application/json",
        },
    });
    
    console.log(teddiesInLocalStorage);
    console.log(promise1);      

});

