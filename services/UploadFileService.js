'use strict';

var fs = require('fs');
var uuid = require('uuid');
var UploadedFile = require('../entity/UploadedFile');
var fileExtension = require('file-extension');
var path = require('path');

function UploadFileService(){
    this.uploadsPath = '../uploads/';
}

UploadFileService.prototype.getFileExtension = function(fileName){
    return fileExtension(fileName);
};

UploadFileService.prototype.uploadMultipart = function(multipartFile, success, error){
    var self = this;

    fs.readFile(multipartFile.path, function (err, data) {
        if(error){
            error(err);
            return;
        }

        var uploadedFilePath = path.join(self.uploadsPath, uuid.v4() + '-' + uuid.v1());

        fs.writeFile(uploadedFilePath, data, function (err) {
            if(err){
                if(error){
                    error(err);
                    return;
                }
            }
            var uploadedFile = new UploadedFile({
                path: uploadedFilePath,
                fullPath: path.resolve(uploadedFilePath),
                name: multipartFile.name,
                extension: self.getFileExtension(multipartFile.name),
                size: multipartFile.size,
                type: multipartFile.type
            });

            uploadedFile.save(function (err) {
                if (err) {
                    if(error){
                        error(err);
                        return;
                    }
                }

                if(success){
                    success(uploadedFile);

                    UploadedFile.find().exec(function(error, data){
                        data.forEach(function(item){
                            console.log(item._id)
                        });
                    });
                }
            });
        });
    });
};

module.exports = new UploadFileService();