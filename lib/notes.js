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
};

function removeNote(id, passedNotes) {
    const note = findById(id, passedNotes);
    passedNotes.splice(passedNotes.indexOf(note), 1);

    writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ passedNotes }, null, 2)
    );
};

function findById(id, passedNotes) {
    return passedNotes.filter(note => note.id === id)[0];
};

module.exports = {
    createNote,
    removeNote,
    findById
};