const express = require("express");
const { nanoid } = require("nanoid");

const app = express();


app.use(express.urlencoded({ extended: false }));


//!####################### Routes ################################# 

const notes = [];


//! READ
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Notes Fetched",
        notes
    })
})




//! CREATE
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;

    const newTask = {
        id: nanoid(),
        title,
        content,
        completed: false,
        createdAt: new Date().toISOString()
    }

    notes.push(newTask);

    res.status(201).json({
        messgae: "Notes Created",
        newTask
    })
})

//! UPDATE

app.patch('/api/notes/:id', (req, res) => {
    const { id } = req.params;


    const updates = req.body;


    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex == -1) {
        return res.status(200).json({
            message: "Note Index Not Found"
        })
    }

    if (updates.completed !== undefined) {
        updates.completed = updates.completed === true || updates.completed == "true";
    }

    notes[noteIndex] = { ...notes[noteIndex], ...updates }


    res.status(200).json({
        message: "Notes Updated"
    })
})






//! DELETE
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;


    const noteIndex = notes.findIndex((note) => note.id === id);

  
    if (noteIndex == -1) {
        return res.status(200).json({
            message: "Note Not Exist"
        })
    }


    notes.splice(noteIndex,1)


    res.status(200).json({
        message: "Notes Updated"
    })
})







//! FILTER 


app.listen(3000, () => {
    console.log('Server is Runnig on Port 3000.......');
})