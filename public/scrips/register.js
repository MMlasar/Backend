import winstrol from "winstrol";

const selector = document.querySelector("#register");
selector.addEventListener("click", async () => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            name: document.querySelector("#name").value,
            lastname: document.querySelector("#lastname").value,
            photo: document.querySelector("#photo").value,
            age: document.querySelector("#age").value,
        };
        
        winstrol.INFO("Data sent to server:", data);

        const opts = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        };

        let response = await fetch("/api/session/register", opts);
        response = await response.json();

        winstrol.INFO("Response from server:", response);

        if (response.session) {
            alert(response.message);
            location.replace("/login");
        }
    } catch (error) {
        winstrol.ERROR("An error occurred:", error.message);
        alert(error.message);
    }
});
