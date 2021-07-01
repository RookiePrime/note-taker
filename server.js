const express = require('express');
const path = require('path');
const { createNote, removeNote, findById } = require('./lib/notes');

const { notes } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware list
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    createNote(note, notes);
    res.json({
        message: 'Note added to notes!'
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    removeNote(noteId, notes);
    res.json({
        message: 'Note removed from notes!'
    });
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});