const express = require('express');
const router = express.Router();

const maestroModel = require('../models/maestroModel');
const grupoModel = require('../models/grupoModel');

// Use para poder usar metodos DELETE Y PUT
router.use(function (req, res, next){
    if(req.query._method === 'DELETE' || req.query._method === 'PUT'){
        req.method = req.query._method;
        req.url = req.path;
    }
    next();
});

//All get money methods
router.get('/', (req, res,) => {
    let data = req.query;
    maestroModel.find()
        .populate('id_grupo')
        .exec(function (err, maestro){
        if (err){
            return res.status(400)
                .json(err);
        }

        grupoModel.find((err, grupos) => {
            let dataGrupos = JSON.parse(JSON.stringify(grupos))
            let dataMaestros = JSON.parse(JSON.stringify(maestro));

            return res.render('maestros/maestros', {dataGrupos, dataMaestros});
            //return res.status(400).json(maestro);
        });
    });

})

router.post('/create',(req, res,) =>{

    let data = req.body;
    maestroModel.create(data, (error_create, new_maestro) =>{
        if(error_create){
            return res.status(400)
            .json(error_create);
        };
        
        res.redirect('/maestro');
    });
})

router.delete('/delete/:id', (req, res, next) =>{
    maestroModel.deleteOne({_id: req.params.id}, (err,status) => {
        if(err){
            return res.status(400)
                .json(err);
        }

        res.redirect('/maestro')
    });
})

router.put('/edit/:id', (req, res, next) => {
    let dataUpdate = req.body;

    maestroModel.findOneAndUpdate({_id: req.params.id}, dataUpdate, {new: true}, (err, status) => {
        if(err){
            return res.status(400)
            .json(err);
        }

        res.redirect('/maestro');
    });
})

module.exports = router;