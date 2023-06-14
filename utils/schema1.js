const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');
require('dotenv').config();


const Schema = new mongoose.Schema({
    name: String,
    type: String,
    data: Buffer
})


const Model = mongoose.model('video.chunk', Schema)

mongoose.connect(process.env.mongodbAtlasVideo, {
        // dbName: 'serverCamera',
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected!'));


// (async() => {
//     const cicak = new Model({ name: 'asu', type: 'susu' })

//     await cicak.save()

// })()

// ngM0BQ2TGnKtk4lC

module.exports = { Model }