
$("#EnviarClase").on("click", function () {
    debugger
    crearClase();
})


   async function crearClase() {

        var video = {
            "descripcion": $('#inputDescVideo').val(),
            "link": $('#inputVideo').val()
        }

        var foro = {
            //"foroId": JSON.parse(localStorage.getItem('claseU')).foro.foroId,
            "texto": $('#inputForo').val()
        }

        var CursoId = 0;

        if( (localStorage.getItem('claseU')) == null )
        {
            CursoId = parseInt( localStorage.getItem('cursoCreadoId'));
        }
        else
        {
            CursoId = JSON.parse(localStorage.getItem('claseU')).cursoId;
        }

        let bodyClase = {

            "descripcion": $("#inputDescripcion").val(),
            "cursoId": CursoId,
            "tema": $("#inputTema").val(),
            "video": video,
            "foro": foro
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyClase),
            mode: 'cors'
        };

       await fetch('https://localhost:44308/api/Clase', options)
            .then( response => response.json())
            .then( data => {
                localStorage.setItem('ClaseCreadaId', data.claseId);

                window.location.href = './crearCuestionario.html'
            })
            .catch(err => console.log('ERROR:' + err));

    }
