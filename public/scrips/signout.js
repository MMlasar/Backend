import winstrol from "winstrol";

document.querySelector("#signout").addEventListener("click", async () => {
    try {
        const token = localStorage.getItem("token");
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        };

        winstrol.INFO("Sending signout request to server");

        let response = await fetch("/api/sessions/signout", opts);
        response = await response.json();

        winstrol.INFO("Response from server:", response);

        alert(response.message);
        
        if (response.statusCode === 200) {
            localStorage.removeItem("token");
            location.replace("/");
        }
    } catch (error) {
        winstrol.ERROR("An error occurred:", error);
        console.log(error);
    }
});
