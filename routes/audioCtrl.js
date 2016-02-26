'use strict';

var express = require('express');
var router = express.Router();

var UploadFileService = require('../services/UploadFileService');

router.post('/upload', function(req, res, next) {

    var audioMultipartFile = req.files['audioFile'];
    UploadFileService.uploadMultipart(audioMultipartFile, function(uploadedFile){
        res.send(uploadedFile);
    });

});

module.exports = router;
