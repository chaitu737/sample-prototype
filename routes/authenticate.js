const User=require('../models/user');
const { check, validationResult } = require('express-validator/check');


module.exports=(router)=>{
 

    router.get('/users',(req,res)=>{
        res.send(User);
    });

    router.post('/register',[
        check('username').isAlphanumeric().withMessage('Username should be alphanumeric').isLength({mn:1}).withMessage('username is required'),
        check('email').isEmail().isLength({min:1}).withMessage('Email is required'),
        check('password').isLength({min:4}).matches('[0-9]').withMessage('Password must contain atleast 1 number').matches('[a-z]').withMessage('Password must contain atleast 1 lower case letter').matches('[A-Z]').withMessage('Password must conatin atleast 1 uppercase letter'),
        check('mobilenumber').isNumeric().isLength({min:10}).withMessage('Enter a valid Mobile Number')
    ],  (req,res)=>{
         const errors=validationResult(req);
         if(!errors.isEmpty()){
             return res.status(422).json({errors:errors.array()})
         }

         let user=new User({
             email:req.body.email,
             username:req.body.username,
             password:req.body.password,
             mobilenumber:req.body.mobilenumber
         });


          user.save((err)=>{
             if(err){
                  res.json({success:false, message:'Unable to save the user Error:', err})
             }else{
                   
                 res.json({success:true, message:'User saved'})
             }
         })
    });

router.get('/checkusername/:username',(req,res)=>{
    if(!req.params.username){
        res.json({success:false, message:'Username is not Provided'})
    }else{
        User.findOne({username:req.params.username},(err,user)=>{
            if(user){
                res.json({success:false, message:'Username is already taken'})
            }else{
                res.json({success:false, message:'Username is available'})
            }
        });
    }
});


router.get('/checkemail/:email',(req,res)=>{
    if(!req.params.email){
        res.json({success:false, message:'Email is not Provided'})
    }else{
        User.findOne({email:req.params.email},(err,user)=>{
            if(user){
                res.json({success:false, message:'Email is already taken'})
            }else{
                res.json({success:false, message:'Email is available'})
            }
        });
    }
});


router.post('/login',(req,res)=>{
    if (!req.body.username) {
        res.json({ success: false, message: 'No username was provided' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.password) {
          res.json({ success: false, message: 'No password was provided.' }); // Return error
        } else {
          // Check if username exists in database
          User.findOne({ username: req.body.username }, (err, user) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: err }); // Return error
            } else {
              // Check if username was found
              if (!user) {
                res.json({ success: false, message: 'Username not found.' }); // Return error
              } else {
                const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                // Check if password is a match
                if (!validPassword) {
                  res.json({ success: false, message: 'Password invalid' }); // Return error
                } else {
                  
                  res.json({
                    success: true,
                    message: 'Success!',
            }); // Return success and token to frontend
                }
              }
            }
          });
        }
      }
    });





    



    return router;
}