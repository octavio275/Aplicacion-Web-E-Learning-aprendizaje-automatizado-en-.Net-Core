$(document).ready(function() {

    var nav = $('#nav_bar');

    var html = `<a class="navbar-brand" href="#"> <i class="fas fa-home"></i> </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
  
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                    <a class="nav-link" href="#">¿Porque Nosotros?</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Comunidad</a>
                    </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Consultas</a>
                        </li>


                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Cursos</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item bg-light" href="Curso1.html">Curso 1</a>    
                                <a class="dropdown-item bg-light" href="#">Curso 2</a>
                                <a class="dropdown-item bg-light" href="#">Curso 3</a>
                            </div>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#"> Darse de baja </span></a>
                    </li>
                    </ul>
                  

                    <li>
                    <div class="dropdown">
                        <button><i class="  fas fa-user-alt w3-margin-top " aria-hidden="true" style='font-size:24px'></i></button>
                        <div class="dropdown-content" id="dropdown">
                            <a href="login.html" onclick="iniciarSesion();">Iniciar sesión</a>
        
                        </div>
                    </div>
                </li>
                </div>`;

    nav.append(html);

    var body = $('#body');

    var text = `
    <div id="class">
        <p style="text-align: center"> <i class="fas fa-book-open"></i> Clases</p>
        
        <ul class="nav flex-column">
            <li class="nav-item">
                <a href="#" class="nav-link text-dark bg-light">
                    <i class="fas fa-pencil-alt"></i>
                    Tema Clase
                </a>
            </li>
            
            <li class="nav-item">
                <a href="#" class="nav-link text-dark bg-light">
                    <i class="fas fa-pencil-alt"></i>
                    Tema Clase
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-dark bg-light">
                    <i class="fas fa-pencil-alt"></i>
                    Tema Clase
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-dark bg-light">
                    <i class="fas fa-pencil-alt"></i>
                    Tema Clase
                </a>
            </li>
        </ul>
    </div>`;
    body.append(text);


    var main = $('#main');

    var texthtml = `<div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link text-dark" href="#">Contenido </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-dark" href="#">Actividades</a>
                            </li>
                        </ul>
                    </div>`;
                    
    main.append(texthtml);


  });