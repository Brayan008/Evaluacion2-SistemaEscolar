let rol = {
    1: "director",
    2: "padre",
}

const usuario = {
    _id: int,
    nombre: string,
    apellidos: string,
    email: string,
    pass: string,
    edad: int,
    rol: int,
    id_alumno: alumno
}

const alumno = {
    _id: int,
    nombre: string,
    apellidos: string,
    id_grupo: grupo,
    calificaciones: calificaciones,
}

const maestro = {
    _id: int,
    nombre: string,
    apellidos: string,
    Profesion: string,
    id_grupos: grupo
}

const grupo = {
    id_: int,
    nombre_grupo: string,
    total_alumnos: int,
    id_alumnos: alumno
}

const calificaciones = {
    _id: int,
    nombre_materia: string,
    alumno: id_alumno,
    maestro: id_maestro,
    unidad1: int,
    unidad2: int
}
