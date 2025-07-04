


const jwt = require('jsonwebtoken')
const tokenValidator = async (request,response,next)=>{
    try{
        if(request.headers.authorization){
            const token = request.headers.authorization.replace("Bearer ", "");
            const employeeInfo = await jwt.verify(token,'you can not steel my password')
            next();
        }else{
            response.status(401)
            response.send({
            error:'Token is required'
            })
        }

    }catch(error){
        console.log(error)
        if(error.message.includes('jwt expired')){
            response.status(500)
            response.send({
            error:'Token is Expired'
        })
        }else{
            response.status(500)
            response.send({
                error:'unable to validate the token'
            })
        }
    }
}

module.exports = tokenValidator;