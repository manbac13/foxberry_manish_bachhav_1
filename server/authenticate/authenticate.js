var jwt = require('jsonwebtoken');
const secret = "secret"

const authentication = (req,res, next)=>{
    const authenticateUser = req.headers.authorization;
    if(!authenticateUser){
        return res.status(400).json({
            status:"failed",
            message:"Sorry, You are not logged in."
        })
    }
    console.log(authenticateUser)
    const token = authenticateUser
    jwt.verify(token, secret, function(err, decoded) {
        if(err){
            return res.status(400).json({
                status:"failed",
                message:"Sorry, unauthorized user"
            })
        }
        req.user = decoded;
        console.log(req.user)
        next()
      });
}

module.exports = authentication;