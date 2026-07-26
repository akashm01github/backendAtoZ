const express = require("express");

const app = express();

const fs = require('fs');

const usersData = require('./MOCK_DATA.json');

app.use(express.urlencoded({ extended: false }));





//! GET USER 
app.get('/api/users', (req, res) => {
    res.status(200).json({
        message: "Users Data Fetched",
        usersData
    })
})

app.get('/users', (req, res) => {
    const ui = `
    <ul>
      ${usersData.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `

    res.send(ui);
})


app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const singleUser = usersData.find((u) => u.id == id);


    if (!singleUser) {
        return res.status(200).json({
            message: "User Data Not Present",
        })
    }

    res.status(200).json({
        message: "User Data Found",
        singleUser
    })


})


//! POST USER 
app.post('/api/users', (req, res) => {

    const newUser = req.body;

    usersData.push({ ...newUser, id: usersData.length + 1 });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data) => { })

    res.status(200).json({
        message: "User Data Created"
    })
});



//! PATCH ( UPDATE USER ) 
app.patch('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const updateUserData = req.body;

    const updateUserIndex = usersData.findIndex((u) => u.id == id);

    usersData[updateUserIndex] = { ...usersData[updateUserIndex], ...updateUserData };


    fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data) => { })


    res.status(201).json({
        messgae: "User Update Complete"
    })
});


app.delete('/api/users/:id', (req, res) => {

    const { id } = req.params;

    const deleteUserIndex = usersData.findIndex((u) => u.id == id);

    if (deleteUserIndex == -1) {
        return res.status(404).json({
            messgae: "User Not Found"
        })
    }

    usersData.splice(deleteUserIndex, 1);


    fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data) => { })


    res.status(201).json({
        messgae: "User Deleted"
    })
})



app.listen(3000, () => {
    console.log(`Server is Running on Port 3000......`)
})