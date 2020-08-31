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
    urlDB = 'mongodb+srv://fpalma:RglcKxNTwbjsLnJT@cluster0.1gm6v.mongodb.net/cafe'
}

process.env.URLDB = urlDB;



