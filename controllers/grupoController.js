const express = require('express');
const router = express.Router();

const grupoModel = require('../models/grupoModel');
const alumnosModel = require('../models/alumnosModel');


// Use para poder usar metodos DELETE Y PUT
router.use(function (req, res, next) {
    if (req.query._method === 'DELETE' || req.query._method === 'PUT') {
      req.method = req.query._method;
      req.url = req.path;
    }
    next();
});
  
//All get money methods, 
router.get('/', (req, res,) =>{
    return res.render('grupos');
})

//All get money methods, 
router.get('/grupos', (req, res,) =>{
    var dataQuery = req.query;
    grupoModel.find()
    .populate('id_alumno')
    .exec(function (err, grupo){
        if (err){
            return res.status(400)
                .json(err);
        }

        alumnosModel.find((err, alumnos) => {
            let dataAlumnos = JSON.parse(JSON.stringify(alumnos))
            let data = JSON.parse(JSON.stringify(grupo));

            //return res.render('grupos', {data, dataAlumnos});
            return res.status(200).json(data);
        });

    });
})

router.post('/create',(req, res,) =>{

    let  data = req.body;
    grupoModel.create(data, (error_create, new_grupo)=>{
        if(error_create){
            return res.status(400)
            .json(error_create);
        }          
        res.redirect('/grupos');
    });
})

router.delete('/delete/:id', (req, res, next) =>{
    grupoModel.deleteOne({_id: req.params.id}, (err, status) => {
        if(err){
            return res.status(400)
                .json(err);
        }

        res.redirect('/grupos');
    });
})

router.put('/edit/:id', (req, res, next) =>{
    let dataUpdate = req.body;

    grupoModel.findOneAndUpdate({_id: req.params.id}, dataUpdate, {new: true}, (err, status) => {
        if(err){
            return res.status(400)
                .json(err);
        }

        res.redirect('/grupos');
    });
})

module.exports = router;