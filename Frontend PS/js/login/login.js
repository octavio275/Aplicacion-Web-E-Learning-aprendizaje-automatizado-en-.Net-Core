$('#ingresar').on("click", Ingresar);

/*
window.onunload = () =>{ 
    window.localStorage.clear;
    window.localStorage.removeItem('token'); 
};*/
/*
window.onbeforeunload = function() { 
    window.localStorage.removeItem('token');
};*/
async function Ingresar() {

    //debugger
    // funcion de login

    var correo = document.getElementById("correo-login").value;
    var contrasenia = document.getElementById("contrasenia-login").value;
    var usuario = new RequestUsuarioLogin(correo, contrasenia);


    /*console.log(validarDNI(correo));
    console.log(validarEmail(correo));*/
    if (validarEmail(correo) && validarContrasenia(contrasenia)) {

        cargando();
        $('#mensaje').empty();

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //"Authorization": "Bearer" + localStorage.getItem("token")
            },
            body: JSON.stringify(usuario),
            mode: 'cors'
        };

        await fetch('https://localhost:44351/api/Usuario/usuario', options)
            .then((response) => response.json())
            .then(json => {

                var token = DecodeToken(json);
                var usuarioId = parseInt(token.UsuarioId);
                localStorage.setItem('Token', json);

                if (token.Rol == "1") {
                    console.log("el login profesor exitoso");

                    var optionsGet = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem("Token")
                        },
                        mode: 'cors'
                    };

                    fetch(`https://localhost:44302/api/Profesor/ObtenerIdProfesor?usuarioId= ${usuarioId}`, optionsGet)
                        .then(response => response.json())
                        .then(data => {

                            localStorage.setItem('UsuarioId', data);
                            window.location.href = "./Curso1.html";
                        })

                } else {
                    console.log("el login estudiante exitoso");

                    var opt = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem("Token")
                        },
                        mode: 'cors'
                    };

                    fetch(`https://localhost:44302/api/Estudiante/ObtenerIdEstudiante/${usuarioId}`, opt)
                        .then(response => response.json())
                        .then(data => {

                            localStorage.setItem('UsuarioId', data);
                            window.location.href = "./Curso1.html";
                        })

                }
            })
            .catch(err => console.log('ERROR:' + err));
    }


}


function cargando() {
    return Swal.fire({
      title: "Cargando...",
      showConfirmButton: false,
      allowOutsideClick: false,
      imageUrl: "../imagenes/load.gif"
    });
  }

function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

class RequestUsuarioLogin {
    constructor(email, contraseña) {
        this.email = email,
            this.contraseña = contraseña
    }
}