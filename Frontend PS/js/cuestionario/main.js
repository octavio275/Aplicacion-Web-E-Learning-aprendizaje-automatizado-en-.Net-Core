import {
    CuestionarioTodoDTO,
    CuestionarioACorregirDTO,
    RespuestaAlumnoDTO,
    Registro,
    PreguntaConRespuestaAlumnoDTO
} from "./Constant.js";

import * as CuestionarioService from "./CuestionarioService.js";
import * as RegistroService from "./RegistroService.js";

window.onload = () => {

    var token = DecodeToken(localStorage.getItem('Token'));

    if (token.Rol == "1") {

        var nav = $('#curso');

        var html = `<li class="nav-item">
                        <a class="nav-link" href="crearCurso.html"> Nuevo Curso </span></a>
                    </li>`;

        nav.append(html);

        var elment = $('#cambiante');

        var text = `<li class="secciones nav-item">
                        <a class="nav-link text-dark" href="listadoEstudiantes.html"> <i class="fas fa-list"></i> Mis alumnos</a>
                    </li>`;

        elment.append(text);

        var element = $('#cambiante');

        var text = `<li class="secciones nav-item">
                        <button type="button"  style="margin-top: 10%; float=right" id = "editar" class="btn btn-light btn-sm" style="margin-top: 10%;"> <i class="fas fa-pencil-alt"></i> Editar </button>
                    </li>`;

        element.append(text);
    }


    CargarCuestionario();
    $('#enviar-cuestionario').on("click", EnviarCuestionario); //CUANDO RECIBE POR PARÁMETRO ENTRA DIRECTO
}

$(document).on('click', '#editar', function () {
    window.location.href = "./editCuestionario.html";
});



function CargarCuestionario() {
    if (localStorage.getItem('claseU')) {
        var idClase = JSON.parse(localStorage.getItem('claseU')).claseId;
        //idClase = 1;
    } else {
        var idClase = 1;
    }
    console.log(parseInt(localStorage.getItem('UsuarioId')));

    CuestionarioService.default(idClase).then(x => LoadCuestionario(x));
}

function LoadCuestionario(CuestionarioTodoDTO) {
    window.sessionStorage.setItem("idClase", CuestionarioTodoDTO.claseId);

    var informacion = document.getElementById("main-grid");
    informacion.innerHTML += `<div class="info-cuestionary" id="header-cuestionario"> ${CuestionarioTodoDTO.descripcion}</div>`;

    var i = 1;
    var lista = [];

    var lista_preguntas = [];
    CuestionarioTodoDTO.preguntas.forEach(preguntas => {
        lista_preguntas.push(preguntas);
        informacion.innerHTML += `<div class="filas">
       <div class="pregyresp-grid" id=${i}>
       <div class="pregunta" id=${"preguntaId" + i}>
        <div class="info-valor">
       <label for="preg" id="preguntaLabelInicio"> ${("Pregunta " + i + "- ")} </label>
       <label for="preg" id="preguntaLabelDescripcion"> ${(preguntas.descripcion) + " (" + preguntas.calificacionParcial + "Pts)"} </label>
       </div>
       <div class="estado" id=${"estado" + i}>
        </div>
       </div>`;
        /*class="estado"
               <i class="false fas fa-times"></i>
               <i class="correct fas fa-check-circle"></i>

        */
        var j = 1;
        var lista_respuestas = [];
        preguntas.respuestas.forEach(respuestas => {
            lista_respuestas.push(j);
            var informacion2 = document.getElementById(i);
            informacion2.innerHTML += `<div class="respuesta-grid" id="respuesta">
            <div class="radio-button"><input type="radio" name=${"respuesta" + i} value="${respuestas.descripcion}"></div>
            <div class="respuesta"><label class="radio"> ${respuestas.descripcion}</label></div>
            </div>
            `;
            j++;
        })
        informacion.innerHTML += `
        </div>
        </div>`
        lista.push(lista_respuestas);
        i++;
    })

    localStorage.setItem('ListaDimensiones', JSON.stringify(lista));
    sessionStorage.setItem('preguntas', JSON.stringify(lista_preguntas));
    //SETEAR DESDE EL LOCALSTORAGE
    RegistroService.default().then(x => RevisarRegistro(x, CuestionarioTodoDTO.claseId, parseInt(localStorage.getItem('UsuarioId'))));
    //LO ACABO DE COMENTAR
}

