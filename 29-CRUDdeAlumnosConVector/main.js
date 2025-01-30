// Crear función que añade un nombre a un vector
let arrayNombres = [];

function anadirNombre(nombre) {
    if (typeof nombre !== "string") {                                   // Verificar que el nombre es una cadena de texto
        console.log("Error: El segundo parámetro debe ser una cadena de texto.");
        return; 
    }

    arrayNombres.push(nombre);               //Añadir elemento a array
    console.log(arrayNombres);
    pintarTabla(arrayNombres);
}



// Crear función que elimina un nombre de un vector

function eliminarNombre(nombre) {

    const indice = arrayNombres.indexOf(nombre);

    if (indice !== -1) {
        arrayNombres.splice(indice, 1);                    // Si el nombre existe en el array, eliminarlo
    } else {
        console.log("Error: El nombre no se encontró en el array.");
    }
    console.log(arrayNombres);
    pintarTabla(arrayNombres);
}





