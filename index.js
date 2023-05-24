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
app.use(express.raw({ type: 'application/octet-stream' }));

app.get('/', (req, res) => {
    res.json({ nama: 'muhammad dava fahreza' })
})

app.post('/data', async(req, res) => {
    // const videoBuffer = Buffer.from("asfd")
    // console.log('videoBuffer ' + JSON.stringify(req.body))
    // console.log(req.body.video)
    await model.insertMany([{ video: req.body }]).then(
        (response) => {
            res.json({
                status: 200,
                name: "muhammad dava fahreza",
                videoBuffer: req.body
            })
        },
        () => res.json({ status: 400 })
    )
})

app.get('/isi', async(req, res) => {
    const dataVideo = await model.find()
    res.json({ dataVidoe })
})


const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(port, host, () => {
    console.log('Your server is listening at http://localhost:3000');
});