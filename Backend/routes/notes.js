const express = require("express");
const router = express.Router();
const pat = require("path");
const fetchUser = require("../middlewares/fetchUser.js");
const Notes = require("../models/Note.js");
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  console.log(req.body);
  res.send(` called from notes`);
});

// For fetching all the notes  of a logged user
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// For adding new note of a logged user
router.post(
  "/addNewNote",
  fetchUser,
  [
    body("title", "Your note must contain a title").isLength({ min: 3 }),
    body("description", "Your note must contain a description").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send("Error occured");
      }

      const note = new Notes({
        user: req.user.id,
        title: req.body.title,
        tag: req.body.tag,
        description: req.body.description,
        date: req.body.date,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(401).send("error");
    }
  }
);

// For updation of a logged user
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, tag, description } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (tag) newNote.tag = tag;
    if (description) newNote.description = description;

    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note with this ID does not exist");
    }


    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete('/deleteNote/:id' ,  fetchUser,  async (req,res)=>{
    try{
        const id = req.params.id;
        let note = await Notes.findById(id);
        if(!note){
            return res.status(401).send('User not found');
        }
        if(note.user.toString() !==  req.user.id){
            return res.status(401).send('Not authorized');
        }
       await Notes.findByIdAndDelete(req.params.id);
        res.send('Deleted successfully');
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;
