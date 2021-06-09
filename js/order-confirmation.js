var url_orderId = new URLSearchParams(window.location.search);

console.log(url_orderId);

var orderId = url_product_id.get("orderId");
var orderTotalPrice = url_product_id.get("orderTotalPrice");

console.log("orderId");
console.log(orderId);

console.log("orderTotalPrice");
console.log(orderTotalPrice);

document.getElementById("order-id").textContent = orderId;
document.getElementById("order-total-price").textContent = orderTotalPrice;