function RevisarRegistro(registro, claseId, estudianteId) {
    sessionStorage.setItem("registros", JSON.stringify(registro));
    registro.forEach(reg => {
        if (reg.claseId == claseId && reg.estudianteId == estudianteId) {
            DeshabilitarOpciones();
            DeshabilitarBoton();
            var informacion = document.getElementById("header-cuestionario");
            informacion.innerHTML += `<div class="calificacion"> ${("COMPLETADO CON CALIFICACION: " + reg.calificacion + "/10")} </div>`;


            VerificarCondicionDeCurso();
        }
    })
}
function VerificarCondicionDeCurso() {
    var estudianteId = parseInt(localStorage.getItem('UsuarioId'));


    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + localStorage.getItem("token")
        },
        mode: 'cors'
    };

    fetch('https://localhost:44302/api/EstudianteCurso/cursos/' + estudianteId, options)
        .then(response => {
            return response.json()
        })
        .then(json => {
            ComprobarEstado(json, estudianteId);
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))
}
function ComprobarEstado(registros, estudianteId) {
    var idCurso = parseInt(sessionStorage.getItem("CursoId"));
    registros.forEach(registro => {

        if (registro.cursoID == idCurso && registro.estudianteID == estudianteId) {
            if (registro.estado == "Aprobado") {
                var informacion = document.getElementById("header-cuestionario");
                informacion.innerHTML += `<div class="estado-final" id="aprobado"> ${"Estado del curso: Aprobado"} </div>`;
                Swal.fire({
                    title: 'Curso aprobado!',
                    showConfirmButton: true,
                    confirmButtonColor: '#48D1CC',
                    imageUrl: "../imagenes/APROBADO.jpg"
                })
            }
            else if (registro.estado == "Desaprobado") {
                var informacion = document.getElementById("header-cuestionario");
                informacion.innerHTML += `<div class="estado-final" id="desaprobado"> ${"Estado del curso: Desaprobado"} </div>`;
                Swal.fire({
                    title: 'Curso desaprobado',
                    showConfirmButton: true,
                    confirmButtonColor: '#48D1CC',
                    imageUrl: "../imagenes/DESAPROBADO.gif"
                })
            }
        }
    })
}


function EnviarCuestionario() {
    var cuestionario_respuestas = new CuestionarioACorregirDTO;
    cuestionario_respuestas.preguntas = [];
    cuestionario_respuestas.claseId = sessionStorage.getItem("idClase"); //CAMBIAR ESTO
    var lista_preguntas = [];
    var preguntas = JSON.parse(sessionStorage.getItem('preguntas'));
    var i = 1;
    var respondido = true;
    preguntas.forEach(pregunta => {
        var respuesta_seleccion = new RespuestaAlumnoDTO($(`input[name=${"respuesta" + i}]:checked`).val())
        if (respuesta_seleccion.descripcion == undefined) {
            respondido = false;
        }
        var pregunta_con_respuesta = new PreguntaConRespuestaAlumnoDTO(
            pregunta.descripcion, pregunta.calificacionParcial, respuesta_seleccion);
        lista_preguntas.push(pregunta_con_respuesta);
        i++;
    })

    cuestionario_respuestas.preguntas = lista_preguntas;

    /*console.log(JSON.stringify(cuestionario_respuestas));*/


    //MANDAR EL CUESTIONARIO A LA API
    if (respondido) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer" + localStorage.getItem("token")
            },
            body: JSON.stringify(cuestionario_respuestas),
            mode: 'cors'
        };

        fetch('https://localhost:44326/api/Cuestionario/Resolucion', options)
            .then(response => {
                return response.json()
            })
            .then(json => {
                agregarCalificacion(json);
                DeshabilitarOpciones();
                DeshabilitarBoton();
                return json;
            })
            .catch(err => console.log('ERROR: ' + err))
    }
    else {
        Swal.fire({
            type: 'error',
            title: 'Responda a todas las preguntas',
            /*text: 'Responda a todas las preguntas',*/
            showConfirmButton: true,
            confirmButtonColor: '#48D1CC'
        })
    }

}

