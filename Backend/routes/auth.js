const express=require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User.js');
const {body , validationResult} = require('express-validator');
router.post('/',[
    body('name','Name must contain minimum 5 letters').isLength({min:5}),
    body('password','Password must have minimum 5 letters').isLength({min:4}),
    body('email','Enter a valid email').isEmail()
],async (req,res)=>{
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(user=> res.json(user)).catch((err)=>res.json({
        error:'Error Encountered',
        message:err.message
    }));

})

module.exports = router;