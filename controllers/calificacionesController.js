const express = require('express');
const router = express.Router();

const calificacionModel =  require('../models/calificacionesModel');

router.post('/create',(req, res,) =>{

    let  data = req.body;
    calificacionModel.create(data, (error_create, new_calif)=>{
        if(error_create){
            return res.status(400)
            .json(error_create);
        }
        
        return res.status(200).json(new_calif);
    });
})


module.exports = router;