import { response } from "express";

const loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", async () => {
    try {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const response = await fetch("/api/session/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const responseData = await response.json();

        if (response.ok) {
            alert(responseData.message);
            if (responseData.statuscode === 200) {
                location.replace("/");
               // localStorage.setItem("token", responseData.token);
            }
        } else {
            throw new Error(responseData.message);
        }
    } catch (error) {
        alert(error.message);
    }
});
