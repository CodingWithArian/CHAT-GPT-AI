const User=require('../model/registerModel');
const bcrypt = require("bcryptjs");

exports.registerUser= async(req,res,next)=>{
    const errArray=[];
    try{

        const {name,username,password,repeatpassword}=req.body;

        const user= await User.findOne({username});
        if(user){
    errArray.push("There Is Already An Account With This Username");
    throw errArray;
        }
        try{
            await User.registerValidation(req.body);
    
        }
        catch(err){
            err.inner?.forEach((e)=>{
                errArray.push(
                    e.message?e.message:null
                )
            })
            throw errArray;
        };
        const hash=await bcrypt.hash(password,10);

    
        await User.create({name,username,password:hash});
        res.status(201).json({message:'User Created Successfully'});
    }
   

    catch(err){
        const error=new Error('Validation Error');
        error.statusCode=422;
        error.data=err;
        next(error);

    }
   
}