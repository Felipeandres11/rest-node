const express = require('express');
const app = express();

//ENCRIPTAR CONTRASEÑA
const bcrypt = require('bcrypt')

//PAMETROS FUERTES underscore.pick()
const _ = require('underscore')

const Usuario = require('../models/usuario')


app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0

    let limite = req.query.limite || 5;

    desde = Number(desde)
    limite = Number(limite)
   
    Usuario.find({})
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios)=>{
                
                if(err) {
            
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }    
                
                res.json({
                    usuarios
                })
            })
})
  
app.post('/usuario', function (req, res) {
    
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        img: body.img,
        role: body.role
    })

    usuario.save( (err, usuarioDB) => {
        if(err) {
            
            res.status(400).json({
                ok: false,
                err
            });
        }

       // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

        
})
  
  app.put('/usuario/:id', function (req, res) {
      

      let id = req.params.id

      //STRONG PARAMS - PARAMETROS FUERTES con underscore _ .pick()
      let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

      //OTRA MANERA DE NO ACTUALIZAR UN CAMPO EN ESPECIFICO ES ELIMINANDOLO DEL OBJETO QUE SE VA A ACTUALIZAR
      //delete body.password 

      Usuario.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (error, usuarioDB)=> {
        
        if(error) {
            
                res.status(400).json({
                ok: false,
                error
                });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

      })

      
  })
  
  app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
  })

  module.exports = app;