function agregarCalificacion(resolucion) {
    var informacion = document.getElementById("header-cuestionario");
    informacion.innerHTML += `<div class="calificacion"> ${("--> CALIFICACION: " + resolucion.calificacionTotal + "/10 <--")} </div>`;

    //MODIFICADO
    var i = 1;
    resolucion.respuestas.forEach(respuesta => {
        if (respuesta.respuestaAlumno == respuesta.respuestaCorrecta) {
            var informacion = document.getElementById("estado" + i);
            informacion.innerHTML += `<i class="correct fas fa-check-circle"></i>`;
            console.log("CORRECTA");
        } else {
            var informacion = document.getElementById("estado" + i);
            informacion.innerHTML += `<i class="false fas fa-times"></i>`;
            console.log("FALSA");
        }
        i++;
    })
    //END
    RevisarCalificaciones(resolucion);



}
function RevisarCalificaciones(resolucion) {
    var idClase = sessionStorage.getItem("idClase");

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + localStorage.getItem("token")
        },
        mode: 'cors'
    };

    fetch('https://localhost:44308/api/Curso/GetClasesByIdClase?idClase=' + idClase, options)
        .then(response => {
            return response.json()
        })
        .then(json => {
            RegistrarCalificacion(resolucion, json);
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))

}
function EvaluarCondicion(resolucion, clases) {
    var estudiante = parseInt(localStorage.getItem('UsuarioId'));

    var idClase = sessionStorage.getItem("idClase");
    var registros = JSON.parse(sessionStorage.getItem("registros"));

    var dicc = {}
    registros.forEach(registro => {
        if (registro.estudianteId == estudiante) {
            dicc[registro.claseId] = registro.calificacion
        }
    });
    var clasesTotales = clases.length;
    var clasesCalificadas = 0;
    var calificacionTotal = resolucion.calificacionTotal;
    var NoCalificadaLaActual = false;
    var cursoId;

    clases.forEach(clase => {
        cursoId = clase.cursoId;
        if (dicc[clase.claseId] != undefined) {
            calificacionTotal = calificacionTotal + dicc[clase.claseId];
            clasesCalificadas++;
        }
        else if (clase.claseId == idClase) {
            NoCalificadaLaActual = true;
        }

    })
    if (clasesTotales == (clasesCalificadas + 1) && NoCalificadaLaActual == true) {
        if (calificacionTotal / clasesTotales >= 5) {
            ActualizarEstado(cursoId, "Aprobado");
            var informacion = document.getElementById("header-cuestionario");
            informacion.innerHTML += `<div class="estado-final" id="aprobado"> ${"Promedio total: " + Math.round(calificacionTotal / clasesTotales * 100) / 100 + " Curso aprobado!"} </div>`;

            Swal.fire({
                type: 'success',
                title: 'Curso aprobado!',
                text: 'Tu promedio de calificaciones es de ' + (Math.round(calificacionTotal / clasesTotales * 100) / 100),
                showConfirmButton: true,
                confirmButtonColor: '#48D1CC'
            })
        }
        else {
            ActualizarEstado(cursoId, "Desaprobado");
            var informacion = document.getElementById("header-cuestionario");
            informacion.innerHTML += `<div class="estado-final" id="desaprobado"> ${"Promedio total: " + Math.round(calificacionTotal / clasesTotales * 100) / 100 + " Curso desaprobado"} </div>`;
            Swal.fire({
                type: 'error',
                title: 'Curso desaprobado',
                text: 'Tu promedio de calificaciones es de ' + (Math.round(calificacionTotal / clasesTotales * 100) / 100) + ". Es menor a 5",
                showConfirmButton: true,
                confirmButtonColor: '#48D1CC'
            })
        }
    }
}
//success", "error", "warning", "info" or "question", got "successs"

function ActualizarEstado(cursoId, estado) {
    var estudiante = parseInt(localStorage.getItem('UsuarioId'));

    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + localStorage.getItem("token")
        },
        mode: 'cors'
    };

    fetch('https://localhost:44302/api/EstudianteCurso?idCurso=' + cursoId + '&idEstudiante=' + estudiante + '&estado=' + estado, options)
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('ERROR: ' + err))
}

function RegistrarCalificacion(resolucion, clases) {


    var idClase = sessionStorage.getItem("idClase");
    var registros = JSON.parse(sessionStorage.getItem("registros"));


    var registro = new Registro(parseInt(localStorage.getItem('UsuarioId')), idClase, resolucion.calificacionTotal);

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + localStorage.getItem("token")
        },
        body: JSON.stringify(registro),
        mode: 'cors'
    };

    fetch('https://localhost:44326/api/Registro/PostConClase', options)
        .then(response => {
            return response.json()
        })
        .then(json => {
            EvaluarCondicion(resolucion, clases);
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))

}

function DeshabilitarBoton() {
    document.getElementById("enviar-cuestionario").disabled = true;
}

function DeshabilitarOpciones() {
    var lista = JSON.parse(localStorage.getItem("ListaDimensiones"));

    var i = 1;
    lista.forEach(preguntas => {
        var j = 0;
        preguntas.forEach(respuestas => {
            document.getElementsByName("respuesta" + i)[j].disabled = true;
            j++
        })
        i++;
    })

}


function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}