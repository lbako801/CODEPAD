const express = require('express')
const router = express.Router()
const path = require('path');
const root = path.join(__dirname, '..', 'public');

//At the start of the route, send the index.html file
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../../public/views/index.html'));
})

//This router function sends the notes.html file when prompter.
router.get('/notes',(req,res)=> {
    res.sendFile(path.join(__dirname,'../../public/views/notes.html'));
})

//export router to be used in server.js
module.exports = router;