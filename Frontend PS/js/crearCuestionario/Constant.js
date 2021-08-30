


export class CuestionarioTodoDTO {
    constructor(descripcion, claseId, preguntas) {
        this.descripcion = descripcion,
        this.claseId = claseId,
        this.preguntas = preguntas
    }
}

export class PreguntaConRespuestaDTO {
    constructor(descripcion,calificacionParcial, respuestas) {
        this.descripcion = descripcion,
        this.calificacionParcial = calificacionParcial,
            this.respuestas = respuestas
    }
}
export class RespuestaDescripcionDTO {
    constructor(descripcion, flag) {
        this.descripcion = descripcion,
            this.flag = flag
    }
}
