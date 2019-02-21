var mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const saltRounds=10;



const  userSchema=new Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    mobilenumber:{type:Number,required:true}
});

userSchema.pre('save', function(next) {
   // Ensure password is new or modified before applying encryption
   if (!this.isModified('password'))
     return next();
 
   // Apply encryption
   bcrypt.hash(this.password, null, null, (err, hash) => {
     if (err) return next(err); // Ensure no errors
     this.password = hash; // Apply encryption to password
     next(); // Exit middleware
   });
 });

 userSchema.methods.comparePassword = function(password) {
   return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
 };
 

module.exports=mongoose.model('User', userSchema);