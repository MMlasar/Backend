import { Console } from "console";

process.on("exit", (code) => {
    Console.log("El proceso terminó con código " + code);
});

process.on("uncaughtException", (error) => {
    Console.log("Ha ocurrido un error: " + error.message);
});
console.log(process.pid);
Console.log("ID del proceso: " + process.pid);
process.exit(1);
