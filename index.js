const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const { Model } = require('./utils/schema')
const multer = require('multer');
const cors = require('cors')
const bodyParser = require('body-parser')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

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

app.post('/upload', upload.single('video'), async(req, res) => {
    return res.json({ name: 'muhammad dava fahreza', data: req.file })

    try {
        const { originalname, buffer } = req.file;

        // Menyimpan data video ke MongoDB
        const video = new Model({
            buffer: {
                data: buffer.data,
                tyep: buffer.type
            },
            originalname
        });

        video.save()
            .then(() => {
                res.status(200).json({ message: 'Video berhasil diunggah dan disimpan.' });
            })
            .catch((error) => {
                console.error('Terjadi kesalahan saat menyimpan video:', error);
                res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan video.' });
            });

        return res.json({ status: 'ok', pesan: 'Berhasil disimpan ke database', data: result });
    } catch (error) {
        return res.status(500).json({ pesan: 'Gagal menyimpan video ke database', dataVideo: req.file, error });
    }
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