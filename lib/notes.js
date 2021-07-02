const { writeFileSync } = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

function createNote(body, notes) {
    const { title, text } = body;
    const note = {
        title: title,
        text: text,
        id: nanoid()
    };

    notes.push(note);

    writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    return note;
};

function removeNote(id, notes) {
    const deletedNote = findById(id, notes);
    notes.splice(notes.indexOf(deletedNote), 1);

    writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
};

function findById(id, passedNotes) {
    return passedNotes.filter(note => note.id === id)[0];
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') return false;
    if (!note.text || typeof note.text !== 'string') return false;
    return true;
};

module.exports = {
    createNote,
    removeNote,
    findById,
    validateNote
};