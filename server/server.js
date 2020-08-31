//este archivo existe y esta configurado en config, podremos ocupar la variable process.env.PORT
require('./config/config')

//INTEGRACIÓN DEL FRAMEWORK EXPRESS
const express = require('express')
const app = express()
const mongoose = require('mongoose');

//integración de body parser que permite obtener datos enviados al servidor
const bodyParser = require('body-parser') 

//MIDDLEWARES - ESA PETICION SIEMPRE PASA POR ESTAS LINEAS
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())


//TRAER RUTAS 
app.use( require('./routes/usuario.js') )


//CONEXION A MONGODB

mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true}, (err, res) => {
     if(err) throw err;
     console.log('base de datos ONLINE'
)})

 
app.listen(process.env.PORT, ()=> {
    console.log('Escuchando puerto: ', 3000)
})