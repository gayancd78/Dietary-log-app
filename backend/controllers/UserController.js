const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SignUp = async (req,res) => {

    const {firstname, lastname, email, password} = req.body

    try {

         const existingUser = await User.findOne({email:email})

         if(existingUser){
            return (
                res.status(400).json({message : "User already exists"})
            )
         }

         const hashPassword = await bcrypt.hash(password, 10)
        
        let user = new User({
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : hashPassword,
            
        })

        await user.save()
        res.status(201).json({message: "User saved"})
       
    } 
    catch (error) {
        res.status(500).json({message:"Server error: ", error})
    }

}
const Login = async (req,res) => {
    const { email, password} = req.body

    try {

         const existingUser = await User.findOne({email:email})

         if(!existingUser){
            return (
                res.status(404).json({message : "User Not Found"})
            )
         }

         const isConfirmed = await bcrypt.compare(password, existingUser.password)

         if(!isConfirmed){
            return res.status(401).json({massage : "Password is wrong"})
         }

         const token = jwt.sign({
            userId : existingUser._id,
            email : existingUser.email,
            firstname : existingUser.firstname,
            lastname : existingUser.lastname
        },process.env.SECRET, {expiresIn: '5h'})
        
       

        res.status(200).json({token: token, message : "User logged.."})
    } 
    catch (error) {
        res.status(500).json({message : "Server error", error})
    }
}

module.exports = {SignUp, Login}