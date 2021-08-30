
login();

$('#cerrar_sesion').on("click", function () {

    localStorage.removeItem('Token');
    localStorage.removeItem('datos');
    localStorage.removeItem('UsuarioId');
    localStorage.removeItem('clases');
    localStorage.removeItem('cursos');
    localStorage.removeItem('claseU');

    window.location.href = "./Login.html";

});

function login() {

    var token = DecodeToken(localStorage.getItem('Token'));


    $('#usuario').empty();
    $('#usuario').append(`<i class="far fa-user"></i>`);
    $('#drp-nombre').append(`${token.Nombre + " " + token.Apellido} `);

}


function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}