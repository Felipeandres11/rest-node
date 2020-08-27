//este archivo existe y esta configurado en config, podremos ocupar la variable process.env.PORT
require('./config/config')
//INTEGRACIÓN DEL FRAMEWORK EXPRESS
const express = require('express')
const app = express()

//integración de body parser que permite obtener datos enviados al servidor
const bodyParser = require('body-parser') 


//MIDDLEWARES - ESA PETICION SIEMPRE PASA POR ESTAS LINEAS
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())


app.get('/usuario', function (req, res) {
  res.json('get usuario')
})

app.post('/usuario', function (req, res) {

    let body = req.body;

    if(body.nombre === undefined){
        
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es obligatorio'
        });
    }else{
        res.json({
            persona: body
        })
    }

    
  })

app.put('/usuario/:id', function (req, res) {
    
    let id = req.params.id

    res.json({
        id
    })
})

app.delete('/usuario', function (req, res) {
res.json('delete usuario')
})
 
app.listen(process.env.PORT, ()=> {
    console.log('Escuchando puerto: ', 3000)
})