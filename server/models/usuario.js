const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'debe ser obligatorio']
    },

    img: {
        type: String,
        required: false
    }, //NO ES Obligatorio

    role: { 
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, //DEFAULT: 'USER_ROLE'

    estado: {
        type: Boolean,
        default: true
    }, //BOOLEAN,

    google: {
        type: Boolean,
        default: false
    } //BOOLEAN
});

//METODO TO JSON Y CONVERTIRLO A OBJETO, TOMAR EL OBJETO Y ELIMINAR EL PASSWORD DE RESPUESTA
usuarioSchema.methods.toJSON = function () {
    
    let user = this;
    let userObject = user.toObject();
    delete userObject.password
    return userObject
}

usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser unico'
})

module.exports = mongoose.model('Usuario', usuarioSchema)