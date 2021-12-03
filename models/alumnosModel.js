// database/models/ UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const AlumnoSchema = new Schema (
    {
        nombre: String,
        apellidos: String,
        id_grupo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grupo',
        },
        id_calificaciones: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Calificacion',
            default: []
        }],
    },
    {
        timestamps: true
    }
);

//model = mongoose.model(nombre_interno, defincion-esquema, nombre-coleccion);
const AlumnoModel = Model('Alumno', AlumnoSchema);

module.exports = AlumnoModel;