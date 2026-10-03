const express = require('express');
const Note = require('./models/note.model');
const dns = require('dns');

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(express.json());

const notes = [];

app.get('/',(req, res) => {
    res.send('Hello World')
})

app.get('/about',(req, res) => {
    res.send('About Page')
})

app.post('/notes', async (req, res) => {
    // console.log(req.body);
    // notes.push(req.body);
    const data = req.body;
    await Note.create({
        Title: data.Title,
        Description: data.Description
    });
    
    res.status(201).json({
        message: 'Note Created successfully',
        note: notes
    })
})

app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes: notes
    })
})

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;
    await Note.findOneAndDelete({ 
      _id: id 
    });
    res.status(200).json({
        message: 'Note deleted successfully'
    });
})

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Note.findOneAndUpdate({
        _id: id
    }, {
        Title: data.Title,
        Description: data.Description
    });
    res.status(200).json({
        message: 'Note updated successfully'
    });
})

module.exports = app;


// mohammadirshad9163_db_user  5X2KNK0RHutSRtJq
// mongodb+srv://mohammadirshad9163_db_user:5X2KNK0RHutSRtJq@cluster0.iqqgrbf.mongodb.net/