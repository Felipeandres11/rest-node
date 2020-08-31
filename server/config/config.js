//ES UN OBJETO GLOBAL QUE CORRE EN LA APLICACIÓN DE NODE


//=====================
// PUERTO
//=====================

process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=====================
// base de datos
//=====================


let urlDB;


if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



