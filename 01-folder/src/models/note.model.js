const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;