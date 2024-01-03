const mongoose=require('mongoose');
const {schema}=require('./security/registerValidation');

const formSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,

    },
    username:{
        type:String,
        required:true,
        trim: true,
       

    },
    password:{
        type:String,
        required:true,
        trim: true,
        minlength:8,
        maxlength:80,
    }
});
formSchema.statics.registerValidation=function(body){
    return schema.validate(body,{abortEarly:false});
};
const Users=mongoose.model('Users',formSchema);
module.exports=Users;