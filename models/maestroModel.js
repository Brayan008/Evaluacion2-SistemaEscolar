// database/models/ maestroModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;


const MaestroSchema = new Schema (
    {
        nombre: {
            type: String,
            unique: false
        },
        apellido: String,
        Profesion: String,

        id_grupo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grupo',

        }],
        default: []
    }
);
//model = mongoose.model(nombre_interno, defincion-esquema, nombre-coleccion);
const MaestroModel = Model('Maestro', MaestroSchema);

module.exports = MaestroModel;


