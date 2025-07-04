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
    },
    department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'departments',  // Refers to the Department model
    default: null
  }
},{ timestamps: true })

const Employee = mongoose.model('employees',employeeSchema)
module.exports = Employee