const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));


const notes = [];

app.get('/', (req,res)=>{
    res.status(200).json({
        message:"Hello Akash!"
    })
})

app.get('/notes', (req,res)=>{
    res.status(200).json({
        message:"Notes Fetched",
        notes
    })
})


app.post('/api/notes',(req,res)=>{
    const data = req.body;

    notes.push(data)
    
    res.status(200).json({
        notes
    })
})

app.listen(3000,()=>{
    console.log('Server is Runnning on Port 3000.......')
})
