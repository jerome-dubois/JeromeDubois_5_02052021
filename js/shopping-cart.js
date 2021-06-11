var url_teddies = 'http://localhost:3000/api/teddies';
var url_cameras = 'http://localhost:3000/api/cameras';
var url_furniture = 'http://localhost:3000/api/furniture';

var url_array = [url_teddies, url_cameras, url_furniture];

var priceProducts = [];

if (localStorage.getItem("teddies") != undefined) {
    var teddiesInLocalStorage = JSON.parse(localStorage.getItem("teddies"));
}

console.log("key teddies json");
console.log(localStorage.getItem("teddies"));

console.log(teddiesInLocalStorage);
var productsInLocalStorage = teddiesInLocalStorage;

// url_array.forEach(element => insert_products_in_shopping_cart(element));

insert_products_in_shopping_cart(url_array[0]);

function insert_products_in_shopping_cart (url) {

    // return new Promise((resolve) => {         
        
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
                        console.log(priceProducts.length);                
                    }

                    if (i == (productsInLocalStorage.length-1)) {

                        console.log(priceProducts.length);
                        var sum = 0;    
                        for (let i = 0 ; i < priceProducts.length ; i++) {
                            sum += priceProducts[i];    
                        }  
                        
                        console.log("sum");
                        console.log(sum);
                            
                        // localStorage.setItem("orderTotalPrice", JSON.stringify(sum));
                        localStorage.setItem("orderTotalPrice", sum);

                        let totalPriceShoppingCart = `        
                            <div class="card-body">            
                                <p class="card-text">Prix total du panier : <span>${sum}</span></p>
                            </div>
                            `;
                                        
                        document.querySelector(".card").insertAdjacentHTML("beforeend", totalPriceShoppingCart);

                    }
                                    
                }       
                
            }
        
        })
        // .then()
        .catch(function(error) {
        console.log(error);
        });

        // resolve('resolved');            

    // });    
      
}

// async function totalPriceCalculation() {
    
//     await insert_products_in_shopping_cart(url_array[0]);

//     var sum = 0;    
//     for (let i = 0 ; i < priceProducts.length ; i++) {
        
//         sum += priceProducts[i];
//         console.log(sum);

//         var totalPriceShoppingCart = `        
//             <div class="card-body">            
//                 <p class="card-text">Prix total du panier : <span>${sum}</span></p>
//             </div>
//             `;
                        
//         document.querySelector(".card").insertAdjacentHTML("beforeend", totalPriceShoppingCart);

//         console.log(totalPriceShoppingCart);

//     }  
      
// }

// totalPriceCalculation();

// setTimeout(function totalPriceCalculation() {
             
//     console.log(priceProducts.length);
//     var sum = 0;    
//     for (let i = 0 ; i < priceProducts.length ; i++) {
//         sum += priceProducts[i];    
//     }  
    
//     console.log("sum");
//     console.log(sum);
        
//     // localStorage.setItem("orderTotalPrice", JSON.stringify(sum));
//     localStorage.setItem("orderTotalPrice", sum);

//     let totalPriceShoppingCart = `        
//         <div class="card-body">            
//             <p class="card-text">Prix total du panier : <span>${sum}</span></p>
//         </div>
//         `;
                    
//     document.querySelector(".card").insertAdjacentHTML("beforeend", totalPriceShoppingCart);    
    
// }, 1000);

// function resolveAfter1Second() {
//     return new Promise(resolve => {

//         setTimeout(() => {

//             console.log(priceProducts.length);
//             var sum = 0;    
//             for (let i = 0 ; i < priceProducts.length ; i++) {
//                 sum += priceProducts[i];    
//             }  
            
//             // console.log("sum");
//             // console.log(sum);
        
//             let totalPriceShoppingCart = `        
//                 <div class="card-body">            
//                     <p class="card-text">Prix total du panier : <span>${sum}</span></p>
//                 </div>
//                 `;
                            
//             document.querySelector(".card").insertAdjacentHTML("beforeend", totalPriceShoppingCart);

//             resolve();

//         }, 1000);

//         // console.log("sum");
//         // console.log(sum);

//         return sum;
    
//     });

// }
  
// async function f1() {
//     var x = await resolveAfter1Second();
//     console.log(x); // 10
// }

// f1();


var btnOrderConfirmation = document.getElementById("btnOrderConfirmation");

btnOrderConfirmation.addEventListener("click", (e) => {
    
    e.preventDefault();

    // var sum = localStorage.getItem("orderTotalPrice");

    var contact = {    
        firstName: document.getElementById("inputFirstName").value,
        lastName: document.getElementById("inputLastName").value,
        address: document.getElementById("inputAddress").value,
        city: document.getElementById("inputCity").value,
        email: document.getElementById("inputEmail").value
    }

    localStorage.setItem("contact", JSON.stringify(contact));

    var products = [];

    teddiesInLocalStorage.forEach(element => products.push(element.selectedProductId));
    console.log(products);

    var databackEnd = {
        contact : contact,
        products : products, 
    }

    console.log(databackEnd);
       
    fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    body: JSON.stringify(databackEnd),
    headers : {"Content-type" : "application/json"},    
    })    
    .then(response => response.json())
    .then(function(data) {                
        
        window.location.href = `order-confirmation.html?orderId=${data.orderId}&orderTotalPrice=${sum/100}`;
                       
    })
    .then(localStorage.removeItem("teddies"))
    .then(localStorage.removeItem("orderTotalPrice"))
    .catch((error) => {
      alert(error)
    });       

    // document.getElementById("formOrderConfirmation").submit();
            
});

// Input Form validity of contact properties

validateInputForm(document.getElementById("inputFirstName"), (event) => event.target.value.length > 0);
validateInputForm(document.getElementById("inputLastName"), (event) => event.target.value.length > 0);
validateInputForm(document.getElementById("inputZipCode"), (event) => {

    const zipcodeRegex = /^[0-9]{5}$/
    return zipcodeRegex.test(event.target.value)

});
validateInputForm(document.getElementById("inputEmail"), (event) => {

    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/
    return emailRegex.test(event.target.value)    

});

const emailtest = ".dubois@gmail.com";
const resultat = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/.test(emailtest);
console.log(resultat);

validateInputForm(document.getElementById("inputCity"), (event) => event.target.value.length > 0);

// Function which validate input forms

function validateInputForm (element, conditionWithFunctionOnEvent) {

    // Focus on input : if the condition is applied, the input is validated

    element.oninput = (event) => {

        if (conditionWithFunctionOnEvent(event)) {

            inputFormValidated(event.target)

        }

    }

    // Input out of focus: if the condition is not applied, the input is unvalidated

    element.onblur = (event) => {

        if (!conditionWithFunctionOnEvent(event)) {

            inputFormUnvalidated(event.target)

        }

    }   
    
}

// Style for validated input form

function inputFormValidated (element) {

    element.style.border = 'solid 2px green'
}

// Style for unvalidated input form

function inputFormUnvalidated (element) {

    element.style.border = 'solid 2px red'

}