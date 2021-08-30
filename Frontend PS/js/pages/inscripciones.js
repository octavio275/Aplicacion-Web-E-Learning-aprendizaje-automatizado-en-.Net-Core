
import * as ProfesorService from "./ProfesorService.js";


$(document).ready(function () {
    ProfesorService.default().then(x => CargarCursos(x));

});

function CargarCursos(profesores) {
    var dicc = {}
    profesores.forEach(profesor => {
        /*console.log(profesor.profesorId);*/
        dicc[profesor.profesorId] = profesor.nombre + " " + profesor.apellido
    });
    var c1 = $('#home');
    var c2 = $('#profile');
    var c3 = $('#contact');
    //var dict = {}; 
    fetch('https://localhost:44308/api/Curso/GetAll')
        .then(responce => responce.json())
        .then(data => {
            sessionStorage.setItem("cursos", JSON.stringify(data));
            var i = 0;
            $.each(data, function (index, cursos) {
                var text = `<div class="card d-inline-block" style="width: 18rem;">
                                <img src="${cursos.imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title"> ${cursos.nombre} </h5>

                                    <div class = "cont">
                                        <span class="badge badge-success"> Capacidad: ${cursos.cantidad}</span>
                                        <p> Profesor: ${dicc[cursos.profesor]}</p>
                                        <div>
                                            <button type="button" class="alta btn btn-primary btn-sm" id = '${"inscripcion" + cursos.cursoId}' value="${cursos.cursoId}"> Inscribirse </button>
                                            <button type="button" class="detalles btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModal" id = "${cursos.nombre}" value = '${i}'> detalles </button>
                                        </div>

                                    </div>
                                    
                                </div>
                            </div>`;
                if (cursos.categoria == "Programacion") {
                    c1.append(text);
                }
                if (cursos.categoria == "Idiomas") {
                    c2.append(text);
                }
                if (cursos.categoria == "Ciencias exactas") {
                    c3.append(text);
                }
                /*
                if(cursos.categoria == "Programacion")
                {
                    var text = `<div class="card d-inline-block" style="width: 18rem;">
                                    <img src="${cursos.imagen}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title"> ${cursos.nombre} </h5>
    
                                        <div class = "cont">
                                            <span class="badge badge-success"> Capacidad: ${cursos.cantidad}</span>
                                            <p> Profesor: ${dicc[cursos.profesor]}</p>
                                            <div>
                                                <button type="button" class="alta btn btn-primary btn-sm" id = "${cursos.cursoId}"> Inscribirse </button>
                                                <button type="button" class="detalles btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModal" id = "${cursos.nombre}" value = '${i}'> detalles </button>
                                            </div>
    
                                        </div>
                                        
                                    </div>
                                </div>`;
                    c1.append(text);
                }
                if(cursos.categoria == "Idiomas")
                {
                    var text = `<div class="card d-inline-block" style="width: 18rem;">
                                    <img src="${cursos.imagen}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title"> ${cursos.nombre} </h5>
    
                                        <div class = "cont">
                                            <span class="badge badge-success"> Capacidad: ${cursos.cantidad}</span>
                                            <p> Profesor: ${dicc[cursos.profesor]}</p>
                                            <div>
                                                <button type="button" class="alta btn btn-primary btn-sm" id = "${cursos.cursoId}"> Inscribirse </button>
                                                <button type="button" class="detalles btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModal" id = "${cursos.nombre}" value = "${i}"> detalles </button>
                                            </div>
    
                                        </div>
    
                                    </div>
                                </div>`;
                    c2.append(text);
                }
                if(cursos.categoria == "Ciencias exactas")
                {
                    var text = `<div class="card d-inline-block" style="width: 18rem;">
                                    <img src="${cursos.imagen}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title"> ${cursos.nombre} </h5>
    
    
                                        <div class = "cont">
                                            <span class="badge badge-success"> Capacidad: ${cursos.cantidad}</span>
                                            <p> Profesor: ${dicc[cursos.profesor]}</p>
                                            <div>
                                                <button type="button" class="alta btn btn-primary btn-sm" id = "${cursos.cursoId}"> Inscribirse </button>
                                                <button type="button" class="detalles btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModal" id = "${cursos.nombre}" value = "${i}"> detalles </button>
                                            </div>
    
                                    </div>
                                    </div>
                                </div>`;
                    c3.append(text);
                }*/
                i++;
            });
            ComprobarIncripciones();
        });
}
function ComprobarIncripciones() {
    debugger
    var alumnoId = parseInt(localStorage.getItem('UsuarioId'));
    let url = "https://localhost:44302/api/EstudianteCurso/cursos/" + alumnoId;
    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("Token")
        }
    })
        .then(response => {
            return response.json()
        })
        .then(json => {

            DeshabilitarBotones(json, alumnoId);
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))
}

