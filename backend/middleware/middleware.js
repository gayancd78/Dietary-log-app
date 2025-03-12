const jwt = require("jsonwebtoken")

const verifyToken =(req, res, next) =>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(400).json({message : "empty token"})
    }

    try {
        
         const decodedValue =  jwt.verify(token, process.env.SECRET)
         req.user = decodedValue
         next()

    } 
    catch (error) {
        res.status(403).json({message: "invalid token"})
    }

}

module.exports = verifyToken