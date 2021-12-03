const express = require('express');
const router = express.Router();

const userModel = require('../models/usuarioModel');

router.get('/', (req, res,) =>{
    
    userModel.find({_id: req.session.userid })
    .populate({
        path: 'id_alumno',
        populate: {
            path: 'id_calificaciones'
        }
    })
    .exec(function (err, padres){
        if (err){
            return res.status(400)
                .json(err);
        }
        let dataPadres = JSON.parse(JSON.stringify(padres));
        return res.render('indexPadres', {dataPadres});
    });
})

module.exports = router;