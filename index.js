const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const { model } = require('./utils/schema')
const cors = require('cors')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json())
app.use(express.raw({ type: 'application/octet-stream' }));
app.use(cors(corsOption))

app.get('/', (req, res) => {
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/upload', upload.single('video'), async(req, res) => {
    const newVideo = new Video();
    newVideo.video.data = req.file.buffer;
    newVideo.video.contentType = req.file.mimetype;
    res.json({ newVideo })
        // newVideo.save((err, video) => {
        //     if (err) {
        //         res.json({ status: 500 });
        //     } else {
        //         res.sendStatus(200);
        //     }
        // });
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