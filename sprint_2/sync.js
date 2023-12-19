const fs = require("fs");

const ruta = "./sprint_2/data/producto.manager.json";
const data = JSON.stringify([{ name: "bascula" }], null, 2);

fs.writeFileSync(ruta, data);


let configuracion = "utf-8"
const datosleidos = fs.readFileSync (ruta,configuracion);
const datosparseados =JSON.parse (datosleidos);
console.log (datosparseados);

