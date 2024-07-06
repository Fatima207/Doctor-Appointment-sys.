
const userModel=require('../models/userModels')
const bcrypt=require('bcryptjs')

//register callback
const registerController= async (req,res)=>{
    try {
        
        const existingUser=await userModel.findOne({email:req.body.email})

        //check if user is already registered or not by matching his email

        if(existingUser){
            return res.status(200).send({message:'User Already Exists',success:false})
        }

        //encrypt the password

        const password=req.body.password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        // salting done, now replace encrypted password by original password i.e. without encrypted.
        request.body.password=hashedPassword

        //creating new user using user model
        const newUser= new userModel(req.body);
        await newUser.save();
        res.status(201).send({message: "Registration successful",success:true})


    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:`Register Controller ${error.message}`})
    }
}

const loginController=()=>{}

module.exports={loginController,registerController}