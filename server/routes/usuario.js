const express = require('express');
const app = express();

//ENCRIPTAR CONTRASEÑA
const bcrypt = require('bcrypt')

//PAMETROS FUERTES underscore.pick()
const _ = require('underscore')
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const Usuario = require('../models/usuario')


app.get('/usuario', verificaToken, (req, res) => {



    let desde = req.query.desde || 0

    let limite = req.query.limite || 5;

    desde = Number(desde)
    limite = Number(limite)
   
    Usuario.find({estado: true}, 'nombre email img role estado')
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios)=>{
                

                if(err) {
            
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }    

                Usuario.count({estado: true}, (err, conteo)=>{
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    })
                })
                
                
            })
})
  
app.post('/usuario', [verificaToken,verificaAdmin_Role], function (req, res) {
    
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
  
  app.put('/usuario/:id', [verificaToken,verificaAdmin_Role], function (req, res) {
      

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
  
  app.delete('/usuario/:id', [verificaToken,verificaAdmin_Role], function (req, res) {
    
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }
    
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado)=> {
        
        if(err) {
            
            res.status(400).json({
            ok: false,
            error
            });
         };

         if (!usuarioBorrado)  {
            
            res.status(400).json({
            ok: false,
            error: {
                message: 'Usuario no encontrado'
            }
            });
         };

         res.json({
             ok: true,
             usuario: usuarioBorrado
         })

    })

  
  })

  module.exports = app;