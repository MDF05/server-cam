const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const { Model } = require('./utils/schema')
const multer = require('multer');
const cors = require('cors')
const bodyParser = require('body-parser')
const { GridFsStorage } = require('multer-gridfs-storage');


// Konfigurasi penyimpanan GridFS
const storage = new GridFsStorage({
    url: 'mongodb+srv://palen:ngM0BQ2TGnKtk4lC@dava.v4rbver.mongodb.net/serverCamera?retryWrites=true&w=majority',
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
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOption))

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.get('/', (req, res) => {
    return res.json({ nama: 'muhammad dava fahreza' })
})

app.get('/isi', async(req, res) => {
    return res.json({ status: 'jablay sebelah' })
})

app.get('/data', async(req, res) => {
    // const video = await Model.findOne({ n: req.params.id });
    const data = req.query.info
    return res.json({ status: 'pindah sekolah', params: data || 'kosong' })
})

app.post('/api/upload', upload.single('video'), async(req, res) => {
    return res.json({ data: req.file, status: 200, pesan: 'ok' }).status(200)
});

app.post('/test', (req, res) => {
    res.json({ data: 'aman', coba: 'testing' })
})


const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});