const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');


const schema = { video: String };

const model = mongoose.model('prankCamera', schema)

mongoose.connect("mongodb+srv://palen:Om4GPREvpvVkA7C0@dava.v4rbver.mongodb.net/", {
    autoIndex: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
});



module.exports = model