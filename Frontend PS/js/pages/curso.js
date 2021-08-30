$(document).ready(function () {
    debugger
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
                    </li>
                    <li class="secciones nav-item">
                        <button type="button" id = "crearClase" class="btn btn-sm" style="margin-top: 30%;"> <i id = "mas" class="fas fa-plus"></i></button>
                    </li>`;

        elment.append(text);


        if (localStorage.getItem('datos') == null) {
            traerDatos_del_profesor();
        }
        else {
            mostrarCargado();
        }
    }
    else {

        var nav = $('#curso');

        var text = `<li class="nav-item">
                        <a class="nav-link" href="Inscripcion.html"> Más Cursos </a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="modal" data-target="#modalDarBaja" id="btnDarBaja"> Dar Baja </a>
                    </li>`;

        nav.append(text);

        if (localStorage.getItem('datos') == null) {
            traerDatos_del_alumno();
        }
        else {
            mostrarCargado();
        }
    }

});

async function traerDatos_del_alumno() {

    var id = parseInt(localStorage.getItem('UsuarioId'));

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("Token")
        },
        mode: 'cors'
    };

    await fetch(`https://localhost:44302/api/EstudianteCurso/GetDetalleCursos/${id}`, options)
        .then(responce => responce.json())
        .then(data => {

            localStorage.setItem('datos', JSON.stringify(data));

            var lcursos = $('#accordionExample');

            $.each(data, function (index, cursos) {

                if (lcursos.children().lenght == 0) {

                    var textCursos = `   <div class="card">

                <div class="card-header" id="heading${index}">
                    <h2 class="clearfix mb-0">
                        <span> ${cursos.nombre} </span>
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}"><i class="fa fa-plus-circle"></i></button>
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse show" aria-labelledby="heading${index}" data-parent="#accordionExample">
    
    
                    <ul class="${index} nav flex-column" id="clases">
    
                      
                    </ul>
                       
    
                </div>
                
                </div> `;

                    lcursos.append(textCursos);

                    var ul = $(`.${index}`);

                    $.each(cursos.clasesNavegacion, function (index, clase) {

                        var li = `<li class="nav-item">
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-chalkboard-teacher"></i> Clase:  ${clase.descripcion} </a>
                        </li>`;

                        ul.append(li);

                    });

                }
                else {


                    var texto = ` <div class="card">
                <div class="card-header" id="heading${index}">
                    <h2 class="mb-0">
                        <span> ${cursos.nombre} </span>
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}"><i class="fa fa-plus-circle"></i></button>
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">

                    <ul class="${index} nav flex-column" id="clases">

                      
                    </ul>


                </div>
                </div>`;

                    lcursos.append(texto);

                    var ul = $(`.${index}`);

                    $.each(cursos.clasesNavegacion, function (index, clase) {

                        var li = `<li class="nav-item">
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-chalkboard-teacher"></i> Clase:  ${clase.descripcion} </a>
                        </li>`;

                        ul.append(li);

                    });
                    $('#btnDarBaja').css('display', 'inline-block');

                }
            });
        })
}




async function traerDatos_del_profesor() {

    var id = parseInt(localStorage.getItem('UsuarioId'));


    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("Token")
        },
        mode: 'cors'
    };

    await fetch(`https://localhost:44302/api/Profesor/${id}`, options)
        .then(responce => responce.json())
        .then(data => {



            localStorage.setItem('datos', JSON.stringify(data));

            var lcursos = $('#accordionExample');

            $.each(data, function (index, cursos) {

                if (lcursos.children().lenght == 0) {

                    var textCursos = `   <div class="card">

                <div class="card-header" id="heading${index}">
                    <h2 class="clearfix mb-0">
                        <span> ${cursos.nombre} </span>
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}"><i class="fa fa-plus-circle"></i></button>
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse show" aria-labelledby="heading${index}" data-parent="#accordionExample">
    
    
                    <ul class="${index} nav flex-column" id="clases">
    
                      
                    </ul>
                       
    
                </div>
                
                </div> `;

                    lcursos.append(textCursos);

                    var ul = $(`.${index}`);

                    $.each(cursos.clasesNavegacion, function (index, clase) {

                        var li = `<li class="nav-item">
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-chalkboard-teacher"></i> Clase:  ${clase.descripcion} </a>
                        </li>`;

                        ul.append(li);

                    });

                }
                else {


                    var texto = ` <div class="card">
                <div class="card-header" id="heading${index}">
                    <h2 class="mb-0">
                        <span> ${cursos.nombre} </span>
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}"><i class="fa fa-plus-circle"></i></button>
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">

                    <ul class="${index} nav flex-column" id="clases">

                      
                    </ul>


                </div>
                </div>`;

                    lcursos.append(texto);

                    var ul = $(`.${index}`);

                    $.each(cursos.clasesNavegacion, function (index, clase) {

                        var li = `<li class="nav-item">
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-chalkboard-teacher"></i> Clase:  ${clase.descripcion} </a>
                        </li>`;

                        ul.append(li);

                    });
                }
            });
        })
}












