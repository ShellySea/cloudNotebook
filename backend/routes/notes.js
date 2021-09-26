const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1:Fetch all notes: GET "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

// ROUTE 2:Add notes: POST "/api/auth/addnote". Login required
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
            title,
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

module.exports = router