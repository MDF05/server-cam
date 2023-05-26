const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const { Model } = require('./utils/schema')
const multer = require('multer');
const cors = require('cors')
const bodyParser = require('body-parser')

// Konfigurasi Multer
const upload = multer({ dest: 'public/uploads/' });

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOption))


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/upload', upload.single('file'), async(req, res) => {
    return res.json({ status: 200, pesan: 'ok' }).status(200)
});

app.get('/isi', async(req, res) => {
    const video = await Model.find({});
    res.json({ status: video })
})

const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});