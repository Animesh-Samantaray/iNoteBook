const express=require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User.js');
const {body , validationResult} = require('express-validator');
router.post('/createUser',[
    body('name','Name must contain minimum 5 letters').isLength({min:5}),
    body('password','Password must have minimum 5 letters').isLength({min:4}),
    body('email','Enter a valid email').isEmail()
],async (req,res)=>{
    const errors = validationResult(req);

    //If there are errors then send it as json
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    // Check If user having same email exists or not . If yes send bad request
    let user = await User.findOne({email:req.body.email})
    if(user){
       return res.status(400).json({error:`Sorry... User with this email(${req.body.email}) already exists`})
    }

    // Create User with the name,email,password taken from body of request
   await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(user=> res.json(user)).catch((err)=>res.json({
        error:'Error Encountered',   //aaaa
        message:err.message
    }));

})

module.exports = router;