const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


// Route1 -> All a new note using POST - *endpoint /api/notes/createNote * (Login reqiured)
router.post('/createNote', [
    body("title", "Title must be 3 characters at least").isLength({ min: 3 }),
    body("description", "Description must be 5 characters at least").isLength({ min: 5 }),
], fetchUser, async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors) {
            return res.status(400).json({ error: errors.array() })
        }

        const { title, description, tag } = req.body;

        // const note1 = new Notes({
        //     title: req.body.title, description: req.body.desc, tag: req.body.tag, user: req.user.id
        // });
        const note = new Notes({
            title, description, tag, user: req.user.id
        });

        // you can do like this for the above code without using destructuring 
        // const note1 = new Notes({
        //     title: req.body.title, description: req.body.desc, tag: req.body.tag, user: req.user.id
        // });



        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error!");
    }
})


// Route2 -> Get All Notes from database using GET - *endpoint /api/notes/fetchAllNotes * (Login reqiured)
router.get('/fetchAllNotes', fetchUser, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }


})




// Route3 -> Update existing Note of a particular user using PUT  - *endpoint /api/notes/updateNote * (Login reqiured)
router.put('/updateNote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // Creating a ampty note object to store the data
        const newNote = {};

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note with id which is taken from URL parameters
        let note = await Notes.findById(req.params.id)


        // if not exist
        if (!note) {
            return res.status(404).send("Not found")
        }


        // Checking the authorised user ( note of that particular user)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised Access")
        }


        // set is use to update new data or note object and 
        // new:true option specifies whether the method should return the modified document rather than the original one
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json(note)


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }



})


// Route4 -> Delete Note of a particular user using DELETE - *endpoint /api/notes/delete * (Login reqiured)
router.delete('/delete/:id', fetchUser, async (req, res) => {



    let note = await Notes.findById(req.params.id)


    // If note doesn't exist
    if (!note) {
        return res.status(404).send("Not found")
    }


    // Deletion will be allowed if user owns this note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorised Access")
    }
    

    note = await Notes.findByIdAndDelete(req.params.id)

    res.json("Note deleted successfully");

})


module.exports = router;