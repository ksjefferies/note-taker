const fs = require('fs');
const express = require('express');
const path = require('path');
const uuid = require('uuid');

const app = express();
const port = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static('develop/public'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'develop/public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'develop/public/notes.html'))
});
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'develop/public/index.html'))
// });

app.get('/api/notes', (req, res) => {
    const json = fs.readFileSync('./develop/db/db.json', 'utf-8')
    res.send(json)
})

app.post('/api/notes', (req, res) => {
    let json = fs.readFileSync('./develop/db/db.json', 'utf-8')
    let dB = JSON.parse(json)
    dB.push({ id: uuid.v4(), ...req.body });
    fs.writeFileSync('./develop/db/db.json', JSON.stringify(dB));
    res.send(JSON.stringify(req.body));
})

app.delete()

// Listener
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);