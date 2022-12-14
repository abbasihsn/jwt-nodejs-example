const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    const token = req.header('auth_token')
    if(!token){
        res.status(400).send({message:"access denied"})
    } else {
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next()
        } catch(e){
            res.status(400).send({message:e})
        }
    }
}

