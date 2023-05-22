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

app.post('/', async(req, res) => {
    console.log(req.body)
    await model.insertMany([req.body])
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