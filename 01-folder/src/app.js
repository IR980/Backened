const express = require('express');

const app = express();
app.use(express.json());

const notes = [];

app.get('/',(req, res) => {
    res.send('Hello World')
})

app.get('/about',(req, res) => {
    res.send('About Page')
})

app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    
    res.status(201).json({
        message: 'Note added successfully',
        note: req.body
    })
})

app.get('/notes', (req, res) => {
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes: notes
    })
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    delete notes[id];
    res.status(200).json({
        message: 'Note deleted successfully',
        notes: notes
    })
})

app.patch('/notes/:id', (req, res) => {
    const id = req.params.id;
    const Description = req.body.Description;
    notes[id].Description = Description;
    res.status(200).json({
        message: 'Note updated successfully',
        notes: notes
    })
})

module.exports = app;