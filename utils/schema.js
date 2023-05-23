const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');


const schema = { video: String };

const model = mongoose.model('prankCamera', schema)

mongoose.connect("mongodb://https://server-cam.vercel.app:27017", {
    autoIndex: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
});

// (async() => {
//     await model.insertMany({ video: 'asu' })
// })()

module.exports = { model }