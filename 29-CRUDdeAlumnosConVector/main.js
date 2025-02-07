// Crear función que añade un nombre a un vector
let arrayNombres = [];
let cajaTexto = document.getElementById("nombre");
let botonAnadir = document.getElementById("botonAnadir");
let botonModificar = document.getElementById("botonModificar");
let botonCancelar = document.getElementById("botonCancelar");
let nombreOriginal = "";
let nombreCorto = 0;
let nombreLargo = 0;
let promedioNombres = 0;
let contenedorError = document.querySelector('.contenedor-error');
let contenedoresFlotantes = document.getElementById("contenedoresFlotantes");
let mensajeFlotante = document.getElementById('mensajeFlotante');
let mensajeError = document.getElementById('mensajeError');


function anadirNombre(nombre) {
    if (nombre == "") {
        contenedorError.style.display = 'block';
        mensajeError.innerHTML = 'El campo está vacío';
        return;
    }
    arrayNombres.push(nombre);
    pintarTabla(arrayNombres);
}



// Crear función que elimina un nombre de un vector

function eliminarNombre(nombre) {
    let indice = 0;
    indice = arrayNombres.indexOf(nombre);

    if (indice !== -1) {
        arrayNombres.splice(indice, 1);                    // Si el nombre existe en el array, eliminarlo
    } else {
        contenedorError.style.display = 'block';
        mensajeError.innerHTML = 'El nombre no se encontró en el array.';
    }
    pintarTabla(arrayNombres);
}

// Crear función para pintar dinamicamente la tabla (la funcion recibe como parametro un vector )

function pintarTabla(array) {
    let tabla = document.getElementById("tabla");
    cajaTexto.value = "";
    cajaTexto.focus();
    let contadorAlumnos = 0;

    tabla.innerHTML = "<tr><td>Numero</td><td>Nombre</td></tr>";

    for (let i = 0; i < array.length; i++) {
        let filaNueva = document.createElement("tr");
        filaNueva.innerHTML = `<td>
                                    ${i + 1}
                                </td>
                                <td id="${i}">
                                    ${array[i]}<button id="botonReves" onclick="nombreReves(${i})">Revés</button>
                                </td>
                                <td>
                                    <button onclick="seleccionarNombre('${array[i]}', ${i})">Mofificar</button>
                                    <button>Mas info</button>
                                    <button onclick="eliminarNombre('${array[i]}')">Eliminar</button>
                                </td>`;
        filaNueva.classList.add("filaTabla");
        tabla.appendChild(filaNueva);
        contadorAlumnos++;
    }
    totalAlumnos = document.createElement("tr");
    totalAlumnos.innerHTML = `<td>Total de alumnos:  ${contadorAlumnos}</td>`;
    tabla.appendChild(totalAlumnos);
    promedioLongNombres(arrayNombres);
    estadisticasNombres = document.createElement("tr");
    estadisticasNombres.classList.add('filaEstadisticas');
    estadisticasNombres.innerHTML = `<td>Promedio logitud nombres: ${promedioNombres}</td><td>Letras nombre mas largo: ${nombreLargo}</td><td>Letras nombre mas corto: ${nombreCorto}</td>`;
    tabla.appendChild(estadisticasNombres);
}

// Evento para detectar tecla Enter y añadir nombre si no está vacío

cajaTexto.addEventListener("keydown", function (evento) {
    if (evento.key === 'Enter') {
        if (cajaTexto.value.trim() === "") {
            contenedorError.style.display = 'block';
            mensajeError.innerHTML = 'El campo está vacío';
        } else {
            anadirNombre(cajaTexto.value);
        }
    }
});

let indiceSeleccionado;

function seleccionarNombre(nombre, indice) {
    indiceSeleccionado = indice;
    cajaTexto.value = nombre;
    nombreOriginal = nombre;
    cajaTexto.focus();
    botonAnadir.style.display = "none";
    botonCancelar.style.display = "inline";
    botonModificar.style.display = "inline";
    document.getElementById('botonRemplazar').style.display = 'none';
}

