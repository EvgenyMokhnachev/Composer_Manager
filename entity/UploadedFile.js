'use strict';

var mongoose = require('mongoose');
var utcNow = require('utc-now');

var UploadedFile = new mongoose.Schema({
    path: String,
    fullPath: String,
    name: String,
    extension: String,
    size: Number,
    type: String,
    date: {
        type: Date,
        default: utcNow()
    }
});

module.exports = mongoose.model('UploadedFile', UploadedFile);