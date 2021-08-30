
var ID = 0;

$("#confirmarBaja").on("click", function () {

    var estudianteId = parseInt(localStorage.getItem('UsuarioId'));


    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("Token")
            },
        mode: 'cors',
        url: `https://localhost:44302/api/EstudianteCurso?estudianteId=${estudianteId}&cursoId=${parseInt(ID)}`,
        type: "DELETE",


        success: function (data) {
        localStorage.removeItem('cursos');
        localStorage.removeItem('clases');
        localStorage.removeItem('datos'); //corregir el setitem de datos
        location.reload();

        }
    });
});

$(document).on('click', '#btnDarBaja', function(){
    
    var select = $('#lista');

    select.empty();

    $.each(JSON.parse(localStorage.getItem('datos')), function (index, curso) {

        var text = `<option id = "${curso.nombre}" value="${curso.cursoId}"> ${curso.nombre} </option>`;

        select.append(text);
    });
});

$(document).on('click', '.form-control', function(){

    ID = this.value;
});
