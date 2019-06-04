const validator = require('validator')
const yargs = require('yargs')
const notes = require('./notes')
const log = console.log


// Customize Yargs Version
yargs.version('1.1.0')

// Create Add Command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to be removed',
            demandOption: true,
            type: 'String'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create List Command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

// Read Command
yargs.command({
    command: 'read',
    describe: 'Read your notes',
    builder: {
        title: {
            describe: "Read the note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// Add, Remove, Read, List
yargs.parse()