const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const { model } = require('./utils/schema')
const cors = require('cors')
const multer = require('multer');
const upload = multer().single('video');
const bodyParser = require('body-parser')
const fs = require('fs')

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOption))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/upload', (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah file.' });
        }

        fs.writeFile('./kamera.webm', req.file.buffer, function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan file video.' });
            }

            return res.json({ video: req.body, status: 'ok', pesan: 'upload' });
        });
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