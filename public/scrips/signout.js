document.querySelector("#signout").addEventListener("click", async () => {
    try {
        const token = localStorage.getItem("token");
        const opts = {
            method: "POST",
            headers: { "content-type": "application/json" /*,token*/ },
        };
       let response = await fetch("/api/sessions/signout", opts);
       response = await response.json();
       alert(response.message);
       if (response.statusCode === 200) {
        location.replace("/");
        localStorage.setItem("token", response.token);
       }
    } catch (error) {
        console.log(error);
    }
});
