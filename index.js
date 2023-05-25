const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const { model } = require('./utils/schema')
const cors = require('cors')
const multer = require('multer');
const upload = multer().single('video');
const bodyParser = require('body-parser')

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOption))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/upload', (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah file.' });
        }

        await model.insertMany([req.file]).then(
            () => res.json({ status: 'ok', pesan: 'berhasil disimpan ke database' }),
            (error) => res.json({ status: 500, pesan: req.file, error })
        )
    });
});

app.get('/isi', async(req, res) => {
    const video = await model.find({});
    res.json({ status: video })
})

const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});