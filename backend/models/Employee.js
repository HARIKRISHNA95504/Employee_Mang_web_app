const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        default:null
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:null
    },
    number:{
        type:String,
        default:null
    }
},{ timestamps: true })

const Employee = mongoose.model('employees',employeeSchema)
module.exports = Employee