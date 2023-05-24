const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');

const schema = new mongoose.Schema({
    video: {
        data: Buffer,
        contentType: String
    }
});

const model = mongoose.model('prankCamera', schema)

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, {
        autoIndex: true,
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
            // serverSelectionTimeoutMS: 500000, // Timeout untuk seleksi server
            // bufferTimeoutMS: 300000,
            // keepAliveInitialDelay: 3000000
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });


// (async() => {
//     await model.insertMany({ video: 'asu' })
// })()

// ngM0BQ2TGnKtk4lC

module.exports = { model }