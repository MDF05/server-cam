const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const { Model } = require('./utils/schema')
const cors = require('cors')
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser')

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
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah file.' });
    }

    // Validasi data sebelum menyimpan
    if (!req.file || !req.file.buffer || !req.file.buffer.data || !req.file.buffer.type) {
        return res.status(400).json({ error: 'Data file tidak valid. atau kosong', dataVideo: req.file });
    }


    try {
        const dataVideo = {
                buffer: {
                    data: req.file.buffer.data,
                    type: req.file.buffer.type
                },
                encoding: req.file.encoding,
                fieldname: req.file.fieldname,
                mimetype: req.file.mimetype,
                originalname: req.file.originalname,
                size: req.file.size,
                typeBuffer: req.file.buffer.type
            }
            // Simpan data ke MongoDB
        const result = await Model.create(dataVideo)
            .then(succes => res.status(200).json({ succes, status: 'ok' }))
            .catch(err => res.status(500).json({ err, status: 'error' }))

        // return res.json({ status: 'ok', pesan: 'Berhasil disimpan ke database', data: result });
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