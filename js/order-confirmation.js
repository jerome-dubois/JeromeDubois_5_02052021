var url_orderId = new URLSearchParams(window.location.search);

console.log(url_orderId);

var orderId = url_product_id.get("orderId");

console.log("orderId");
console.log(orderId);

document.getElementById("order-id").textContent = orderId;