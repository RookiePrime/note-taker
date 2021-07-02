const { createNote, removeNote, findById, validateNote } = require('../lib/notes');
const { notes } = require('../db/db.json');

jest.mock('fs');

test('Create a note', () => {
    const body = {
        title: 'Jest test note',
        text: 'Jest test best rest fest quest guest nest'
    }
    const note = createNote(body, notes);

    expect(note).toBeTruthy();
});

test('Find a note', () => {
    const body = {
        title: 'Jest test note',
        text: 'Jest test best rest fest quest guest nest'
    }
    const note = createNote(body, notes);
    expect(findById(note.id, notes)).toBe(note);
});

test('Remove a note', () => {
    const body1 = {
        title: 'Jest test note',
        text: 'Jest test best rest fest quest guest nest'
    }
    const body2 = {
        title: 'Note mote cote',
        text: 'Rote tote yote wote vote zote pote'
    }
    const note1 = createNote(body1, notes);
    const note2 = createNote(body2, notes);

    removeNote(note2.id, notes);

    expect(findById(note2.id, notes)).toBeFalsy();
    expect(findById(note1.id, notes)).toBeTruthy();
});

test('Validate a note', () => {
    const goodNote = {
        title: 'Jest test note',
        text: 'Jest test best rest fest quest guest nest'
    }
    const badNote1 = {
        frump: 'Jest test note',
        text: 'Jest test best rest fest quest guest nest'
    }
    const badNote2 = {
        title: 'Jest test note',
        text: 1
    }

    expect(validateNote(goodNote)).toBeTruthy();
    expect(validateNote(badNote1)).toBeFalsy();
    expect(validateNote(badNote2)).toBeFalsy();
});