function DeshabilitarBotones(tablacursos, alumnoId) {
    for (var i = 0; i <= tablacursos.length; i++) {
        if (tablacursos[i].estudianteID == alumnoId) {
            document.getElementById("inscripcion" + (tablacursos[i].cursoID)).disabled = true;
            $('#inscripcion' + (tablacursos[i].cursoID)).empty();
            var contenido = $('#inscripcion' + (tablacursos[i].cursoID));
            var text = `Inscripto`;
            contenido.append(text);
        }
    }
}

$(document).on('click', '.detalles', function () {
    var objeto_curso = JSON.parse(sessionStorage.getItem("cursos"))[this.value];

    $('.modal-video').empty();
    var contenido = $('.modal-video');
    var texto = `
    <div class="texto" >
        <div class="embed-responsive embed-responsive-16by9">
            <iframe width="560" height="315" src="${objeto_curso.link_intro}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>`
    contenido.append(texto);


    $('.modal-body').empty();
    var contenido = $('.modal-body');
    $('#exampleModalLabel').text(objeto_curso.nombre);
    var text = `<p> Objetivos: ${objeto_curso.descripcion}</p>`;
    contenido.append(text);

    $('.modal-footer').empty();
    contenido = $('.modal-footer');
    texto = `
    <button type="button" class="alta inscripcion btn btn-primary btn-sm" id = "${objeto_curso.cursoId}" value='${objeto_curso.cursoId}'> Inscribirse </button>
    `
    contenido.append(texto);
});


// evento de inscribirse

$(document).on('click', '.alta', function () {

    //var token = DecodeToken(localStorage.getItem('Token'));
    console.log(this.value);


    document.getElementById("inscripcion" + (this.value)).disabled = true;

    let objeto = {
        "cursoID": parseInt(this.value), //valor preseteado
        "estudianteID": parseInt(localStorage.getItem('UsuarioId')),
        "estado": "En curso"
    }
    fetch('https://localhost:44302/api/EstudianteCurso', {
        method: 'POST',
        body: JSON.stringify(objeto), // data can be `string` or {object}!
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("Token")
        },
    })
        .then(response => {
            return response.json()
        })
        .then(function (objeto) {
            /*alert('Incripcion realizada');*/
            Swal.fire({
                type: 'success',
                title: 'Inscripcion Realizada',
                /*text: 'Responda a todas las preguntas',*/
                showConfirmButton: true,
                confirmButtonColor: '#48D1CC'
            })
        })
        .catch(err => console.log('ERROR: ' + err));
});

$(document).on('click', '#ACursos', function () {

    localStorage.removeItem('datos');
    localStorage.removeItem('clases');
    localStorage.removeItem('cursos');
    localStorage.removeItem('claseU');
    window.location.href = "./Curso1.html";
})



// myform.submit((event) => {
//     event.preventDefault();

//     // Change to your service ID, or keep using the default service
//     var service_id = "default_service";
//     var template_id = "template_3SA9LsqQ";

//     const cargandoGif = document.querySelector('#cargando');
//     cargandoGif.style.display = 'block';

//     const enviado = document.createElement('img');
//     enviado.src = 'img/mail.gif';
//     enviado.style.display = 'block';
//     enviado.width = '150';

//     emailjs.sendForm(service_id, template_id, myform[0])
//         .then(() => {
//             cargandoGif.style.display = 'none';
//             document.querySelector('#loaders').appendChild(enviado);

//             setTimeout(() => {
//                 compra.vaciarLocalStorage();
//                 enviado.remove();
//                 window.location = "index.html";
//             }, 2000);


//         }, (err) => {
//             alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
//             // myform.find("button").text("Send");
//         });

//     return false;

// });

function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}