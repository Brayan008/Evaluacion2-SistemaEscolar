// database/models/ UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const usuarioSchema = new Schema (
    {
        email: {
            type: String,
            required: true,
            unique: true 
        },
        password:{
            type: String,
            required: true,
        },
        nombre: String,
        apellidos: String,
        edad: Number,
        rol: Number,
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
const UserModel = Model('User', usuarioSchema);

module.exports = UserModel;