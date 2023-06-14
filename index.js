const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const { Model } = require('./utils/schema1')
const { ModelPesan } = require('./utils/schema2')
const multer = require('multer');
const cors = require('cors')
const { GridFsStorage } = require('multer-gridfs-storage');
const { user } = require('./routes/routes');

require('dotenv').config()


// Konfigurasi penyimpanan GridFS
const storage = new GridFsStorage({
    url: process.env.mongodbAtlasVideo,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'video', // Nama bucket/GridFS koleksi yang akan digunakan
            filename: file.originalname, // Gunakan nama asli file
        };
    },
});

// Buat middleware upload dengan Multer
const upload = multer({ storage: storage });

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOption))

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, }));


app.get('/', (req, res) => user(req, res))

app.post('/api/message', upload.none(), async(req, res) => {
    try {
        const message = new ModelPesan({
            name: req.body.name,
            message: req.body.message
        })

        await message.save()
        return res.json({ pesan: 'pesan tersimpan ke database', status: 200 }).status(200)
    } catch (error) {
        return res.json({ pesan: 'gagal tersimpan ke database', status: 500, error }).status(500)
    }
})

app.post('/api/upload', upload.single('video'), async(req, res) => {
    return res.json({ status: 200, pesan: 'ok' }).status(200)
});

app.get('/data/:id', async(req, res) => {
    const video = await Model.findOne({ n: parseFloat(req.params.id) });
    return res.json({ status: 'pindah sekolah', video })
})

console.log(process.env.name)


const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, () => {
    console.log('Your server is listening at http://localhost:3000');
});