const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = notes.find(note=> note.title === title);
    if (duplicate === undefined) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('Note added'));
    } else {
        console.log(chalk.red.inverse('Note already exists'));
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    let index = -1;
    notes.forEach(note => {
        if (note.title === title) {
            index = notes.indexOf(note);
        }
    });
    if (index >= 0) {
        notes.splice(index, 1);
        saveNotes(notes);
        console.log(chalk.green.inverse('Note removed'));
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    try {
        const notesJSON = JSON.stringify(notes);
        fs.writeFileSync('./notes.json', notesJSON);
    } catch(e) {
        console.error(e.toString());
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your Notes:'));
    notes.forEach(note => console.log(note.title));
}

const readNote= (title) => {
    const notes = loadNotes();
    debugger
    const match = notes.find(note=> note.title === title);
    if (match) {
        console.log(chalk.bold.yellowBright(match.title));
        console.log(match.body);
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote
}