'use strict';

//function UploadedFile(path, fullPath, name, extension, size, type){
//    this.id = undefined;
//    this.path = path;
//    this.fullPath = fullPath;
//    this.name = name;
//    this.extension = extension;
//    this.size = size;
//    this.type = type;
//}
//
//module.exports = UploadedFile;

var mongoose = require('mongoose');

var UploadedFile = mongoose.model('UploadedFile', {
    //id: mongoose.Schema.Types.ObjectId,
    path: String,
    fullPath: String,
    name: String,
    extension: String,
    size: Number,
    type: String
});

module.exports = UploadedFile;