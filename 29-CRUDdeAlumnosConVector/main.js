// Crear función que añade un nombre a un vector

function anadirNombre(array, nombre) {

    if (!Array.isArray(array)) {                                         // Verificar que el primer parámetro es realmente un array
        console.log("Error: El primer parámetro debe ser un array.");
        return;  
    }
    
    if (typeof nombre !== "string") {                                   // Verificar que el nombre es una cadena de texto
        console.log("Error: El segundo parámetro debe ser una cadena de texto.");
        return; 
    }

    array.push(nombre);               //Añadir elemento a array
    return array;
}



// Crear función que elimina un nombre de un vector

function eliminarNombre(array, nombre) {

    const indice = array.indexOf(nombre);

    if (indice !== -1) {
        array.splice(indice, 1);                    // Si el nombre existe en el array, eliminarlo
    } else {
        console.log("Error: El nombre no se encontró en el array.");
    }

    return array;
}





