$(document).ready(function () {

    let cursos = JSON.parse(sessionStorage.getItem("cursos"));
    var carouselInn = $('.carousel-inner');
    var is_active = true;
    let i = 0;
    $.each(cursos, function (index, curso) {


        if (curso.cantidad < 5) {
            let textCursos = ` 
                <div class="carousel-item ${is_active ? "active" : ""}">
                    <img class="d-block" src="${curso.imagen}" style="height: 300px;"alt="imagen de curso">
                    <div class="carousel-caption d-none d-md-block" >
                        <a href="#myTab"><h5 style="font-size: 1.6rem; color: ccebb0;">¡Pocas vacantes!</h5>
                        <p style="font-size: 0.9rem;">${curso.nombre}</p></a>
                    </div>
                </div>`;
            is_active = false;
            carouselInn.append(textCursos);
            if (!is_active) {
                let carouselIndicator = `<li data-target="#myCarousel" data-slide-to="${i}" ></li>`
                $('.carousel-indicators').append(carouselIndicator);
                i++
            };
        }

    })

});