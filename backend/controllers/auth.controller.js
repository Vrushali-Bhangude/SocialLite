
export const signUp  = async (req , res)=>{
    try {
        let {name,email,password,userName} = req.body

        if(!name || !userName|| !password || !email){
            return res.status(400).json({message:"All fields are required"})
        }
        let findByEmail =  await User.findOne({email});

        if(findByEmail){
            return res.status(400).json({message:"User already exists with this email"})
        }
        let findByUserName = await User.findOne({userName});

        if(findByUserName){
            return res.status(400).json({message:"User already exists with this userName"})
        }

         if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
         }  
         
        let hashedPassword = await bcrypt.hash(password,10);

        let user = new User({
            name,
            email,
            password:hashedPassword,
            userName
        })

        const token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:10*365*24*60*60*1000 //10 years
        })

        await user.save();

        res.status(201).json({message:"User registered successfully",user,token})


    } catch (error) {
        res.status(500).json({message:"Internal server error in signup page",error:error.message})
    }
}

import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

export const signIn  = async (req , res)=>{
    try {
        let {password,userName} = req.body

        if(!userName|| !password ){
            return res.status(400).json({message:"Both fields are required"})
        }
      
        let findByUserName = await User.findOne({userName});
        if(!findByUserName){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password,findByUserName.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        let user = findByUserName;

       

        const token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:10*365*24*60*60*1000 //10 years
        })

        

        res.status(200).json({message:"User login successfully",user,token})


    } catch (error) {
        res.status(500).json({message:"Internal server error in signin page",error:error.message})
    }
}


export const signout = (req, res) => {
   try {
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
    })
    res.status(200).json({message:"Signout successfully"})
   }
    catch (error) {
        res.status(500).json({message:"Internal server error in signout page",error:error.message})
    }

}

