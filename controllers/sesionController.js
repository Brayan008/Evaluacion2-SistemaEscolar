const express = require('express');
const router = express.Router();

const usuarioModel = require('../models/usuarioModel');

//All get money methods, 
router.get('/', (req, res,) =>{
    res.render('sesion');
})


router.post('/',(req, res,) =>{

    let  data = req.body;

    usuarioModel.findOne(data, (err, usuario) =>{
        if (err){
            return res.status(400)
                .json(err);
        }

        let usuarioEncontrado = JSON.parse(JSON.stringify(usuario));

        if(usuarioEncontrado == null){
            return res.redirect('/');
        }
    
        if(usuarioEncontrado.password == data. password && usuarioEncontrado.email == data.email){

            req.session.userid = usuarioEncontrado._id;
            req.session.rol = usuarioEncontrado.rol;
            if(usuarioEncontrado.rol == 1){
                return res.redirect('/home');
            }
            return res.redirect('/home-padres-familia');
        }

    });
})

router.get('/logout',(req, res,) =>{
    req.session.destroy();
    return res.redirect('/');
})



module.exports = router;