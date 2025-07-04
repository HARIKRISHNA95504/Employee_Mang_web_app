
// const employeeModel = require('../models/Employee')
// const employeeSvc = {
//     create:async(data)=>{
//         const employee = new employeeModel(data)
//         return await employee.save()
//     },
//     getByEmailOrNumber:(emailNumber)=>{
//         return employeeModel.findOne({
//             $or:[
//                 {email:emailNumber},
//                 {number:emailNumber}
//             ]
//         })
//     },
//     getAll:async()=>{
//         return await employeeModel.find()
//     },
//     getById:async(id)=>{
//         return await employeeModel.findById(id)
//     },
//     updateById:async(id,data)=>{
//         return await employeeModel.findByIdAndUpdate(id,{$set:data},{new:true})
//     },
//     deleteById:async(id)=>{
//         return await employeeModel.findByIdAndDelete(id)
//     },
//     getAllDeptPopulate: async () => {
//         return await employeeModel.find().populate('department');
//     },

//     getByDeptId: async (id) => {
//         return await employeeModel.findById(id).populate('department');
//     }
// }
// module.exports = employeeSvc

const employeeModel = require('../models/Employee');

const employeeSvc = {
  create: async (data) => {
    const employee = new employeeModel(data);
    return await employee.save();
  },

  getByEmailOrNumber: (emailOrNumber) => {
    return employeeModel.findOne({
      $or: [
        { email: emailOrNumber },
        { number: emailOrNumber },
      ],
    });
  },

  getAll: async () => {
    return await employeeModel.find().populate('department'); 
  },

  getById: async (id) => {
    return await employeeModel.findById(id).populate('department');
  },

  updateById: async (id, data) => {
    return await employeeModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).populate('department');
  },

  deleteById: async (id) => {
    return await employeeModel.findByIdAndDelete(id);
  },

  // Optional: For listing only employees from a specific department
  getAllDeptPopulate: async (departmentId) => {
    return await employeeModel.find({ department: departmentId }).populate('department');
  }
};

module.exports = employeeSvc;
