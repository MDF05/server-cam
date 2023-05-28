const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    message: String,
})

const ModelPesan = mongoose.model('message', Schema)

module.exports = { ModelPesan }