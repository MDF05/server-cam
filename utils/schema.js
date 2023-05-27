const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');


const Schema = new mongoose.Schema({
    name: String,
    type: String,
    data: Buffer
})


const Model = mongoose.model('video.chunk', Schema)

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect('mongodb+srv://palen:ngM0BQ2TGnKtk4lC@dava.v4rbver.mongodb.net/serverCamera?retryWrites=true&w=majority', {
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