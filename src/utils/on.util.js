import { Console } from "console";
import winstrol from "winstrol";

process.on("exit", (code) => {
    winstrol.INFO("El proceso terminó con código " + code);
});

process.on("uncaughtException", (error) => {
    winstrol.INFO("Ha ocurrido un error: " + error.message);
});
console.log(process.pid);
winstrol.INFO("ID del proceso: " + process.pid);
process.exit(1);

