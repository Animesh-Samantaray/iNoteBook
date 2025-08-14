const express=require('express')
const router = express.Router();
const pat = require('path');
const fetchUser = require('../middlewares/fetchUser.js');
const Notes = require('../models/Note.js');
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
router.get('/',(req,res)=>{
    console.log(req.body);
    res.send(` called from notes`)
})

router.get('/fetchAllNotes' ,fetchUser, async (req,res)=>{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
})



router.post('/addNewNote' ,fetchUser,[
    body('title','Your note must contain a title').isLength({min:3}),
    body('description','Your note must contain a description').isLength({min:6}),
], async (req,res)=>{
    try {
        const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send('Error occured')
    }

    const note = new Notes({
        user:req.user.id,
        title:req.body.title,
        tag:req.body.tag,
        description:req.body.description,
        date:req.body.date
    });
    const savedNote = await note.save();
    res.json(savedNote);
    } catch (error) {
        res.status(401).send('error')
    }
})


module.exports = router;