$(document).on('click', '.Nclases', function () {


    var token = DecodeToken(localStorage.getItem('Token'));

    if (token.Rol == "2") {

        //var ul = $('#curso');

        //var text = `<li class="nav-item">
        //<a class="nav-link" data-toggle="modal" data-target="#modalDarBaja"
        //  id="btnDarBaja"> Dar Baja
        //</a>
        //</li>`;
        //ul.append(text);
        $('#btnDarBaja').css('display', 'inline-block');
    }

    var cursos = JSON.parse(localStorage.getItem('datos'));
    var encontrado = false;
    var i = 0;
    while (!encontrado) {
        if (cursos[i].clasesNavegacion.find(x => x.descripcion == this.id) != null) {
            localStorage.setItem('clases', JSON.stringify(cursos[i].clasesNavegacion));
            localStorage.setItem('cursos', JSON.stringify(cursos[i]));
            encontrado = true;
        }
        else {
            i++;
        }
    }
    var listaClases = JSON.parse(localStorage.getItem('clases')).find(x => x.descripcion == this.id);
    localStorage.setItem('claseU', JSON.stringify(listaClases));
    sessionStorage.setItem('CursoId',listaClases.cursoId);

    var contenido = $('.centro');

    contenido.empty();

    var principal = `
                    <div class="texto" style="border-bottom-style: double; border-width: 1px;">
                        <h4> ${listaClases.descripcion} </h4>
                    </div>

                    <div class="texto" >
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="${listaClases.video.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>

                    <div class = "texto-principal"> <p> ${listaClases.tema} </p> </div>
                    

                    
                    `;

    contenido.append(principal);
});



function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}



$(document).ready(function () {
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function () {
        $(this).siblings(".card-header").find(".btn i").addClass("fa-minus-circle").removeClass("fa-plus-circle");
    });

    // Toggle plus minus icon on show hide of collapse element
    $(document).on('show.bs.collapse', ".collapse", function () {

        $(this).parent().find(".card-header .btn i").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    }).on('hide.bs.collapse', function () {
        debugger
        $(this).parent().find(".card-header .btn i").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
});


function mostrarCargado() {

    var data = JSON.parse(localStorage.getItem('datos'));

    var lcursos = $('#accordionExample');

    $.each(data, function (index, cursos) {

        if (lcursos.children().lenght == 0) {

            var textCursos = `   <div class="card">

                <div class="card-header" id="heading${index}">
                    <h2 class="clearfix mb-0">
                        <span> ${cursos.nombre} </span>
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}"><i class="fa fa-plus-circle"></i></button>
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse show" aria-labelledby="heading${index}" data-parent="#accordionExample">
    
    
                    <ul class="${index} nav flex-column" id="clases">
    
                      
                    </ul>
                       
    
                </div>
                
                </div> `;

            lcursos.append(textCursos);

            var ul = $(`.${index}`);

            $.each(cursos.clasesNavegacion, function (index, clase) {

                var li = `<li class="nav-item">
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-chalkboard-teacher"></i> Clase:  ${clase.descripcion} </a>
                        </li>`;

                ul.append(li);

            });

        }
        else {


            var texto = ` <div class="card">
                <div class="card-header" id="heading${index}">
                    <h2 class="mb-0">
                        <span> ${cursos.nombre} </span>
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}"><i class="fa fa-plus-circle"></i></button>
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">

                    <ul class="${index} nav flex-column" id="clases">

                      
                    </ul>


                </div>
                </div>`;

            lcursos.append(texto);

            var ul = $(`.${index}`);

            $.each(cursos.clasesNavegacion, function (index, clase) {

                var li = `<li class="nav-item">
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-chalkboard-teacher"></i> Clase:  ${clase.descripcion} </a>
                        </li>`;

                ul.append(li);

            });
        }
    });

    ////////////////////

    var listaClases = JSON.parse(localStorage.getItem('claseU'));
    var contenido = $('.centro');

    contenido.empty();

    var principal = `<div class="texto" style="border-bottom-style: double; border-width: 1px;">
                            <h4> ${listaClases.descripcion} </h4>
                        </div>

                        <div class="texto" >
                                   <div class="embed-responsive embed-responsive-16by9">
                                        <iframe width="560" height="315" src="${listaClases.video.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                               </div>
    
                        <div class = "texto-principal"> <p> ${listaClases.tema} </p> </div>
                        
                        `;

    contenido.append(principal);

}

$(document).on('click', '#crearClase', function () {

    if (localStorage.getItem('claseU') == null) {
        alert('Primero seleccione una clase');
    }
    else {
        window.location.href = "./CrearClase.html";
    }
});