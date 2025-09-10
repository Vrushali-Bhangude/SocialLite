import jwt from "jsonwebtoken";

const genToken = async (userID)=>{
    try {
        const token = jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:"10y"});
        return token;
    } catch (error) {
        return res.staus(500).json({message:"Token generation failed"});
    }
}

export default genToken;