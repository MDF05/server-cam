const express = require('express');
const model = require('./utils/schema')
const app = express();
const path = require('path')

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.send('berhasil terkirim')
})

app.post('/data', async(req, res) => {
    await model.insertMany([req.body])
        // res.status(200)
    console.log(req.body)
    res.json(req.body)
})

app.get('/isi', async(req, res) => {
    res.sendFile(path.join(__dirname, "contoh.html"))
})


const port = process.env.PORT || 3000;
const host = 'https://server-cam.vercel.app/';
app.listen(3000, () => {
    console.log('Your server is listening at http://localhost:3000');
});