const router = require('express').Router();
const User = require('../model/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation/user_validation.js')



router.post('/register', async (req, res)=>{
    // data validation
    const {error} = registerValidation(req.body)

    if(error){
        res.status(400)
        res.send(error.message)
    } else {
        // check user is unique or not
        const emailExist = await User.findOne({email:req.body.email})

        if(emailExist){
            res.status(400)
            res.send({message: "user already exists!"})
        } else {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt)
            

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            });
            try{
                const response = await user.save()
                let {password, ...userRes} = response.toJSON();
                res.status(200).send(userRes)
            } catch(err){
                res.status(400).send(err)
            }
        }
    }


    
})

// LOGIN
router.post('/login', async (req, res)=>{
    const {error} = loginValidation(req.body)

    if(error){
        res.status(400)
        res.send(error.message)
    } else {
        // check user is unique or not
        const user = await User.findOne({email:req.body.email})

        if(user){
            // if password is correct
            const validPass = await bcrypt.compare(req.body.password, user.password)

            if(!validPass){
                res.status(400).send({message:"password is wrong"})
            } else{

                // create and assign token
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
                res.header('auth_token', token).status(200).send("done")
            }

        } else {
            res.status(404)
            res.send({message: "not found"})
        }
    }
})

module.exports = router;