// CUESTIONARIO CON PREGUNTAS Y RESPUESTAS
export class CuestionarioTodoDTO {
    constructor(descripcion, claseId, preguntas) {
        this.descripcion = descripcion,
            this.claseId = claseId,
            this.preguntas = preguntas
    }
}

export class PreguntaConRespuestaDTO {
    constructor(descripcion, respuestas) {
        this.descripcion = descripcion,
            this.respuestas = respuestas
    }
}

export class RespuestaDescripcionDTO {
    constructor(descripcion, flag) {
        this.descripcion = descripcion,
            this.flag = flag
    }
}


// CUESTIONARIO A CORREGIR
export class CuestionarioACorregirDTO {
    constructor(claseId, preguntas) {
        this.claseId = claseId,
            this.preguntas = preguntas
    }
}

export class PreguntaConRespuestaAlumnoDTO {
    constructor(descripcion, calificacionParcial, respuesta) {
        this.descripcion = descripcion,
            this.calificacionParcial = calificacionParcial,
            this.respuesta = respuesta
    }
}

export class RespuestaAlumnoDTO {
    constructor(descripcion) {
        this.descripcion = descripcion
    }
}

// REGISTRO DEL CUESTIONARIO
export class Registro {
    constructor(estudianteId, claseId, calificacion) {
        this.estudianteId = estudianteId,
            this.claseId = claseId,
            this.calificacion = calificacion
    }
}