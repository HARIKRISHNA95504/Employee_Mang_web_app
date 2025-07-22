const {request,response} = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const employeeService = require('../services/employeeService')


const employeeCtrl = {
    register:async(request,response)=>{
        try{
            const hasedPassword = await bcrypt.hash(request.body.password,5);
            const employee = await employeeService.create({...request.body,password:hasedPassword})
            console.log(employee)
            response.status(201).send({
                data:employee,
                message:"Registered Employee Successfull!!"
            })
        }catch(error){
             console.error('Register error:', error);
            response.status(500).send({
                message:"Unable to Register Employee"
            })
        }
    },
    loginWithPassword:async(request,response)=>{
        try{
            const employee = await employeeService.getByEmailOrNumber(request.body.emailOrNumber)
            if(employee){
                const isPasswordMatched = await bcrypt.compare(request.body.password,employee.password);
                if(isPasswordMatched){
                    const token = await jwt.sign({
                        email:employee.email,
                        number:employee.number
                    },'you can not steel my password',{expiresIn:'1h'})
                    response.status(200)
                    response.send({
                        message:'Logged In Successfully!!',
                        accesstoken:token
                    })
                    
                }else{
                    response.status(400)
                    response.send({
                        message:'incorrect Password',
                    })
                }
                }else{
                response.status(400)
                response.send({
                    message:'unregistered email or number'
                })
            }

        }catch(error){
            response.status(500)
            console.log(error)
            response.send({
                error:'unable to login the employee'
            })
        }
    },
    getAllEmployees:async(request,response)=>{
        try{
           const data= await employeeService.getAll()
           console.log(data)
           response.status(200).send({
                data:data,
                message:"Retrieved Employee Successfull!!"
           })

        }catch(error){
            response.status(500).send({
                message:"unable get Employees"
            })
        }
    },
    getEmployeeById:async(request,response)=>{
        try{
            const employee = await employeeService.getById(request.params.id)
            console.log(employee)
            response.status(200).send({
                data:employee,
                message:"Retieved Employee Successfully "
            })
        }catch(error){
            response.status(500).send({
                message:"unable Retrieved Employee"
            })
        }
    },
    updateEmployeeById:async(request,response)=>{
        try{
            const employee = await employeeService.updateById(request.params.id,request.body)
            console.log(employee)
            response.status(200).send({
                data:employee,
                message:"Update Employee Successfully"
            })

        }catch(error){
            response.status(500).send({
                message:"unable Retrieved Employee"
            })
        }
    },
    deleteEmployeeById:async(request,response)=>{
        try{
             await employeeService.deleteById(request.params.id)
            response.status(200).send({
                messaage:"Deleted Employee Successfull"
            })
        }catch(error){
             response.status(500).send({
                message:"unable Retrieved Employee"
            })
        }
    },
    updatedFields:async(request,response)=>{
        try{
            const {id}=request.params;
            const updatedData =request.body;
            const employee = await employeeService.updateById(id,updatedData)
            response.status(200).send({
                data:employee,
                message:"Updated Specifice fields Successfully!!"
            })
 

        }catch(error){
            console.log(error)
            response.status(500).send({
                message:"unable to Updated Required Fields"
            }) 
        }
    }
}
module.exports = employeeCtrl