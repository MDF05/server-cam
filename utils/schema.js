const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');

const schema = {
    buffer: {
        type: Buffer,
        required: true
    },
    encoding: {
        type: String,
        required: true
    },
    fieldname: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
};

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