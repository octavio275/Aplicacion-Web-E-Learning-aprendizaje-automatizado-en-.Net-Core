/*
function validarEmail(valor) {
    debugger;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)){
        return true;
    } else {
        return false;
    }
  }*/


function validarEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (expr.test(email)) {
        return true;
    }
    $('#mensaje').empty();
    var contenido = $('#mensaje');
    var text = `<label for="msg" id="incorrecto">Ingrese un correo válido</label>`;
    contenido.append(text);
    return false;
}

function validarDNI(dni){
    expr = /^[0-9]+$/;
    if (expr.test(dni) && (dni.length == 8)) {
        return true;
    }
    $('#mensaje').empty();
    var contenido = $('#mensaje');
    var text = `<label for="msg" id="incorrecto">Ingrese un DNI válido</label>`;
    contenido.append(text);
    return false;
}

function validarTexto(string){
    if (string.length > 3) {
        return true;
    }
    $('#mensaje').empty();
    var contenido = $('#mensaje');
    var text = `<label for="msg" id="incorrecto">Use mas de 3 caracteres para sus datos</label>`;
    contenido.append(text);
    return false;
}

function validarContrasenia(string){
    if (string.length > 4) {
        return true;
    }
    $('#mensaje').empty();
    var contenido = $('#mensaje');
    var text = `<label for="msg" id="incorrecto">Use más de 4 caracteres para la contraseña</label>`;
    contenido.append(text);
    return false;
}