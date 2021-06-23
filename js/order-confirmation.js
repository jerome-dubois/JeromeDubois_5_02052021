var url_orderId = new URLSearchParams(window.location.search);

console.log("url_orderId");
console.log(url_orderId);

var orderId = url_orderId.get("orderId");
var orderTotalPrice = url_orderId.get("orderTotalPrice");

console.log("orderId");
console.log(orderId);

console.log("orderTotalPrice");
console.log(orderTotalPrice);

document.getElementById("order-id").textContent = orderId;
document.getElementById("order-total-price").textContent = orderTotalPrice;

let btnBackToStore = document.getElementById('btnBackToStore');

btnBackToStore.addEventListener('click', () => {    
    location.replace('index.html');
})
