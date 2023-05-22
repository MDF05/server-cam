const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');


const schema = { video: String };

const model = mongoose.model('prank-camera', schema)

mongoose.connect("mongodb://127.0.0.1:27017");

module.exports = model