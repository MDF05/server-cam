const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');

const schema = { video: String };

const model = mongoose.model('prankCamera', schema)

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, {
        autoIndex: true,
        keepAlive: true,
        keepAliveInitialDelay: 300000
    })
    .then(() => {
        console.log('Connected to MongoDB');
        // Lakukan operasi database lainnya
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });


// (async() => {
//     await model.insertMany({ video: 'asu' })
// })()

// ngM0BQ2TGnKtk4lC

module.exports = { model }