function modificarNombre(nombre) {
    arrayNombres[indiceSeleccionado] = nombre;
    botonAnadir.style.display = "inline";
    botonCancelar.style.display = "none";
    botonModificar.style.display = "none";
    cajaTexto.value = "";
    nombreOriginal = "";
    pintarTabla(arrayNombres);
}

function volverAtras() {
    cajaTexto.value = '';
    botonAnadir.style.display = "inline";
    botonCancelar.style.display = "none";
    botonModificar.style.display = "none";
    document.getElementById('botonRemplazar').style.display = 'inline';

}

function promedioLongNombres(array) {
    let longitudTotal = 0;
    let totalNombres = 0;
    nombreLargo = array[0].length;
    nombreCorto = array[0].length;
    for (let i = 0; i < array.length; i++) {
        longitudTotal += array[i].length;
        if (array[i].length > nombreLargo)
            nombreLargo = array[i].length;
        else if (array[i].length < nombreCorto)
            nombreCorto = array[i].length;
        totalNombres++;
    }
    promedioNombres = (longitudTotal / totalNombres).toFixed(2);
}

// V5: Crear función que reciba un nombre y devuelva cuantas veces ese nombre es presente en la lista

function buscar() {
    let buscar = document.getElementById("buscar").value;
    let contadorAlumnos = 0;
    if (buscar != "") {
        if (arrayNombres.includes(buscar)){
            for (let i = 0; i < arrayNombres.length; i++) {
                if (buscar == arrayNombres[i]) {
                    contadorAlumnos++;
                }
            }
            contenedoresFlotantes.style.display = 'block';
            mensajeFlotante.innerHTML = `En la lista hay ${contadorAlumnos} "${buscar}"`;
        } else {
            contenedorError.style.display = 'block';
            mensajeError.innerHTML = 'El nombre no está en la lista';
        }
    } else {
        contenedorError.style.display = 'block';
        mensajeError.innerHTML = 'Rellenar el nombre para buscar';
    }
    document.getElementById("buscar").value = "";
}

// V6: Crear función que reemplace todas las apariciones del nombre buscado por el nuevo nombre.

function reemplazarTodos() {
    let nombreBuscado = document.getElementById("buscarNombre").value;
    let nombreReemplazado = document.getElementById("reemplazarNombre").value;


    if (nombreBuscado == "" || nombreReemplazado == "") {
        contenedorError.style.display = 'block';
        mensajeError.innerHTML = 'Rellenar todos los campos';
        return;
    } else if (!arrayNombres.includes(nombreBuscado)) {
        contenedorError.style.display = 'block';
        mensajeError.innerHTML = 'El nombre no se encontró en el array';
    } else {
        for (let i = 0; i < arrayNombres.length; i++) {
            if (arrayNombres[i] === nombreBuscado) {
                arrayNombres[i] = nombreReemplazado;
            }
        }
        document.getElementById("buscarNombre").value = "";
        document.getElementById("reemplazarNombre").value = "";
        pintarTabla(arrayNombres);
    }
}

function nombreReves(indice) {
    for (let i = 0; i < arrayNombres.length; i++) {
        if (i == indice){
            arrayLetras = arrayNombres[i].split('');
            arrayLetrasReves = arrayLetras.reverse();
            arrayNombres[i] = arrayLetrasReves.join('');
        }
    }
    pintarTabla(arrayNombres);
}

// V7: Búsqueda y Reemplazo Paso a Paso
// Añadir un botón de buscar y reemplazar:
// Mostrará cada aparición del nombre buscado en un contenedor, indicando el índice de la lista.
// Añadirá un botón de reemplazar para cambiar el nombre en esa posición y otro de saltar para dejarlo sin cambios.
// Al terminar el proceso, el contenedor informativo se vaciará.

function buscarReemplazar() {
    let buscarReemplazar = document.getElementById("buscarReemplazar").value;
    let mostrarReemplazar = document.getElementById("contenedoresFlotantes");
    let contador = 0;
    if (buscarReemplazar != "") {
        for (let i = 0; i < arrayNombres.length; i++) {
        if (buscarReemplazar == arrayNombres[i]) {
        contador++  
        }
    }
    mostrarReemplazar.innerHTML = contador + arrayNombres[i];     
    }
    document.getElementById("buscarReemplazar").value = "";
}