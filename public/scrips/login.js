import { response } from "express"

const selector = document.querySelector("#login")
selector.addEventListener("click",async()=>{
    try {
        const data = {
            email: document.querySelector("#email").value ,
            password: document.querySelector("#password").value ,
        }
        //console.log(data)
        const opts = {
            method: "POST",
            headers:{ "Content-type": " application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/session/login", opts)
        response = await response.json()
        //console.log(response);
        if( response.session ){
            alert(response.message)
            response.session && location.replace("/")
        }
    } catch (error) {
        alert(error.message)
    }
})