var url_teddies = 'http://localhost:3000/api/teddies';
var url_cameras = 'http://localhost:3000/api/cameras';
var url_furniture = 'http://localhost:3000/api/furniture';

var url_array = [url_teddies, url_cameras, url_furniture];

var priceProducts = [];
var tbody = document.createElement('tbody');
var cartItemsWrapper = document.getElementById('cartItems');

var productsInLocalStorage = JSON.parse(localStorage.getItem("cameras"));

insert_products_in_shopping_cart(url_array[1]);

// This function displays in the cart the products added in the product.html page and stored in the localStorage with its id,quantity and option attributes. The API is called to fill in the missing attributes for full display in the cart. Finally, it calculates and displays the total price of the shopping cart.
function insert_products_in_shopping_cart (url) {             
    
    emptyCart(cartItemsWrapper);
    localStorage.setItem("orderTotalPrice", 0);

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
                
                priceProducts = [];

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
                        totalPriceCell.innerHTML = ((productFoundInApiById.price/100) * productsInLocalStorage[i].selectedProductQuantity) + ' €';
                        imgCell.setAttribute('src', productFoundInApiById.imageUrl);

                        btnRemove.innerHTML = `<button class="btn-del" id='remove' onclick='removeItem(${i})'><img src="./images/outline_remove_shopping_cart_black_18dp.png" alt="remove icon" class="removetIcon"></button>`;
                        quantity.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value ="${productsInLocalStorage[i].selectedProductQuantity}" class="quantity" onclick="changeQuantity(${i}, event.target.value)">`;

                        rowItemName.append(imgCell, nameCell);
                        rowItemName.classList.add('rowImage');

                        cartItemsWrapper.append(thead,tbody);
                        tr.append(rowItemName, lenseCell, priceCell, quantity, totalPriceCell, btnRemove);
                        tbody.appendChild(tr);
                                                
                        priceProducts.push(productFoundInApiById.price/100 * productsInLocalStorage[i].selectedProductQuantity);

                        console.log("priceProducts");
                        console.log(priceProducts);
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

// This function takes 2 parameters as arguments which are the index and the quantity entered in the shopping cart. The quantity is updated in the localStorage via the corresponding index then the shopping cart is generated again.
function changeQuantity(index, value) {

    // var productsInLocalStorage = JSON.parse(localStorage.getItem("cameras"));

    productsInLocalStorage[index].selectedProductQuantity = parseInt(value);
    localStorage.setItem('cameras', JSON.stringify(productsInLocalStorage));

    // Re-render....
    insert_products_in_shopping_cart(url_array[1]);    
    
}

// This function remove item from cart and update localStorage data
function removeItem(index) {
    
    productsInLocalStorage.splice(index, 1);
    localStorage.setItem('cameras', JSON.stringify(productsInLocalStorage));

    // Re-render....
    insert_products_in_shopping_cart(url_array[1]);
}

// This function calculates the total price of the shopping cart from the array priceProducts generated by insert_products_in_shopping_cart function and then display this total price in the shopping cart
function insertTotalPriceShoppingCart() {    

    var sum = 0;
    
    for (let i = 0 ; i < priceProducts.length ; i++) {
        sum += priceProducts[i];    
    }  
                
    localStorage.setItem("orderTotalPrice", sum);

    let tr = document.createElement('tr');
    let totalShoppingCartName = document.createElement('td');
    totalShoppingCartName.setAttribute("colspan", 4);
    totalShoppingCartName.classList.add("text-center");

    let totalShoppingCartPrice = document.createElement('td');
    totalShoppingCartPrice.setAttribute("colspan", 2);

    totalShoppingCartName.innerHTML = 'Total';
    totalShoppingCartPrice.innerHTML = sum + ' €';

    tr.append(totalShoppingCartName, totalShoppingCartPrice);
    tr.style.fontWeight = "bold";   
    tbody.appendChild(tr);

}


// This function removes the cart from the shopping-cart.html page and then displays a message indicating that the cart is empty in this same page if the localStorage is empty. This function is automatically called when the basket is generated with its products via the insert_products_in_shopping_cart function.
function emptyCart(cartItemsWrapper) {
    
    cartItemsWrapper.innerHTML = '';    

    // Show empty cart page if no products exist
    let container = document.getElementById('container');

    if (productsInLocalStorage === null || productsInLocalStorage.length === 0)     
    {
      container.innerHTML = `        
        <div class="container py-5 px-5 d-flex flex-column align-items-center emptyCartContainer">
            <img src="./images/remove_shopping_cart_white_48dp_degrade.svg" alt="cart icon" class="emptycartIcon">
            <h1 class="font-weight-bold text-center">Your shopping cart is empty!</h1>
            <p class="font-weight-bold text-center">Click below to start shopping !</p>            
            <button class="main-btn" type="submit"><a href="index.html">Start Shopping</a></button>
        </div>
        `
    }
}

if (productsInLocalStorage != undefined ) {
    var btnOrderConfirmation = document.getElementById("btnOrderConfirmation");

    btnOrderConfirmation.addEventListener("click", (e) => {
    
        e.preventDefault();
    
        var sum = localStorage.getItem("orderTotalPrice");

        let invalidFeedback = document.querySelectorAll("p.invalid-feedback");
    
        var contact = {

            firstName: document.getElementById("inputFirstName").value,
            lastName: document.getElementById("inputLastName").value,
            zipCode: document.getElementById("inputZipCode").value,
            address: document.getElementById("inputAddress").value,
            city: document.getElementById("inputCity").value,
            email: document.getElementById("inputEmail").value
        }
       
        var emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/
        var zipcodeRegex = /^[0-9]{5}$/

        if (!(contact.firstName.length > 1)) {
            invalidFeedback[0].style.display = 'block';
            document.getElementById("inputFirstName").style.border = 'solid 2px red';
        }
        
        if (contact.firstName.length > 1) {
            invalidFeedback[0].style.display = 'none';
            document.getElementById("inputFirstName").style.border = 'solid 2px green';
        }
        
        if (!(contact.lastName.length > 1)) {
            invalidFeedback[1].style.display = 'block';
            document.getElementById("inputLastName").style.border = 'solid 2px red';
        }
        
        if (contact.lastName.length > 1) {
            invalidFeedback[1].style.display = 'none';
            document.getElementById("inputLastName").style.border = 'solid 2px green';
        }

        if (!(contact.address.length > 1)) {
            invalidFeedback[2].style.display = 'block';
            document.getElementById("inputAddress").style.border = 'solid 2px red';
        }
        
        if (contact.address.length > 1) {
            invalidFeedback[2].style.display = 'none';
            document.getElementById("inputAddress").style.border = 'solid 2px green';
        }

        if (!(zipcodeRegex.test(contact.zipCode))) {
            invalidFeedback[3].style.display = 'block';
            document.getElementById("inputZipCode").style.border = 'solid 2px red';
        }

        if (zipcodeRegex.test(contact.zipCode)) {
            invalidFeedback[3].style.display = 'none';
            document.getElementById("inputZipCode").style.border = 'solid 2px green';
        }
        
        if (!(contact.city.length > 1)) {
            invalidFeedback[4].style.display = 'block';
            document.getElementById("inputCity").style.border = 'solid 2px red';
        }
        
        if (contact.city.length > 1) {
            invalidFeedback[4].style.display = 'none';
            document.getElementById("inputCity").style.border = 'solid 2px green';
        }

        if (!(emailRegex.test(contact.email))) {
            invalidFeedback[5].style.display = 'block';
            document.getElementById("inputEmail").style.border = 'solid 2px red';
        }

        if (emailRegex.test(contact.email)) {
            invalidFeedback[5].style.display = 'none';
            document.getElementById("inputEmail").style.border = 'solid 2px green';
        }          
        
        if (
            contact.firstName.length > 1
            && contact.lastName.length > 1
            && emailRegex.test(contact.email)
            && contact.city.length > 1
            ) {

            localStorage.setItem("contact", JSON.stringify(contact));

            var products = [];
        
            productsInLocalStorage.forEach(element => products.push(element.selectedProductId));
            console.log(products);
        
            var databackEnd = {
                contact : contact,
                products : products, 
            }
        
            console.log(databackEnd);
                
            fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            body: JSON.stringify(databackEnd),
            headers : {"Content-type" : "application/json"},    
            })    
            .then(response => response.json())
            .then(function(data) {                
                
                window.location.href = `order-confirmation.html?orderId=${data.orderId}&orderTotalPrice=${sum}`;
                                
            })
            .then(localStorage.removeItem("cameras"))
            .then(localStorage.removeItem("orderTotalPrice"))
            .catch((error) => {
                alert(error)
            });

        }           
                
    });

    // Input Form validity of contact properties

    validateInputForm(document.getElementById("inputFirstName"), (event) => event.target.value.length > 0);
    validateInputForm(document.getElementById("inputLastName"), (event) => event.target.value.length > 0);
    validateInputForm(document.getElementById("inputAddress"), (event) => event.target.value.length > 0);
    validateInputForm(document.getElementById("inputCity"), (event) => event.target.value.length > 0);
    validateInputForm(document.getElementById("inputZipCode"), (event) => {

        var zipcodeRegex = /^[0-9]{5}$/
        return zipcodeRegex.test(event.target.value)

    });
    validateInputForm(document.getElementById("inputEmail"), (event) => {

        var emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/
        return emailRegex.test(event.target.value)    

    });    

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

    // if (!(
    //     contact.firstName.length > 1
    //     // && lastName.length > 1
    //     // emailRegex.test(email)
    //     // && adress.length > 6
    //     // && city.length > 1
    //   )) {
    //     // console.log(emailRegex.test(email));
    //     alert("Please fill in the correct fields before proceeding to payment")
    //   }

}