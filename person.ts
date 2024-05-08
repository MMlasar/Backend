const nombre:string = "pepe"
const mascotas:number = 2
const edad:number = 23
const hijos:boolean = false 
const colores : string[] = ["azul", "verde"]

interface Persona {
    nombre:string,
    mascotas: number,
    edad: number,
    hijos : boolean,
    colores: Array<string>
}

const individuo:Persona = { nombre, mascotas, edad, hijos ,colores }
const alumno: Persona = { nombre:"pedro", mascotas:1 , edad :25 , hijos:false , colores :[ "negro" , "amarillo" ]}

const personas: Array<Persona> = [individuo,alumno]

const primerElemento = <arrayDeAlgo>(data:arrayDeAlgo):arrayDeAlgo => {
    return data [ 0 ]
}



