const { Binary } = require('mongodb');
const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');

const schema = new mongoose.Schema({
    buffer: {
        data: {
            type: Buffer,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    encoding: {
        type: String
    },
    fieldname: {
        type: String
    },
    mimetype: {
        type: String
    },
    originalname: {
        type: String
    },
    size: {
        type: Number
    }
});

const model = mongoose.model('prankCamera', schema)

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(dbURI, {
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // serverSelectionTimeoutMS: 500000, // Timeout untuk seleksi server
        // bufferTimeoutMS: 3000000,
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