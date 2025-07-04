const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:''
    }
},{timestamps:true});

const departmentModel = mongoose.model('departments',departmentSchema)
module.exports = departmentModel