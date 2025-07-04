const express = require('express')
const mongoose = require('mongoose')


const employeeRouter = require('./routers/employeeRouter')
const departmentRouter = require('./routers/departmentRouter')
const app = express()
app.use(express.json())

app.use('/employees', employeeRouter);
app.use('/departments',departmentRouter)

app.get('/',(request,response)=>{
    response.send('welcome to express js and emp management app')
})

app.listen(4000,()=>{
    console.log('server is up on running')
})

mongoose.connect('mongodb+srv://Harikrishna:%4020FH1a0596@nodejs-cluster1.rm9towc.mongodb.net/Employee_Management_app?retryWrites=true&w=majority&appName=Nodejs-Cluster1').then(()=>{
    console.log('connected to  DB Successfully!')
}).catch((error)=>{
    console.log(error)

})