var mongoose=require('mongoose');
var Schema=mongoose.Schema;


const  userSchema=new Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    MobileNumber:{type:Number,required:true}



});
module.exports=mongoose.model('User', userSchema);