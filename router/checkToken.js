const jwt = require('jsonwebtoken');
const secret = "zhangwei1988";

const checkToken = (req,res,next) => {
    const token  = req.query.token || req.query.token;
    jwt.verify(token, secret, function (err, decoded) {
        if (!err){
            console.log(decoded.name); 
            return next();
         }else{
            res.status(403).json(err)
         }
    })
}

module.exports = checkToken;