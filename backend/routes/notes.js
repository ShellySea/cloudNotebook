const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1:Fetch all notes: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

// ROUTE 2:Add notes: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid email').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title: title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        console.log(savedNote);
        res.json(savedNote);
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

// ROUTE 3:Update notes: POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid email').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed to update");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ error: 'Internal Server Error' })
    }

})

module.exports = router