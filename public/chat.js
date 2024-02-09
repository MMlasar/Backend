// chat.js
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const socket = io();
const user = {};

Swal.fire({
    title: "Type your nickname:",
    input: "text",
    inputValidator: (nickname) => {
        if (!nickname) {
            return "Nickname is required!";
        }
    },
    allowOutsideClick: false,
}).then((result) => {
    if (result.isConfirmed) {
        user.name = result.value;
        document.querySelector("#name").innerHTML = result.value;
        socket.emit("user", user)
    }
});

const newchat = document.querySelector("#text");

newchat.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key.toLowerCase() === "enter" && user.name) {
        socket.emit("new message", { name: user.name, message: newchat.value });
        newchat.value = "";
    }
});

socket.on("all", (data) => {
    const chatHtml = data.map((each) => `<p><span class="fw-bold">${each.name}</span>${each.message}</p>`).join("");
    document.querySelector("#chats").innerHTML = chatHtml;
});

