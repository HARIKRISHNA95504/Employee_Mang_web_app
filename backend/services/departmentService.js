const express = require('express')
const departmentModel = require('../models/department')

const departmentService ={
    create:async(data)=>{
        const dept = new departmentModel(data)
        return await dept.save();
    },
    getAll: async () => {
        return await departmentModel.find();
    },
    getById: async (id) => {
        return await departmentModel.findById(id);
    },
    updateById: async (id, data) => {
        return await departmentModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    },
    deleteById: async (id) => {
        return await departmentModel.findByIdAndDelete(id);
    }
} 
module.exports=departmentService