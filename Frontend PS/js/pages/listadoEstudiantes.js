$(document).ready(function () {

    var seccionList = $('.centro');

    var cursoLista = `<div id="seccionListado" style="margin: 2rem">              
                    </div>
                    <br>`;

    seccionList.append(cursoLista);



    if ($.fn.DataTable.isDataTable("#listaAlumnos")) {
        $('#listaAlumnos').DataTable().destroy();
        $('#listaAlumnos').empty();
    }
    else {
        $("#seccionListado").append(
            `<div style="margin: 1.5rem">
                    <table id="listaAlumnos" class="display" style="width:100%">
                    </table>
                </div>`
        )
    }

    let cursoId = JSON.parse(localStorage.getItem('cursos')).cursoId;

    debugger

    $('#listaAlumnos').DataTable({
        "ajax": {
            "headers": { 'Authorization': 'Bearer ' + localStorage.getItem('Token') },
            "url": "https://localhost:44302/api/EstudianteCurso/estudiante/" + cursoId,
            "dataSrc": ""
        },
        "columns": [
            { title: "Curso", data: "cursoID" },
            { title: "Nombre", data: "nombre" },
            { title: "Apellido", data: "apellido" },
            { title: "Mail", data: "email" },
            { title: "Estado", data: "estado" },
            { title: "Dni", data: "dni" }
        ]
    })

})