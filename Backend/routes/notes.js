const express=require('express')
const router = express.Router();
const pat = require('path');
const fetchUser = require('../middlewares/fetchUser.js');
const Notes = require('../models/Notes.js');
const User = require('../models/User');
router.get('/',(req,res)=>{
    console.log(req.body);
    res.send(` called from notes`)
})

router.get('/fetchAllNotes' ,fetchUser, async (req,res)=>{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
})



router.post('/addNewNote' ,fetchUser, async (req,res)=>{
    const note = new Notes({
        user:req.user.id,
        title:req.body.title,
        tag:req.body.tag,
        description:req.body.description,
        date:req.body.date
    });
    note.save().then((savedNote)=>{res.send('note saved')}).catch(err=>res.send(err.message))
    
})


module.exports = router;