//config/database.js
const mongoose = require('mongoose');

const MONGODB_HOST = process.env.DB_HOST;
const MONGODB_PORT = process.env.DB_PORT;
const MONGODB_DATABASE = process.env.DB_NAME;

const MONGODB_ATLAS = 'mongodb+srv://Brayan:7TxzeZCNp1GHMfTr@cluster0.vrjgf.mongodb.net/SistemaEscolar?retryWrites=true&w=majority';
const MONGODB_LOCAL = 'mongodb://' + MONGODB_HOST + ":" + MONGODB_PORT + "/" + MONGODB_DATABASE;

module.exports = async () => {
    var uri = MONGODB_ATLAS;
    var option = { //Solo se usa si es local y se agrega a el connect
        dbName: MONGODB_DATABASE,
        user: '',
        pass: '',
        useUnifiedTopology: true,
        autoIndex: true,
        autoCreate: true,
        useCreateIndex: true,
        useNewUrlParser: true
    }
    
    
    mongoose.connect(uri)
    .then($connector =>{
        console.log('Conexion exitosa a la base de datos');
        return;
    })
    .catch($err =>{
        console.error("Error conectando a la BD" + uri, $err);
        return;
    })
}