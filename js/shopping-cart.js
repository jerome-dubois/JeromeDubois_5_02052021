var productsInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productsInLocalStorage);

var priceProducts = [];
// console.log(priceProducts);

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
  
url_array.forEach(element => insert_products_in_shopping_cart(element));
console.log (url_array);
// console.log (url_array.length);

// console.log(priceProducts);
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
console.log(btnOrderConfirmation);

btnOrderConfirmation.addEventListener("click", () => {

    let firstNameForm = document.querySelector("#inputFirstName");
    console.log(firstNameForm);
    let firstNameFormValue = document.querySelector("#inputFirstName").value;
    console.log(firstNameFormValue);
    localStorage.setItem("firstName", document.querySelector("#inputFirstName").value);

});

