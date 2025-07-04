const express = require('express')
const router = express.Router()
const employeeCtrl = require('../controllers/employeeController')
const tokenValidator = require('../middleware/token-validaton')



router.post('/register',employeeCtrl.register)
router.post('/login',employeeCtrl.loginWithPassword)
router.get('/',tokenValidator,employeeCtrl.getAllEmployees)
router.get('/:id',employeeCtrl.getEmployeeById)
router.put('/:id',employeeCtrl.updateEmployeeById)
router.delete('/:id',employeeCtrl.deleteEmployeeById)
router.patch('/:id',employeeCtrl.updatedFields)





module.exports =router;
