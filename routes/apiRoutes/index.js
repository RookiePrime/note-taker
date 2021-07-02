const router = require('express').Router();
const { createNote, removeNote, findById, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

// Displays all the notes 
router.get('/notes', (req, res) => {
    res.json(notes);
});

// Gets a single note
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

// Adds a new note
router.post('/notes', (req, res) => {
    const note = req.body;

    if (!validateNote(note)) {
        res.status(400).send('The note is not properly formatted');
    } else {
        createNote(note, notes);
        res.json({
            message: 'Note added to notes!'
        });
    }
});

// Removes a specific note
router.delete('/notes/:id', (req, res) => {
    if (!findById(req.params.id, notes)) {
        res.status(400).send('The note does not exist.');
    } else {
        removeNote(req.params.id, notes);
        res.json({
            message: 'Note removed from notes!'
        });
    }
});

module.exports = router;