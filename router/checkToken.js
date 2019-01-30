const jwt = require('jsonwebtoken');
const secret = "zhangwei1988";

const checkToken = (req,res,next) => {
    try{
        jwt.verify(req.query.token, secret);
        next();
    }catch(e){
        res.send({success:false,result:"token 失效"})
    }  
}

module.exports = checkToken;