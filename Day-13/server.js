const express = require("express");
const { nanoid } = require("nanoid");

const app = express();

app.use(express.json());

const contacts = [];


app.get('/api/contacts', (req, res) => {
    res.status(200).json({
        message: "All Contacts Fetched",
        contacts
    })
})


app.post('/api/contacts', (req, res) => {
    const { name, phone, email, address } = req.body;


    const newContact = {
        id: nanoid(),
        name,
        phone,
        email,
        address
    }

    contacts.push(newContact)


    res.status(200).json({
        message: "Contact Created",
        newContact
    })
})


app.patch('/api/contacts/:id', (req, res) => {

    const { id } = req.params;

    const updatedData = req.body;

    const findIndex = contacts.findIndex((contact) => contact.id === id);

    if (findIndex == -1) {
        return res.status(200).json({
            message: "Contact Not Found"
        })
    }

    contacts[findIndex] = { ...contacts[findIndex], ...updatedData };



    res.status(200).json({
        message: "Contact Updated"
    })
})


app.delete('/api/contacts/:id', (req, res) => {
    const { id } = req.params;


    const findIndex = contacts.findIndex((contact) => contact.id === id);

    if (findIndex == -1) {
        return res.status(200).json({
            message: "Contact Not Found"
        })
    }

    contacts.splice(findIndex, 1);



    res.status(200).json({
        message: "Contact Deleted"
    })
})



app.listen(3000, () => {
    console.log('Server is Running on Port 3000.....')
})