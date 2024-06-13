import winstrol from "winstrol";
import io from "socket.io-client";

winstrol.INFO("socket");

const socket = io();

socket.on("products", (data) => {
    data = data.map(each => `<div class="card" style="width: 18rem;">
    <img src="${each.photo}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> ${each.name} </h5>
    </div>
  </div>`).join("");
    document.querySelector("#products").innerHTML = data;
});

socket.emit("new products", {});

socket.on("new success", (message) => winstrol.INFO(message));

document.querySelector("#newproducts").addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#name").value;
    const photo = document.querySelector("#photo").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    const data = {};
    
    // Usar el operador lógico && es otra manera de usar un if
    title && (data.name = title);
    if (photo) {
        data.photo = photo;
    }
    if (price) {  
        data.price = price; 
    }
    stock && (data.stock = stock);

    winstrol.INFO(data);

    socket.emit("newproducts", data);
});
