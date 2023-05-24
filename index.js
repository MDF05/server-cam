const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const { model } = require('./utils/schema')
const cors = require('cors')


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
app.use(cors(corsOption))

app.get('/', (req, res) => {
    console.log(model)
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/data', async(req, res) => {
    const videoBuffer = new Buffer(req.body.video)
    console.log(videoBuffer)
    const modelData = new model({ video: videoBuffer })
    modelData.save(() => res.status = 200, () => res.status = 500)

    // model.insertMany([videoBuffer]).then(() => {
    //     // res.json(req.body)
    //     res.send('makasih')
    // }).catch(err => {
    //     // res.json({ error: "sorry error" })
    //     res.send('asu')
    // })


})

app.get('/isi', async(req, res) => {
    res.json({ succes: 'gagal' })
})


const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});