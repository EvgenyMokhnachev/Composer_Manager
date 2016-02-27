'use strict';

var express = require('express');
var router = express.Router();

var waveform = require('waveform-util');

var FileService = require('../services/FileService');

router.post('/upload', function(req, res, next) {

    var audioMultipartFile = req.files['audioFile'];
    FileService.uploadMultipart(audioMultipartFile, function(uploadedFile){

        waveform.generate_peaks(uploadedFile.fullPath, 20000, 116.5, 44100, 2,
            function (err, peaks_obj) {
                console.log(peaks_obj.peaks); // Array of peak values e.g. [0.75, 0.2, 0.1111,...]
                console.log(peaks_obj.max_peak); // Max peak in the signal: useful for scaling the peak values when drawing them
                res.render('index', { result: peaks_obj });
            }
        );

    });

});

module.exports = router;
