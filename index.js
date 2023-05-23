const express = require('express');
const app = express();
const path = require('path')
const model = require('./utils/schema')
const cors = require('cors')

const corsConfig = {
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

app.use(cors(corsConfig))

app.get('/', (req, res) => {
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/data', (req, res) => {
    model.insertMany([req.body]).then(() => {
        res.json(body)
    }).catch(err => {
        res.json(err)
    })
})

app.get('/isi', async(req, res) => {
    // res.sendFile(path.join(__dirname, "contoh.html"))
    res.json({ succes: 'gagal' })
})


const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(3000, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});