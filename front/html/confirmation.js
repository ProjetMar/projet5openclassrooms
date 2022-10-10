let paramsString = window.location.search;
let searchParams = new URLSearchParams (paramsString);
const id = searchParams.get ("orderid");
document.getElementById("orderId").innerText = id ; 