const express = require('express')
const router = express.Router()
const departmentCtrl = require('../controllers/departmentController')
router.post('/register',departmentCtrl.register)
router.get('/',departmentCtrl.getAllDepartmets)
router.get('/:id',departmentCtrl.getDeptById)
router.put('/:id',departmentCtrl.updateDepartmentById)
router.delete('/:id',departmentCtrl.deleteDepartmentById)

module.exports = router;