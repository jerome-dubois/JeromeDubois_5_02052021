var url_orderId = new URLSearchParams(window.location.search);

var orderId = url_orderId.get("orderId");
var orderTotalPrice = url_orderId.get("orderTotalPrice");

document.getElementById("order-id").textContent = orderId;
document.getElementById("order-total-price").textContent = orderTotalPrice;

let btnBackToStore = document.getElementById('btnBackToStore');

btnBackToStore.addEventListener('click', () => {    
    location.replace('index.html');
})
