// database/models/ UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const calificacionSchema = new Schema (
    {
        nombre_materia: String,
        unidad1: Number,
        unidad2: Number,
        id_maestro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Maestro',
        },
    },
    {
        timestamps: true
    }
);

//model = mongoose.model(nombre_interno, defincion-esquema, nombre-coleccion);
const calificacionModel = Model('Calificacion', calificacionSchema);

module.exports = calificacionModel;