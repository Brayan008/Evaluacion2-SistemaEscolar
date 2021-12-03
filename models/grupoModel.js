// database/models/ UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const grupoSchema = new Schema (
    {
        nombre_grupo: String,
        total_alumnos: Number,
        id_alumno: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Alumno',
            default: []
        }],
    },
    {
        timestamps: true
    }
);

//model = mongoose.model(nombre_interno, defincion-esquema, nombre-coleccion);
const GrupoModel = Model('Grupo', grupoSchema);

module.exports = GrupoModel;