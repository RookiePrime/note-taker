const express = require('express');
const path = require('path');
const { createNote, removeNote } = require('./lib/notes');

const { notes } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware list
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    createNote(note, notes);
    res.json({
        message: 'Note added to notes!'
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const note = req.params.id;
    removeNote(note, notes);
    res.json({
        message: 'Note removed from notes!'
    });
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});