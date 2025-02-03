// Crear función que añade un nombre a un vector
let arrayNombres = [];
let cajaTexto = document.getElementById("nombre");
let indice = 0;
let botonAnadir = document.getElementById("botonAnadir");
let botonModificar = document.getElementById("botonModificar");
let botonCancelar = document.getElementById("botonCancelar");
let nombreOriginal = "";
let nombreCorto = 0;
let nombreLargo = 0;
let promedioNombres = 0;

function anadirNombre(nombre) {
    if (nombre == "") {
        alert("El campo está vacío");
        return; 
    }
    arrayNombres.push(nombre);               
    pintarTabla(arrayNombres);
}



// Crear función que elimina un nombre de un vector

function eliminarNombre(nombre) {

    indice = arrayNombres.indexOf(nombre);

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
    let contadorAlumnos = 0;

    tabla.innerHTML = "<tr><td>Numero</td><td>Nombre</td></tr>";

    for (let i = 0; i < array.length; i++) {
        let filaNueva = document.createElement("tr");
        filaNueva.innerHTML = `<td>${i + 1}</td><td onclick="seleccionarNombre('${array[i]}')" style="cursor: pointer;">${array[i]}</td><td><button class="button" onclick="eliminarNombre('${array[i]}')">Eliminar</button></td>`;        
        filaNueva.classList.add("filaTabla");
        tabla.appendChild(filaNueva); 
        contadorAlumnos++;   
    }
    totalAlumnos = document.createElement("tr");
    totalAlumnos.innerHTML = `<td>Total de alumnos:  ${contadorAlumnos}</td>`;
    tabla.appendChild(totalAlumnos);
    promedioLongNombres();
    estadisticasNombres = document.createElement("tr");
    estadisticasNombres.classList.add('filaEstadisticas');
    estadisticasNombres.innerHTML = `<td>Promedio logitud nombres: ${promedioNombres}</td><td>Letras nombre mas largo: ${nombreLargo}</td><td>Letras nombre mas corto: ${nombreCorto}</td>`;
    tabla.appendChild(estadisticasNombres);
}

// Evento para detectar tecla Enter y añadir nombre si no está vacío

cajaTexto.addEventListener("keydown", function(evento) {
    if (evento.key === 'Enter') { 
        if (cajaTexto.value.trim() === "") {
            alert("El campo está vacío");
        } else {
            anadirNombre(cajaTexto.value);
        }
    }
});

function seleccionarNombre(nombre) {
    cajaTexto.value = nombre;
    nombreOriginal = nombre;
    cajaTexto.focus();
    botonAnadir.style.display = "none";
    botonCancelar.style.display = "block";
    botonModificar.style.display = "block";
}

function modificarNombre(nombre) {
    for (let i = 0; i < arrayNombres.length; i++) {
        if ( arrayNombres[i] === nombreOriginal ) {
            arrayNombres[i] = nombre;
        }
    }
    botonAnadir.style.display = "block";
    botonCancelar.style.display = "none";
    botonModificar.style.display = "none";
    cajaTexto.value = "";
    nombreOriginal = "";
    pintarTabla(arrayNombres);
}

function volverAtras(){
    cajaTexto.value = '';
    botonAnadir.style.display = "block";
    botonCancelar.style.display = "none";
    botonModificar.style.display = "none";
}

function promedioLongNombres(){
    let longitudTotal = 0;
    let totalNombres = 0;
    nombreLargo = arrayNombres[0].length;
    nombreCorto = arrayNombres[0].length;
    for (let i=0; i<arrayNombres.length; i++){
        longitudTotal += arrayNombres[i].length;
        if (arrayNombres[i].length > nombreLargo)
            nombreLargo = arrayNombres[i].length;
        else if (arrayNombres[i].length < nombreCorto)
            nombreCorto = arrayNombres[i].length;
        totalNombres++;
    }
    promedioNombres = (longitudTotal / totalNombres).toFixed(2);
}