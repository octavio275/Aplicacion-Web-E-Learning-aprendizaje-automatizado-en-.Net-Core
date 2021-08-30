$(document).ready(function () {

    if (localStorage.getItem('datosProfesor') == null) {
        traerDatos_del_profesor();
    }
    else {


        var data = JSON.parse(localStorage.getItem('datosProfesor'));

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
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-pencil-alt"></i> ${clase.descripcion} </a>
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
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-pencil-alt"></i> ${clase.descripcion} </a>
                        </li>`;

                    ul.append(li);

                });

            }
        });

        ////////////////////

        var listaClases = JSON.parse(localStorage.getItem('claseUProfesor'));
        var contenido = $('.centro');

        contenido.empty();

        var principal = `<div class="texto" style="border-bottom-style: double; border-width: 1px;">
                            <h4> ${listaClases.descripcion} </h4>
                        </div>
    
                        <div class = "texto-principal"> <p> ${listaClases.tema} </p> </div>
                        
    
                        <div class="texto" >
                                   <div class="embed-responsive embed-responsive-16by9">
                                        <iframe width="560" height="315" src="${listaClases.video.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                               </div>
                        `;

        contenido.append(principal);


    }

});

async function traerDatos_del_profesor() {

    var id = parseInt(localStorage.getItem('ProfesorId'));


    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("Token_profesor")
        },
        mode: 'cors'
    };

    await fetch(`https://localhost:51148/api/Profesor/${id}`, options)
        .then(responce => responce.json())
        .then(data => {



            localStorage.setItem('datosProfesor', JSON.stringify(data));

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
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-pencil-alt"></i> ${clase.descripcion} </a>
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
                            <a href="#" class="Nclases nav-link text-dark bg-light" id = "${clase.descripcion}" ><i class="fas fa-pencil-alt"></i> ${clase.descripcion} </a>
                        </li>`;

                        ul.append(li);

                    });

                }
            });
        })
}





$(document).on('click', '.Nclases', function () {



    var cursos = JSON.parse(localStorage.getItem('datosProfesor'));
    var encontrado = false;
    var i = 0;
    while (!encontrado) {
        if (cursos[i].clasesNavegacion.find(x => x.descripcion == this.id) != null) {
            localStorage.setItem('clasesProfesor', JSON.stringify(cursos[i].clasesNavegacion));
            localStorage.setItem('cursosProfesor', JSON.stringify(cursos[i]));
            encontrado = true;
        }
        else {
            i++;
        }
    }

    var listaClases = JSON.parse(localStorage.getItem('clasesProfesor')).find(x => x.descripcion == this.id);
    localStorage.setItem('claseUProfesor', JSON.stringify(listaClases));
    var contenido = $('.centro');

    contenido.empty();

    var principal = `<div class="texto" style="border-bottom-style: double; border-width: 1px;">
                        <h4> ${listaClases.descripcion} </h4>
                    </div>

                    <div class = "texto-principal"> <p> ${listaClases.tema} </p> </div>
                    

                    <div class="texto" >
                               <div class="embed-responsive embed-responsive-16by9">
                                    <iframe width="560" height="315" src="${listaClases.video.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                           </div>
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


