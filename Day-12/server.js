const express = require("express");
const { nanoid } = require("nanoid");

const app = express();

app.use(express.urlencoded({ extended: false }));

const notes = [];


//!########################## ROUTES ################################# 

app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Notes Fetched",
        notes,
    })
});



//! CREATE  
app.post('/api/notes', (req, res) => {

    const { title, content } = req.body;


    const newTask = {
        id: nanoid(),
        title,
        content,
        isCompleted: false,
        createdAt: new Date().toISOString()
    }


    notes.push(newTask);



    res.status(200).json({
        message: "Notes Created",
        newTask
    })
});


//! UPDATE 
app.patch('/api/notes/:id', (req, res) => {

    const { id } = req.params;

    const updatedTask = req.body;

    const taskIndex = notes.findIndex((note) => note.id === id);


    if (taskIndex == -1) {
        return res.status(200).json({
            message: "Notes Note Found"
        })
    }

    if(updatedTask !== undefined){
        updatedTask.isCompleted = updatedTask.isCompleted===true || updatedTask.isCompleted==="true";
    }

    notes[taskIndex] = {...notes[taskIndex], ...updatedTask}





    res.status(200).json({
        message: "Notes Updated",
        taskIndex
    })
});


//! DELETE 
app.delete('/api/notes/:id', (req, res) => {

    const { id } = req.params;

    const taskIndex = notes.findIndex((note) => note.id === id);


    if (taskIndex == -1) {
        return res.status(200).json({
            message: "Notes Note Found"
        })
    }


    notes.splice(taskIndex,1);

    

    res.status(200).json({
        message: "Notes Updated",
        taskIndex
    })
});



//! FILTER 
app.get('/api/notes/filter',(req,res)=>{

    const {isCompleted} = req.query;

    console.log(typeof isCompleted)

    let filterNotes = [...notes];

    if(isCompleted != undefined){
        const completed = isCompleted === 'true';
        
        filterNotes = filterNotes.filter((note)=>note.isCompleted === isCompleted)
        
    }


      res.status(200).json({
        message: "Notes Updated",
        filterNotes
    })
})



//! START THE SERVER 
app.listen(3000, () => {
    console.log('Server is Running on Port 3000.......');
})