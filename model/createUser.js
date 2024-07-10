const mongoose = require('mongoose')

const createUserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:'user'
    },
    image: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const createUser = mongoose.model('users', createUserSchema)

module.exports = createUser
