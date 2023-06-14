const express = require('express');

function user(req, res) {
    return res.json({ name: 'muhammad dava fahreza' })
}


module.exports = { user }