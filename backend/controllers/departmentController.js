const {request,response}=require('express')
const departmentService = require('../services/departmentService')
const { updateById } = require('../services/employeeService')

const departmentCtrl = {
    register:async(request,response)=>{
        try{
            const dept = await departmentService.create(request.body)
            console.log(dept)
            response.status(201).send({
                data:dept,
                message:"Register dept successfull"
            })
        }catch(error){
            response.status(500).send({
                message:"unable to register dept"
            })
        }
    },
    getAllDepartmets:async(request,response)=>{
        try{
            const depts = await departmentService.getAll()
            console.log(depts)
            response.status(200).send({
                data:depts,
                message:"Retriedved  depts successfull"
            })
        }catch(error){
            response.status(500).send({
                message:"unable to Retrieve dept"
            })
        }
    },
    getDeptById:async(request,response)=>{
        try{
            const dept = await departmentService.getById(request.params.id)
            response.status(200).send({
                data:dept,
                message:"Retriedved  dept successfull"
            })
        }catch(error){
            response.status(500).send({
                message:"unable to Retrieve dept"
            })
        }
    },
    updateDepartmentById:async(request,response)=>{
        try{
            const {id}=request.params;
            const updateData = request.body
           const dept = await departmentService.updateById(id,updateData)
            response.status(200).send({
                data:dept,
                message:"Updated  dept successfull"
            }) 
        }catch(error){
            response.status(500).send({
                message:"unable to Updated dept"
            })
        }
    },
    deleteDepartmentById:async(request,response)=>{
        try{
           const dept = await departmentService.deleteById(request.params.id)
            response.status(200).send({
                data:dept,
                message:"delete  dept successfull"
            }) 
        }catch(error){
            response.status(500).send({
                message:"unable to delete dept"
            })
        }
    }
}
module.exports = departmentCtrl