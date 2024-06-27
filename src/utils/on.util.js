import winston from "winston";

// Manejo de la salida del proceso
process.on("exit", (code) => {
    winston.info("El proceso terminó con código " + code);
});

// Manejo de excepciones no capturadas
process.on("uncaughtException", (error) => {
    winston.error("Ha ocurrido un error: " + error.message);
});

// Mostrar el ID del proceso en la consola estándar
console.log(process.pid);

// Registrar el ID del proceso utilizando winston
winston.info("ID del proceso: " + process.pid);

// Forzar la salida del proceso con código de error 1
process.exit(1);

