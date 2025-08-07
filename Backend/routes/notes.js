const express=require('express')
const router = express.Router();
const pat = require('path');
router.get('/',(req,res)=>{
    console.log(req.body);
    res.send('` called from notes`')
})

module.exports = router;