const User=require('../model/registerModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.loginUser=async(req,res,next)=>{

    try{  
        const{username,password}=req.body;
        const user=await User.findOne({username});

        if(!user){
            const error=new Error("User Not Founddd");
            error.statusCode=404;
            throw error;
        }
        const isEqual=await bcrypt.compare(password,user.password);
        if(isEqual){
            const token=jwt.sign(
                {
                    user:{
                        userId:user._id.toString(),
                        username:user.username,
                        name:user.name,
                    },
                },
                process.env.JWT_SECRET,{expiresIn:'1h'}
            );
            res.status(200).json({token,userId:user._id.toString()})
        } else{
            const error=new Error("Username or Password is not corroct");
            error.statusCode=422;
            throw error;
        }

    } 
    catch(error){
        next(error);

    }
}