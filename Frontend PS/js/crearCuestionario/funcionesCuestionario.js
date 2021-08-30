$(document).on('click', '.mas-respuestas', function () {

    var respuestas = JSON.parse(sessionStorage.getItem("respuestas" + this.value)) + 1;
    if (respuestas == 3) {
        document.getElementById("menos-respuestas" + this.value).disabled = false;
    }

    var id = '.conjunto-respuestas' + 1;
    
    var contenido = $('.conjunto-respuestas' + this.value);
    var text;
    if (respuestas > 10) {
        text = `
        <div class="limite-respuestas">
        <label for="respuesta" required>*Solo se pueden crear 10 respuestas.*</label>
        </div>
        `;
        document.getElementById("mas-respuestas" + this.value).disabled = true;
    } else {
        text = `
        <div class="respuestas" id=${"respuesta"+respuestas+"-p"+this.value}>
        <div class="radio-button"><input type="radio" name=${"estado"+this.value} id= ${"radio"+this.value+"-"+respuestas} value=${respuestas}></div>
        <label for="respuesta" class="num-resp" required>${respuestas}.</label>
        <input type="text" class="input-resp" placeholder="respuesta" id=${"input-respuesta"+this.value + respuestas} required/>
        </div>
        `;
        sessionStorage.setItem("respuestas" + this.value, respuestas);

    }
    
    contenido.append(text);
});

$(document).on('click', '.menos-respuestas', function () {
    var respuestas = JSON.parse(sessionStorage.getItem("respuestas" + this.value));
    $("div").remove("#respuesta" + respuestas + "-p" + this.value);
    respuestas = respuestas - 1;
    sessionStorage.setItem("respuestas" + this.value, respuestas);
    if (respuestas == 2) {
        document.getElementById("menos-respuestas" + this.value).disabled = true;
    }
    if (respuestas == 9) {
        document.getElementById("mas-respuestas" + this.value).disabled = false;
        $("div").remove(".limite-respuestas");
    }
});

$(document).on('click', '.menos-preguntas', function () {

    var preguntas = JSON.parse(sessionStorage.getItem("preguntas"));
    $("div").remove("#bloque-pregunta" + preguntas);
    preguntas = preguntas - 1;
    sessionStorage.setItem("preguntas", preguntas);

    if (preguntas == 1) {
        document.getElementById("menos-preguntas").disabled = true;
    }
    if (preguntas == 19) {
        document.getElementById("mas-preguntas").disabled = false;
        $("div").remove(".limite-preguntas");
    }
});

$(document).on('click', '#mas-preguntas', function () {
    var preguntas = JSON.parse(sessionStorage.getItem("preguntas")) + 1;
    if (preguntas == 2) {
        document.getElementById("menos-preguntas").disabled = false;
    }
    sessionStorage.setItem("respuestas" + preguntas, 2);

    var contenido = $('.conteiner-bloques');
    var text;

    if (preguntas > 20) {
        text = `
        <div class="limite-preguntas">
        <label for="preguntas" required>*Solo se pueden crear 20 preguntas.*</label>
        </div>
        `;
        document.getElementById("mas-preguntas").disabled = true;
    } else {
        text = `
        <div class="bloque-pregunta" id=${"bloque-pregunta"+preguntas}>
                    <div class="pregunta">
                        <label for="pregunta" required>${"Pregunta "+preguntas+":"}</label>
                    </div>
                    <div class="input-pregunta">
                        <input type="text" placeholder="pregunta" class="input-preg" id=${"input-pregunta"+preguntas} required/>
                    </div>

                    <div class="detalles">
                        <div class="calificacion">
                            <label for="calificacion" required>Calificacion</label>
                            <input type="number" class="input-calificacion" id=${"input-calificacion"+preguntas} required />
                        </div>
                    </div>
                    <div class="respuesta">
                        <label for="respuesta">Respuestas:</label>
                    </div>
                    <div class=${"conjunto-respuestas"+preguntas}>
                        <div class="respuestas" id=${"respuesta1-p"+preguntas}>
                            <div class="radio-button"><input type="radio" name=${"estado"+preguntas} id=${"radio"+preguntas+"-1"} value="1" checked></div>
                            <label for="respuesta" class="num-resp" required>1.</label>
                            <input type="text" class="input-resp" placeholder="respuesta" id=${"input-respuesta"+preguntas+"1"} required/>
                        </div>
                        <div class="respuestas" id=${"respuesta2-p"+preguntas}>
                            <div class="radio-button"><input type="radio" name=${"estado"+preguntas} id=${"radio"+preguntas+"-2"} value="2"></div>
                            <label for="respuesta" class="num-resp" required>2.</label>
                            <input type="text" class="input-resp" placeholder="respuesta" id=${"input-respuesta"+preguntas+"2"} required/>
                        </div>
                    </div>

                    <div class="botones">
                        <div class="boton-add">
                            <button type="submit" class="mas-respuestas btn btn-primary" id=${"mas-respuestas"+preguntas} value=${preguntas}>
                                Agregar Respuesta </button>
                        </div>
                        <div class="boton-del">
                            <button type="submit" class="menos-respuestas btn btn-danger" id=${"menos-respuestas"+preguntas} value=${preguntas} disabled>
                                - </button>
                        </div>
                    </div>


                </div>
        `;
        sessionStorage.setItem("preguntas", preguntas);
    }
    contenido.append(text);

});



function DeshabilitarCuestionario() {
    var preguntas = sessionStorage.getItem("preguntas");
    var respuestasDePregunta;
    var i = 1;

    document.getElementById("input-cuestionario").disabled = true;

    for (var i = 1; i <= preguntas; i++) {
        document.getElementById("input-pregunta" + i).disabled = true;
        document.getElementById("input-calificacion" + i).disabled = true;
        respuestasDePregunta = sessionStorage.getItem("respuestas" + i);
        document.getElementsByName("estado" + i).disabled = true;

        document.getElementById("mas-respuestas" + i).disabled = true;
        document.getElementById("menos-respuestas" + i).disabled = true;

        for (var j = 1; j <= respuestasDePregunta; j++) {

            document.getElementById("input-respuesta" + i + j).disabled = true;

            
            document.getElementsByName("estado" + i)[j - 1].disabled = true;

        }
    }
    document.getElementById("mas-preguntas").disabled = true;
    document.getElementById("menos-preguntas").disabled = true;
    document.getElementById("enviar-cuestionario").disabled = true;

}