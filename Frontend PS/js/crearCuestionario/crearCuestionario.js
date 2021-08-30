import {
    CuestionarioTodoDTO,
    PreguntaConRespuestaDTO,
    RespuestaDescripcionDTO
} from "./Constant.js";

var CLASEID = 11;

window.onload = () => {

debugger

    sessionStorage.setItem("respuestas1", 2);
    sessionStorage.setItem("preguntas", 1);
    /* COMPROBAR SI YA TIENE ESTA UN CUESTIONARIO*/
    /* COMPROBAR SI EL PROFESOR TIENE A ESE CURSO*/
    if (localStorage.getItem('ClaseCreadaId') != null) {
        CLASEID = parseInt( localStorage.getItem('ClaseCreadaId') );
    } else {
        /*DeshabilitarCuestionario();
        window.location.href='./index.html'*/
        console.log("No hay clase en el localstorage");

    }

}

$(document).on('click', '#enviar-cuestionario', async function () {
    var cuestionario;
    var preguntas = [];
    var calificacionTotal = 0;

    for (var i = 1; i <= JSON.parse(sessionStorage.getItem("preguntas")); i++) {
        var respuesta;
        var respuestas = [];
        calificacionTotal += parseFloat(document.getElementById("input-calificacion" + i).value);
        for (var j = 1; j <= JSON.parse(sessionStorage.getItem("respuestas" + i)); j++) {

            if ($(`input[name=${"estado"+i}]:checked`).val() == j) {
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
    cuestionario = new CuestionarioTodoDTO(document.getElementById("input-cuestionario").value, CLASEID, preguntas);
    /*console.log(JSON.stringify(cuestionario));*/

    console.log(calificacionTotal);
    if (calificacionTotal == 10) {
        DeshabilitarCuestionario();

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cuestionario),
            mode: 'cors'
        };
        await fetch("https://localhost:44326/api/Cuestionario", options)
            .then(response => {
                if (response.status == 201) {
                    Swal.fire({
                        type: 'success',
                        title: 'Cuestionario creado exitosamente!',
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





        localStorage.removeItem('datos');
        localStorage.removeItem('clases');
        localStorage.removeItem('cursos');
        localStorage.removeItem('claseU');
        localStorage.removeItem('cursoCreadoId');
        localStorage.removeItem('ClaseCreadaId');

        window.location.href = "./Curso1.html";
    } else {
        alert("la suma de las calificaciones debe dar como resultado 10.")
    }
});

async function RegistrarCuestionario(cuestionario) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cuestionario),
        mode: 'cors'
    };
    await fetch("https://localhost:44326/api/Cuestionario", options)
        .then(response => {
            if (response.status === 201) {
                Swal.fire({
                    type: 'success',
                    title: 'Cuestionario creado exitosamente!',
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