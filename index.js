const express = require('express');
const model = require('./utils/schema')
const app = express();
const cors = require('cors')
const path = require('path')

app.use(cors(corsOptions))
app.use(
    express.urlencoded({
        extended: true,
    })
);

const corsOptions = {
    origin: 'https://frontend-mdf05.vercel.app/', // Atur domain yang diizinkan untuk mengakses 
    methods: 'GET,POST', // Atur metode HTTP yang diizinkan
    allowedHeaders: 'Content-Type', // Atur header yang diizinkan
};

app.get('/', (req, res) => {
    res.send('berhasil terkirim')
})

app.post('/', async(req, res) => {
    await model.insertMany([req.body])
    res.send('berhasil')
    res.redirect('/')
})

app.get('/contoh', (req, res) => {
    res.sendFile(path.join(__dirname, 'contoh.html'))
})

const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});