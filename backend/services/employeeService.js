// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const employeeModel = require('../models/Employee')
const employeeSvc = {
    create:async(data)=>{
        const employee = new employeeModel(data)
        return await employee.save()
    },
    getByEmailOrNumber:(emailNumber)=>{
        return employeeModel.findOne({
            $or:[
                {email:emailNumber},
                {number:emailNumber}
            ]
        })
    },
    getAll:async()=>{
        return await employeeModel.find()
    },
    getById:async(id)=>{
        return await employeeModel.findById(id)
    },
    updateById:async(id,data)=>{
        return await employeeModel.findByIdAndUpdate(id,{$set:data},{new:true})
    },
    deleteById:async(id)=>{
        return await employeeModel.findByIdAndDelete(id)
    }
    // login: async (data) => {
    //     const { email, password } = data;
    
    //     const employee = await employeeModel.findOne({ email });
    //     if (!employee) throw new Error('Invalid email or password');
    
    //     const isMatch = await bcrypt.compare(password, employee.password);
    //     if (!isMatch) throw new Error('Invalid email or password');
    
    //     const token = jwt.sign(
    //       { id: employee._id, email: employee.email },
    //       'secret_key', // ⚠️ Replace with a secure key from .env
    //       { expiresIn: '1h' }
    //     );
    
    //     return { token, employee };
    //   }
}
module.exports = employeeSvc