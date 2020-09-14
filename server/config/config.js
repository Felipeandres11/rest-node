//ES UN OBJETO GLOBAL QUE CORRE EN LA APLICACIÓN DE NODE


//=====================
// PUERTO
//=====================

process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=====================
// base de datos
//=====================


// ==========================
//  Vencimiento del token
// ==========================
// 60 SEGUNDOS 
// 60 MINUTOS
// 24 HORAS 
// 30 DÍAS 
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ==========================
//  SEED (SEMILLA DE AUTENTICACIÓN)
// ==========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-productivo'

let urlDB;


if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



