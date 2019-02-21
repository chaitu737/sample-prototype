const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');
const User=require('./models/user');
const router=express.Router();
const path=require('path');
var app=express();
const authentication=require('./routes/authenticate')(router);
const bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost:27017/test',(err)=>{
    if(err){
        console.log('Error in connecting Data base', err)
    }else{
        console.log('Database created & connected')
    }
    
})


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/authentication', authentication);


app.get('/',(req,res)=>{
    res.send('All set')

});



app.listen(3000,()=>{
    console.log('App is listening')

})