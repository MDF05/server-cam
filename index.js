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
    upload(req, res, async function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah file.' });
        }

        // // Validasi data sebelum menyimpan
        // if (!req.file || !req.file.buffer || !req.file.buffer.data || !req.file.buffer.type) {
        //     return res.status(400).json({ error: 'Data file tidak valid.', dataVideo: req.file });
        // }

        try {
            // Simpan data ke MongoDB
            const result = await model.insertOne({
                buffer: {
                    // data: req.file.buffer.data,
                    type: req.file.buffer.type
                },
                encoding: req.file.encoding,
                fieldname: req.file.fieldname,
                mimetype: req.file.mimetype,
                originalname: req.file.originalname,
                size: req.file.size,
                typeBuffer: req.file.buffer.type
            });

            return res.json({ status: 'ok', pesan: 'Berhasil disimpan ke database', data: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Gagal menyimpan video ke database', dataVideo: req.file, error });
        }
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