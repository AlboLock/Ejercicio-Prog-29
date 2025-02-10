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
let modificando = false;

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

    tabla.innerHTML = "<tr style='background-color: #A7B49E'><td style='font-weight: bold; color:rgb(38, 73, 103)'>NUMERO</td><td style='font-weight: bold; color:  rgb(38, 73, 103)'>NOMBRE</td><td></td></tr>";

    for (let i = 0; i < array.length; i++) {
        let filaNueva = document.createElement("tr");
        filaNueva.classList.add('filaTabla');
        filaNueva.innerHTML = `<td>
                                    ${i + 1}
                                </td>
                                <td id="${i}">
                                    ${array[i]}<span class="reves-img"><img id="imagen${i}" src="img/reves.png" onclick="nombreReves(${i}, this)"></span>
                                </td>
                                <td>
                                    <div class="contenedor-iconos">
                                        <span onclick="seleccionarNombre('${array[i]}', ${i})"><img src="img/icono_modificar.png"></span>
                                        <span onclick="masInfo('${i}')"><img src="img/icono_masInfo.png"></span>
                                        <span onclick="eliminarNombre('${array[i]}')"><img src="img/icono_borrar.png"></span>
                                    </div>
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
            if (!modificando)
                anadirNombre(cajaTexto.value);
            else{
                modificarNombre(cajaTexto.value);
            }
        }
    }
});

let indiceSeleccionado;

function seleccionarNombre(nombre, indice) {
    modificando = true;
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
    modificando = false;
    document.getElementById('botonRemplazar').style.display = 'inline';
}

function volverAtras() {
    cajaTexto.value = '';
    botonAnadir.style.display = "inline";
    botonCancelar.style.display = "none";
    botonModificar.style.display = "none";
    document.getElementById("buscarNombre").style.display = 'none';
    document.getElementById("reemplazarNombre").style.display = 'none';
    document.getElementById('botonRemplazar').style.display = 'inline';
    document.getElementById("botonReemplazarTodos").style.display = 'none';
    cajaTexto.style.display = 'inline';
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
            contenedoresFlotantes.innerHTML = '';
            contenedoresFlotantes.innerHTML = `En la lista hay ${contadorAlumnos} "${buscar}"`;
            contenedoresFlotantes.innerHTML += `<button onclick="contenedoresFlotantes.style.display = 'none';">Cerrar</button>`;
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

function mostrarInputRemplazo(){
    document.getElementById('botonRemplazar').style.display = 'none';
    document.getElementById("buscarNombre").style.display = 'inline';
    document.getElementById("reemplazarNombre").style.display = 'inline';
    document.getElementById("botonReemplazarTodos").style.display = 'inline';
    botonCancelar.style.display = 'inline';
    cajaTexto.style.display = 'none';
    botonAnadir.style.display = 'none';
}

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
let arrayIndices = [];
function buscarReemplazar() {
    let nombreBuscado = document.getElementById("buscar").value;
    let mostrarReemplazar = document.getElementById("contenedoresFlotantes");
    mostrarReemplazar.innerHTML = "";
    let contenido ='<input type="text" id="nombreReemplazado"><button onclick="reemplazoSeleccionados()">Reemplazar</button>';

    
    if (nombreBuscado != "") {
        for (let i = 0; i < arrayNombres.length; i++) {
        if (nombreBuscado == arrayNombres[i]) {
            contenido+=`<div><span><input type="checkbox" id="${i}" onclick="añadirArrayCambio(this.id);"></span><span>${i+1}</span><span>${arrayNombres[i]}</span></div>`
        }      
    }
    }
    contenido+=`<button onclick="contenedoresFlotantes.style.display = 'none';">Cerrar</button>`;
    mostrarReemplazar.innerHTML = contenido;
    mostrarReemplazar.style.display= "block";
}

function añadirArrayCambio(id){
    if (!arrayIndices.includes(id))
        arrayIndices.push(id);
    else {
        arrayIndices.splice(arrayIndices.indexOf(id), 1);
    }
    console.log(arrayIndices)
}

function reemplazoSeleccionados() {
    let nuevoNombre = document.getElementById('nombreReemplazado').value;
    for (let i=0; i < arrayIndices.length; i++) {
        for (let j=0; j<arrayNombres.length; j++){
            if (arrayIndices[i] == j){
                arrayNombres[j] = nuevoNombre;
            }
        }
    }
    pintarTabla(arrayNombres);
    contenedoresFlotantes.style.display = 'none';
}

// V10: Información Detallada de los Nombres
// Añadir un botón informativo en cada fila de la tabla.
// Al pulsarlo, mostrar en un contenedor los siguientes datos del nombre correspondiente:
// El nombre.
// Su longitud.
// Si la longitud está por encima, por debajo o igual al promedio.
// Si es el nombre más corto, más largo o ninguno de los dos.
// El número de vocales en el nombre.

function masInfo(indice) {
    let infoNombreMostrada = document.getElementById("contenedoresFlotantes");
    infoNombreMostrada.innerHTML = '';
    let nombreSeleccionado = arrayNombres[indice];
    let longitudNombre = nombreSeleccionado.length;
    let resultadoPromedio = "";
    let tamanoNombre = "";
    let vocales = [];
    let listaVocales = "aeiouAEIOU";

    let promedio = parseFloat(promedioNombres);  

    if (longitudNombre < promedio) {
        resultadoPromedio = `Está por debajo del promedio`;
    } else if (longitudNombre === promedio) {
        resultadoPromedio = `Es igual al promedio`;
    } else {
        resultadoPromedio = `Está por encima del promedio`;
    }

    if (longitudNombre === nombreCorto) {
        tamanoNombre = `Es el nombre más corto`;
    } else if (longitudNombre === nombreLargo) {
        tamanoNombre = `Es el más largo`;
    } else {
        tamanoNombre = `No es ni el más corto ni el más largo`;
    }

    for (let j = 0; j < nombreSeleccionado.length; j++) {
        let letra = nombreSeleccionado[j];
        if (listaVocales.includes(letra)) {
            vocales.push(letra);
        }
    }

    infoNombreMostrada.innerHTML = `
                                    <p> ${nombreSeleccionado}</p>
                                    <p>Tiene ${longitudNombre} letras</p>
                                    <p>${resultadoPromedio}</p>
                                    <p>${tamanoNombre}</p>
                                    <p>Contiene estas vocales: ${vocales.join(", ")}</p>
                                    <button onclick="contenedoresFlotantes.style.display = 'none';">Cerrar</button>`;
    infoNombreMostrada.style.display = 'block';
    
}

