// npm init
require('dotenv').config()
const express = require('express');
const app = express();

const port = 4000; // Define port before using it

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
    res.send("Hello I am Irshad");
});

app.get("/login",(req,res) => {
    res.send("<h1>Please login the chai aur code website</h1>")
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${port}`);
});
