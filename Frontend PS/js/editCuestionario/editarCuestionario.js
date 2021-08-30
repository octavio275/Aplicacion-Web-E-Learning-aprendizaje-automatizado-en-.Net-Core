import {
    CuestionarioTodoDTO,
    PreguntaConRespuestaDTO,
    RespuestaDescripcionDTO
} from "../crearCuestionario/Constant.js";

import * as CuestionarioService from "../cuestionario/CuestionarioService.js";


window.onload = () => {


    sessionStorage.setItem("respuestas1", 2);
    sessionStorage.setItem("preguntas", 1);
    /* COMPROBAR SI YA TIENE ESTA UN CUESTIONARIO*/
    /* COMPROBAR SI EL PROFESOR TIENE A ESE CURSO*/

    var id = 1;
    if (localStorage.getItem("claseU") != null) {
        id = JSON.parse(localStorage.getItem("claseU")).claseId;
        CargarCuestionario(id);
    } else {
        /*DeshabilitarCuestionario();
        window.location.href='./index.html'*/
        console.log("No hay clase en el localstorage");
    }


}


function CargarCuestionario(id) {
    CuestionarioService.default(id).then(x => LoadCuestionario(x));
}


function LoadCuestionario(CuestionarioTodoDTO) {
    console.log(CuestionarioTodoDTO);
    window.sessionStorage.setItem("idClase", CuestionarioTodoDTO.claseId);
    var i = 1;

    var contenido = $('.cuestionario');

    var tema = `
    <div class="cuestionario-descripcion">
        <label for="cuestionario" required>Descripción del Cuestionario:</label>
        <input type="text" placeholder="Descripcion" class="input-cuestionario" id="input-cuestionario"
            value='${CuestionarioTodoDTO.descripcion}' required />
    </div>
    `;
    contenido.append(tema);

    var contenido = $('.conteiner-bloques');

    CuestionarioTodoDTO.preguntas.forEach(preguntas => {

        var text = `
        <div class="bloque-pregunta" id=${"bloque-pregunta" + i}>
        <div class="pregunta">
        <label for="pregunta" required>${"Pregunta " + i + ":"}</label>
        </div>
        <div class="input-pregunta">
        <input type="text" placeholder="pregunta" class="input-preg" id=${"input-pregunta" + i} value='${preguntas.descripcion}' required />
        </div>
        <div class="detalles">
        <div class="calificacion">
        <label for="calificacion" required>Calificacion</label>
        <input type="number" class="input-calificacion" id=${"input-calificacion" + i} value=${preguntas.calificacionParcial} required />
        </div>
        </div>
        <div class="respuesta">
        <label for="respuesta">Respuestas:</label>
        </div>
        <div class=${"conjunto-respuestas" + i} id=${"conjunto-respuestas" + i}>
        `;
        contenido.append(text);
        var j = 1;
        var contenido2 = $("#conjunto-respuestas" + i);
        preguntas.respuestas.forEach(respuestas => {

            var text2 = `
            <div class="respuestas" id=${"respuesta" + j + "-p" + i}>
            <div class="radio-button"><input type="radio" name=${"estado" + i} id=${"radio" + i + "-" + j} value=${"" + j}
            ></div>
            <label for="respuesta" class="num-resp" required>${j + "."}</label>
            <input type="text" class="input-resp" placeholder="respuesta" id=${"input-respuesta" + i + j}
            value='${respuestas.descripcion}' required />
            </div>
            `;

            contenido2.append(text2);
            if (respuestas.flag) {
                var id = "radio" + i + "-" + j;
                document.getElementById(id).checked = true
            }

            sessionStorage.setItem("respuestas" + i, j);
            j++;
        })
        text = `
        </div>
        `
        contenido2.append(text);

        contenido = $("#bloque-pregunta" + i);

        text = `
        <div class="botones">
        <div class="boton-add">
        <button type="submit" class="mas-respuestas btn btn-primary" id=${"mas-respuestas" + i} value=${i}>
        Agregar Respuesta </button>
        </div>
        <div class="boton-del">
        <button type="submit" class="menos-respuestas btn btn-danger" id=${"menos-respuestas" + i} value=${i} >
        - </button>
        </div>
        </div>
        `
        contenido.append(text);

        contenido = $('.conteiner-bloques');
        text = `</div>`
        contenido.append(text);

        sessionStorage.setItem("preguntas", i);

        if (sessionStorage.getItem("respuestas" + i) <= 2 || sessionStorage.getItem("respuestas" + i) == 10) {
            document.getElementById("menos-respuestas" + i).disabled = true;
        }

        i++;

    })
    if (sessionStorage.getItem("preguntas") <= 1 || sessionStorage.getItem("preguntas") == 120) {
        document.getElementById("menos-preguntas").disabled = true;
    }
}

$(document).on('click', '#enviar-cuestionario', function () {
    var cuestionario;
    var preguntas = [];
    var calificacionTotal = 0;
    for (var i = 1; i <= JSON.parse(sessionStorage.getItem("preguntas")); i++) {

        var respuesta;
        var respuestas = [];
        calificacionTotal += parseFloat(document.getElementById("input-calificacion" + i).value);
        for (var j = 1; j <= JSON.parse(sessionStorage.getItem("respuestas" + i)); j++) {
            if ($(`input[name=${"estado" + i}]:checked`).val() == j) {
                respuesta = new RespuestaDescripcionDTO(document.getElementById("input-respuesta" + i + j).value, true);

            } else {
                respuesta = new RespuestaDescripcionDTO(document.getElementById("input-respuesta" + i + j).value, false);
            }
            respuestas.push(respuesta);

        }
        var pregunta = new PreguntaConRespuestaDTO(document.getElementById("input-pregunta" + i).value,
            document.getElementById("input-calificacion" + i).value, respuestas);
        preguntas.push(pregunta);
    }
    cuestionario = new CuestionarioTodoDTO(document.getElementById("input-cuestionario").value,
        JSON.parse(localStorage.getItem("claseU")).claseId, preguntas);
    /*console.log(JSON.stringify(cuestionario));*/
    console.log(cuestionario);

    console.log(calificacionTotal);
    if (calificacionTotal == 10) {
        DeshabilitarCuestionario();
        ActualizarCuestionario(cuestionario);
    } else {
        alert("la suma de las calificaciones debe dar como resultado 10.")
    }
});

function ActualizarCuestionario(cuestionario) {

    /* debugger */
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cuestionario),
        mode: 'cors'
    };
    fetch("https://localhost:44326/api/Cuestionario", options)
        .then(response => {
            if (response.status == 200) {
                Swal.fire({
                    type: 'success',
                    title: 'El cuestionario se actualizó correctamente',
                    showConfirmButton: true,
                    confirmButtonColor: '#48D1CC'
                })
            }
            return response.json();
        })
        .then(json => {
            console.log("Registrado");
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))
}

$('#atras').on('click', function () {
    window.location.href = "./cuestionario.html";
});