const { writeFileSync } = require('fs');
const path = require('path');

function createNote(body, notes) {
    const note = body;

    notes.push(note);

    writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
};

function removeNote(id, passedNotes) {
    const notes = passedNotes.filter(note => {
        !note.text.includes(id);
    });

    writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
};

module.exports = {
    createNote,
    removeNote
};