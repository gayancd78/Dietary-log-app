const User = require("../models/User")
const bcrypt = require("bcrypt")

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

module.exports = {SignUp}