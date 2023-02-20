const express = require('express')
const router = express.Router()
const path = require('path');
const root = path.join(__dirname, '..', 'public');

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../../public/views/index.html'));
})

router.get('/notes',(req,res)=> {
    res.sendFile(path.join(__dirname,'../../public/views/notes.html'));
})


module.exports = router;