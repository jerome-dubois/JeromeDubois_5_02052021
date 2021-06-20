var url_teddies = 'http://localhost:3000/api/teddies';
var url_cameras = 'http://localhost:3000/api/cameras';
var url_furniture = 'http://localhost:3000/api/furniture';

var url_array = [url_teddies, url_cameras, url_furniture];

var priceProducts = [];
var tbody = document.createElement('tbody');
var cartItemsWrapper = document.getElementById('cartItems');

var productsInLocalStorage = JSON.parse(localStorage.getItem("cameras"));

// if (localStorage.getItem("cameras") != undefined) {
//     var productsInLocalStorage = JSON.parse(localStorage.getItem("cameras"));
// }

// url_array.forEach(element => insert_products_in_shopping_cart(element));

insert_products_in_shopping_cart(url_array[1]);

// This function displays products from the selection in the localstorage
function insert_products_in_shopping_cart (url) {             
    
    emptyCart(cartItemsWrapper);

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {     
        
        return new Promise((resolve, reject) => {
            
            if (productsInLocalStorage != undefined) {

                let thead = document.createElement('thead');

                thead.innerHTML = `
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Lense</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                `;

                tbody.innerHTML = `
                    <tbody>
                    </tbody>
                `;

                for (let i = 0 ; i < productsInLocalStorage.length ; i++) {
                    
                    // Search selected product in api url from id in localstorage

                    productFoundInApiById = data.find((product) => product._id === productsInLocalStorage[i].
                    
                    selectedProductId);

                    let cartItemsWrapper = document.getElementById('cartItems');
                    
                    // If Id is found in the API url, creates table with products in localstorage
                    if (productFoundInApiById != undefined) {
                        
                        // declaration of table tags                    
                        
                        let tr = document.createElement('tr');

                        let rowItemName = document.createElement('td');
                        let lenseCell = document.createElement('td');
                        let priceCell = document.createElement('td');
                        let quantity = document.createElement('td');
                        let totalPriceCell = document.createElement('td');
                        let btnRemove = document.createElement('td');

                        let imgCell = document.createElement('img');
                        let nameCell = document.createElement('p');

                        // display each table tags with values in localstorage                        

                        nameCell.innerHTML = productFoundInApiById.name;
                        lenseCell.innerHTML = productsInLocalStorage[i].selectedProductOption;
                        priceCell.innerHTML = (productFoundInApiById.price/100) + ' €';
                        totalPriceCell.innerHTML = (productFoundInApiById.price/100 * productsInLocalStorage[i].selectedProductQuantity) + ' €';
                        imgCell.setAttribute('src', productFoundInApiById.imageUrl);

                        btnRemove.innerHTML = `<button class="btn-del" id='remove' onclick='removeItem(${i})'>X</button>`;
                        quantity.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" max="10" value ="${productsInLocalStorage[i].selectedProductQuantity}" class="quantity" onclick="changeQuantity(${i}, event.target.value)">`;

                        rowItemName.append(imgCell, nameCell);
                        rowItemName.classList.add('rowImage');

                        cartItemsWrapper.append(thead,tbody);
                        tr.append(rowItemName, lenseCell, priceCell, quantity, totalPriceCell, btnRemove);
                        tbody.appendChild(tr);
                    
                        priceProducts.push(productFoundInApiById.price); 
                    }
    
                    if (i == (productsInLocalStorage.length-1)) {
                            
                        resolve("resolved");
    
                    }
                                    
                }       
                
            }

        });  
            
    })
    .then((value) => {
        
        if (value !== undefined) {
            insertTotalPriceShoppingCart()
        }
        })
    .catch(function(error) {
    console.log(error);
    });    
      
}

// change product quantity 
function changeQuantity(index, value) {

    productsInLocalStorage[index].selectedProductQuantity = parseInt(value);
    localStorage.setItem('cameras', JSON.stringify(productsInLocalStorage));

    // Re-render....
    insert_products_in_shopping_cart(url_array[1]);    
    
}

// Remove item from cart and update localStorage data
function removeItem(index) {
    
    productsInLocalStorage.splice(index, 1);
    localStorage.setItem('cameras', JSON.stringify(productsInLocalStorage));

    // Re-render....
    insert_products_in_shopping_cart(url_array[1]);
  }

// This function calculates the total price of the shopping cart from the array priceProducts generated by insert_products_in_shopping_cart function and then display this total price in the shopping cart
function insertTotalPriceShoppingCart() {

    // console.log(priceProducts.length);    

    var sum = 0;

    for (let i = 0 ; i < priceProducts.length ; i++) {
        sum += priceProducts[i];    
    }  
            
    // localStorage.setItem("orderTotalPrice", JSON.stringify(sum));
    localStorage.setItem("orderTotalPrice", sum/100);

    let tr = document.createElement('tr');
    let totalShoppingCartName = document.createElement('td');
    totalShoppingCartName.setAttribute("colspan", 4);
    totalShoppingCartName.classList.add("text-center");

    let totalShoppingCartPrice = document.createElement('td');
    totalShoppingCartPrice.setAttribute("colspan", 2);


    totalShoppingCartName.innerHTML = 'Total';
    totalShoppingCartPrice.innerHTML = sum/100 + ' €';

    tr.append(totalShoppingCartName, totalShoppingCartPrice);
    tr.style.fontWeight = "bold";   
    tbody.appendChild(tr);

}

function emptyCart(cartItemsWrapper) {
    // Empty current cart table items
    console.log("cartItemsWrapper");
    console.log(cartItemsWrapper);

    cartItemsWrapper.innerHTML = '';    

    // Show empty cart page if no products exist
    let container = document.getElementById('container');
    // let cartArray = [];
    
    console.log(productsInLocalStorage);
    if (productsInLocalStorage === null) 
    // {
    //   cartArray = [];
    // } else {
    //   cartArray = JSON.parse(productsInLocalStorage);
    // }
  
    // if (cartArray.length === 0 || productsInLocalStorage === null) 
    {
      container.innerHTML = `<div class="emptyCart">
        <div class="emptyCart-img">
        <img src="images/emptyCart.png" alt="empty cart">
        </div>
        <div>
            <h1>Hey, it feels so light!</h1>
            <p>There is nothing in your Cart. let's add some items.</p>
            <button><a href="index.html">Start Shopping</a></button>
        </div>
        </div>`
    }
}

if (productsInLocalStorage != undefined ) {
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

}