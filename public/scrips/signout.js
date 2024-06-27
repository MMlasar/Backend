import winston from "winston";

document.querySelector("#signout").addEventListener("click", async () => {
    try {
        const token = localStorage.getItem("token");
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        };

        winston.info("Sending signout request to server");

        let response = await fetch("/api/sessions/signout", opts);
        response = await response.json();

        winston.info("Response from server:", response);

        alert(response.message);
        
        if (response.statusCode === 200) {
            localStorage.removeItem("token");
            location.replace("/");
        }
    } catch (error) {
        winston.error("An error occurred:", error);
        console.error(error);
    }
});
