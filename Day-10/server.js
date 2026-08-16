const express = require("express");

const app = express();

const { nanoid } = require("nanoid");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


const notes = [];

//! READ  
app.get('/api/notes', (req, res) => {
    res.status(200).json({
        message: "Notes Fetched",
        notes
    })
})


//! CREATE 
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;

    const newNote = {
        title,
        content,
        id: nanoid(),
        completed: false,
        createdAt: new Date().toISOString()
    }

    notes.push(newNote)

    res.status(201).json({
        message: "Notes Created",
        newNote
    })
})


//! UPDATE

app.patch('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    const updates = req.body;

    if (updates.completed !== undefined) {
        updates.completed = updates.completed === true || updates.completed === 'true';
    }

    const notesIndex = notes.findIndex((note) => note.id == id);

    if (notesIndex === -1) {
        return res.status(400).json({
            message: "Notes Not Found"
        })
    }

    notes[notesIndex] = { ...notes[notesIndex], ...updates }


    res.status(200).json({
        message: "Notes Updated"
    })

})


//! DELETE

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    const notesIndex = notes.findIndex((note) => note.id == id);

    if (notesIndex === -1) {
        return res.status(400).json({
            message: "Notes Not Found"
        })
    }

    notes.splice(notesIndex, 1);


    res.status(200).json({
        message: "Notes Deleted"
    })

})



//! FILTER

app.get('/api/notes/filter', (req, res) => {
    const { date, completed } = req.query;

    let filteredNotes = [...notes];

    if (date) {
        filteredNotes = filteredNotes.filter((note) => {
            const noteDate = new Date(note.createdAt).toISOString().split('T')[0];

            return noteDate === date;
        })
    }

    if (completed !== undefined) {
        const isCompleted = completed === 'true';

        filteredNotes = filteredNotes.filter((note) => note.completed === isCompleted);

    }

    res.status(200).json({
        message: "Filtered Notes Fetched",
        count: filteredNotes.length,
        notes: filteredNotes
    });
})




app.listen(3000, () => {
    console.log('Server is Runnning on Port 3000.......')
})
