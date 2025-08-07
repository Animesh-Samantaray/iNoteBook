const express=require('express')
const router = express.Router();
const path = require('path');
const User = require('../models/User.js')
router.post('/',async (req,res)=>{
    console.log(req.body);
    const user =new User(req.body);
    await user.save();
    res.send( 'called from auth')
})

module.exports = router;