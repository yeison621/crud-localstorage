// 1. VARIABLES Y ESTADO
let formulario = document.getElementById("formulario");

let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let edad = document.getElementById("edad");

let errorNombre = document.getElementById("errorNombre");
let errorCorreo = document.getElementById("errorCorreo");
let errorEdad = document.getElementById("errorEdad");

let tabla = document.getElementById("tablaEstudiantes");
let btnGuardar = document.getElementById("btnGuardar");

let listaEstudiantes = [];
let indiceEditar = -1;

function validarNombre() {

    let nombreEstudiante = nombre.value.trim();

    if (nombreEstudiante === "") {
        errorNombre.textContent = "Escribe el nombre del estudiante.";
        return false;
    }
    else if (nombreEstudiante.length < 3) {
        errorNombre.textContent = "El nombre debe tener mínimo 3 caracteres.";
        return false;
    }
    else{
        errorNombre.textContent = "";
        return true;
    }

}

nombre.addEventListener("input", validarNombre);

function validarCorreo() {

    let correoEstudiante = correo.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoEstudiante)) {
        errorCorreo.textContent = "Escribe un correo válido.";
        return false;
    }
    else{
        errorCorreo.textContent = "";
        return true;
    }

}

correo.addEventListener("input", validarCorreo);

function validarEdad() {

    let edadEstudiante = Number(edad.value);

    if (edad.value.trim() === "" || !Number.isInteger(edadEstudiante) || edadEstudiante <= 0) {
        errorEdad.textContent = "Escribe una edad entera mayor que cero.";
        return false;
    }
    else{
        errorEdad.textContent = "";
        return true;
    }

}

edad.addEventListener("input", validarEdad);


formulario.addEventListener("submit", registrarEstudiante);
function registrarEstudiante(event){
    event.preventDefault();

    let nombreValido = validarNombre();
    let correoValido= validarCorreo();
    let edadValida= validarEdad();

    if (!nombreValido || !correoValido || !edadValida) {
        return;
    }
 
    let  nombreEstudiante = nombre.value.trim();
    let  correoEstudiante =  correo.value.trim()
    let  edadEstudiante =  Number(edad.value);

    let estudiante = {
        nombre: nombreEstudiante,
        correo: correoEstudiante,
        edad: edadEstudiante
    };

    if (indiceEditar === -1) {
        listaEstudiantes.push(estudiante);
    }else{
        listaEstudiantes[indiceEditar] = estudiante;
        indiceEditar = -1;   
    }
    localStorage.setItem("estudiantes", JSON.stringify(listaEstudiantes));

    mostrarEstudiantes();
    formulario.reset();

    errorNombre.textContent = "";
    errorCorreo.textContent = "";
    errorEdad.textContent = "";
 
    btnGuardar.textContent = "Registrar estudiante";
}

function mostrarEstudiantes() {
    tabla.innerHTML = "";

    for (let i = 0; i < listaEstudiantes.length; i++) {

        tabla.innerHTML += `
            <tr>
                <td>${listaEstudiantes[i].nombre}</td>
                <td>${listaEstudiantes[i].correo}</td>
                <td>${listaEstudiantes[i].edad}</td>
                <td>
                    <button onclick="editarEstudiante(${i})">
                        Editar
                    </button>
                </td>
                <td>
                    <button onclick="eliminarEstudiante(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;

    }

}


function editarEstudiante(indice) {

    nombre.value = listaEstudiantes[indice].nombre;
    correo.value = listaEstudiantes[indice].correo;
    edad.value = listaEstudiantes[indice].edad;

    indiceEditar = indice;

    btnGuardar.textContent = "Actualizar estudiante";

}

function eliminarEstudiante(indice){
    listaEstudiantes.splice(indice,1)

    localStorage.setItem("estudiantes", JSON.stringify(listaEstudiantes));
    mostrarEstudiantes();

    if(indiceEditar === indice){
        indiceEditar = -1;

        formulario.reset();

        btnGuardar.textContent = "Registrar estudiante";

        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorEdad.textContent = "";
    }
    else if (indiceEditar > indice) {
    
        indiceEditar--;
    
    }
}

let datosGuardados = localStorage.getItem("estudiantes");

if (datosGuardados !== null) {

    listaEstudiantes = JSON.parse(datosGuardados);

}

mostrarEstudiantes();