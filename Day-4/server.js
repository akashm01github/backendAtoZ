const express = require("express");
const fs = require("fs");


const app = express();

const users = require('./MOCK_DATA.json');

app.use(express.urlencoded({ extended: false }));


//! GET USERS  AS HTML FORMAT
app.get('/users', (req, res) => {

    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `
    res.send(html);
})


//! GET USERS  AS JSON FORMAT
app.get('/api/users', (req, res) => {
    res.status(200).json({
        message: "Users Data Fetched",
        users
    })
})


//! GET A SINGLE USERS
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id == id);

    res.status(200).json({
        message: "Users Data Fetched",
        user
    })

})


// ! CREATE USER 
app.post('/api/users/', (req, res) => {

    const body = req.body;

    users.push({ ...body, id: users.length + 1 });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => { });


    res.status(200).json({
        message: "User Created"
    })
})


//! UPDATE USER

app.patch('/api/users/:id',(req,res)=>{
    const {id} = req.params;
    const body = req.body;
    const userIndex = users.findIndex((u)=>u.id == id);
    
    users[userIndex] = {...users[userIndex], ...body};

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data)=>{})


    res.status(400).json({
        message:"Update Complete"
    })
})


app.delete('/api/users/:id',(req,res)=>{
    const {id} = req.params;

    const body = req.body;

    const userIndex = users.findIndex((u)=>u.id == id);
    
    users.splice(userIndex,1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data)=>{})


    res.status(400).json({
        message:"Update Deleted"
    })
})


app.listen(3000, () => {
    console.log('Server is Running on Port 3000......');
})