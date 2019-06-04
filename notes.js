const fs = require('fs')
const chalk = require('chalk')
const gradient = require('gradient-string')
const log = console.log

const successText = chalk.green
const failText = chalk.red

const addNote = (title, body) => {
    
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        log(successText('New note added!'))
    } else {
        log(failText('Note title taken!'))
    }


}

const removeNote = (title) => {
    const notes = loadNotes()

    const newNotes = notes.filter((note) => note.title !== title)

    if (notes.length > newNotes.length) {
        saveNotes(newNotes)
        log(successText(`The note titled "${title}" was removed!`))
    } else {
        log(failText(`The note titled "${title}" does not exist.`))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes()
    log(gradient.pastel('Your notes:\n'))
    notes.forEach((note) => log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToBeRead = notes.find((note) => note.title === title)

    if (noteToBeRead) {
        log(gradient.passion(title))
        log(noteToBeRead.body)
    } else {
        log(chalk.red(`The note titled "${title}" was not found!`))
    }

    
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}