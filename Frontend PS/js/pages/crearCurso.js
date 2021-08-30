


        //cargaCategorias();  //por si no queremos mockear las categorias (?) (hay que tocar backend creoD:)

$("#EnviarCurso").on("click", function () {
    debugger
    crearCurso();
})
    


    /* function cargaCategorias(){
        var seccionCategoriasId = $('.form-categoriaId');
    
        fetch('https://localhost:44308/api/Curso/ObtenerCategorias')
        .then(response => response.json())
        .then(data => {
    
            localStorage.setItem('categorias', JSON.stringify(data));
    
            $.each(data, function(index, categoria){
    
                var valoresInput = `<option value="${categoria.CategoriaId}">${categoria.Descripcion}</option>`;
                seccionCategoriasId.append(valoresInput);
            })
    })} */


    function crearCurso() {

        let nombreCurso = $("#inputNombreC").val();
        let categoriaID = $("#opt-categoriaId option:selected").val();
        let descripcion = $("#inputDescripcion").val();
        let imagen = $("#inputImagen").val();
        let cantidad = $("#inputCantidad").val();
        let profesorId = parseInt(localStorage.getItem('UsuarioId'));

        let bodyCurso = {
            "Nombre": nombreCurso,
            "CategoriaId": categoriaID,
            "Descripcion": descripcion,
            "Imagen": imagen,
            "Cantidad": cantidad,
            "ProfesorId": profesorId
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyCurso),
            mode: 'cors'
        };

        fetch('https://localhost:44308/api/Curso', options)
        .then(response => {
            if (response.status == 201) {
                Swal.fire({
                    type: 'success',
                    title: 'El curso se creo correctamente. Ahora cree la clase.',
                    showConfirmButton: true,
                    confirmButtonColor: '#48D1CC'
                })
            }
            return response.json();
        })
            .then( data =>{

                localStorage.setItem('cursoCreadoId', data.cursoId);

                localStorage.removeItem('datos');
                localStorage.removeItem('clases');
                localStorage.removeItem('cursos');
                localStorage.removeItem('claseU');
                window.location.href = '/pages/CrearClase.html';
            })
            .catch(err => console.log('ERROR:' + err));

        return false;

    }
