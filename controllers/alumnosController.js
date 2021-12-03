const express = require('express');
const router = express.Router();

const alumnosModel = require('../models/alumnosModel');
const gruposModel = require('../models/grupoModel');


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
    var dataQuery = req.query;
    alumnosModel.find()
    .populate('id_grupo')
    .exec(function (err, alumno){
        if (err){
            return res.status(400)
                .json(err);
        }

        gruposModel.find((err, grupos) => {
            let dataGrupos = JSON.parse(JSON.stringify(grupos))
            let data = JSON.parse(JSON.stringify(alumno));

            return res.render('alumnos/alumnos', {data, dataGrupos});
        });


    });
})

router.post('/create',(req, res,) =>{

    let  data = req.body;
    alumnosModel.create(data, (error_create, new_alumno)=>{
        if(error_create){
            return res.status(400)
            .json(error_create);
        }

        gruposModel.findById(new_alumno.id_grupo)
        .then((grupo) => {
            grupo.id_alumno.push(new_alumno._id);
            grupo.save();
        });
        
        res.redirect('/alumnos');
    });
})

router.delete('/delete/:id', (req, res, next) =>{
    alumnosModel.findOneAndDelete({_id: req.params.id}, (err, delete_user) => {
        if(err){
            return res.status(400)
                .json(err);
        }

        gruposModel.findById(delete_user.id_grupo)
        .then((grupo) => {
            grupo.id_alumno
            .splice(grupo.id_alumno.indexOf(delete_user._id), 1);
            grupo.save();
        });

        res.redirect('/alumnos');
    });
})

router.put('/edit/:id', (req, res, next) =>{
    let dataUpdate = req.body;

    alumnosModel.findOneAndUpdate({_id: req.params.id}, dataUpdate, {new: true}, (err, status) => {
        if(err){
            return res.status(400)
                .json(err);
        }

        res.redirect('/alumnos');
    });
})

module.exports = router;