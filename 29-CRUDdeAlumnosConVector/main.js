// Crear función que añade un nombre a un vector
let arrayNombres = [];
let cajaTexto = document.getElementById("nombre");

function anadirNombre(nombre) {
    if (typeof nombre !== "string" || nombre.trim() === "") {                                   // Verificar que el nombre es una cadena de texto
        console.log("Error: El segundo parámetro debe ser una cadena de texto.");
        alert("El campo está vacío");
        return; 
    }

    arrayNombres.push(nombre);               
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

// Crear función para pintar dinamicamente la tabla (la funcion recibe como parametro un vector )

function pintarTabla(array) {
    let tabla = document.getElementById("tabla");
    cajaTexto.value = "";
    cajaTexto.focus(); 

    tabla.innerHTML = "<tr><td>Numero</td><td>Nombre</td></tr>";

    for (let i = 0; i < array.length; i++) {
        let filaNueva = document.createElement("tr");
        filaNueva.innerHTML = `<td>${i + 1}</td><td>${array[i]}</td><td><button class="button" onclick="eliminarNombre('${array[i]}')">Eliminar</button></td>`;
        filaNueva.classList.add("filaTabla");
        tabla.appendChild(filaNueva);
    }
}

// Evento para detectar tecla Enter y añadir nombre si no está vacío

cajaTexto.addEventListener("keydown", function(evento) {
    if (evento.keyCode === 13) { 
        if (cajaTexto.value.trim() === "") {
            alert("El campo está vacío");
        } else {
            anadirNombre(cajaTexto.value);
        }
    }
});


