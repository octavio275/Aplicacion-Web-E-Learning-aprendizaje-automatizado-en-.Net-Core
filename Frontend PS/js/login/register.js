$('#registrar').on("click", Registrar);



//EN LA VALIDACION COMPROBAR QUE EL CORREO NO ESTÉ REGISTRADO EN LA BD
function cargando() {
  return Swal.fire({
    title: "Cargando...",
    showConfirmButton: false,
    allowOutsideClick: false,
    imageUrl: "../imagenes/load.gif"
  });
}

async function Registrar() {
  // funcion de registrar

  var _nombre = document.getElementById("nombre").value;
  var _apellido = document.getElementById("apellido").value;
  var _dni = document.getElementById("dni").value;
  var _email = document.getElementById("correo").value;
  var _contrasenia = document.getElementById("contraseña").value;

  var usuario = new RequestUsuario(_nombre, _apellido, _email, 2, _contrasenia);


  if (validarTexto(_nombre) && validarTexto(_apellido) && validarDNI(_dni) && validarEmail(_email) && validarContrasenia(_contrasenia)) {
    var carga = cargando();

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
    await fetch('https://localhost:44351/api/Usuario', options)
      .then(response => response.json())
      .then(data => {
        console.log("se registro correctamente");
      })
      .catch(err => {
        console.log("Ha ocurrido un error con el registro:" + err);
      });




    // funcion de login

    var usuario = new RequestUsuarioLogin(_email, _contrasenia);

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
        localStorage.setItem('Token', json);
        console.log("se logueo correctamente")
      })
      .catch(err => console.log('Ha ocurrido un error:' + err));





    // funcion de crear un alumno 

    var token = DecodeToken(localStorage.getItem('Token'));
    var estudiante = {
      "nombre": $('#nombre').val(),
      "apellido": $('#apellido').val(),
      "email": $('#correo').val(),
      "usuarioId": parseInt(token.UsuarioId),
      "dni": $('#dni').val()
    };
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("Token")
      },
      body: JSON.stringify(estudiante),
      mode: 'cors'
    };

    await fetch('https://localhost:44302/api/Estudiante', options)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('UsuarioId', data.estudianteID);
        console.log("el alumno se creo");
      });


    if (token.Rol == "2") {

      window.location.href = './Inscripcion.html'
    }
  }

}

function DecodeToken(token) {
  var base64Url = (token).split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}


class RequestUsuario {
  constructor(nombre, apellido, email, rolId, contrasenia) {
    this.nombre = nombre,
      this.apellido = apellido,
      this.email = email,
      this.rolid = rolId;
    this.contraseña = contrasenia
  }
}

class RequestUsuarioLogin {
  constructor(email, contraseña) {
    this.email = email,
      this.contraseña = contraseña
  }
}