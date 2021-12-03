const express = require('express');
const router = express.Router();

const usuarioModel = require('../models/usuarioModel');

//All get money methods, 
router.get('/', (req, res,) =>{
    var data = req.query;
    usuarioModel.find()
    .populate('id_alumno')
    .exec(function (err, usuario){
        if (err){
            return res.status(400)
                .json(err);
        }
        return res.status(200).json(usuario);
    });
})


router.post('/create',(req, res,) =>{

    let  data = req.body;
    usuarioModel.create(data, (error_create, new_usuario)=>{
        if(error_create){
            return res.status(400)
            .json(error_create);
        }          
        return res.status(200).json(new_usuario);
    });
})


module.exports = router;