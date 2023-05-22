const mongoose = require('mongoose');
const { buffer } = require('stream/consumers');


const schema = { video: String };

const model = mongoose.model('prank-camera', schema)

mongoose.connect("mongodb+srv://dava:dava@dava.ugnv1fx.mongodb.net/dava");

module.exports = model