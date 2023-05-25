const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const { model } = require('./utils/schema')
const cors = require('cors')
const multer = require('multer');
const upload = multer().single('video');

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOption))

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json())
app.use(express.raw({ type: 'application/octet-stream' }));

app.get('/', (req, res) => {
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ error: 'gagal mengupload video', status: '500', err }).status(500)
        }

        const video = req.body
        return res.json(video)

    })
})

app.get('/isi', async(req, res) => {
    const video = await model.find({});
    res.json({ status: video })
})


const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});