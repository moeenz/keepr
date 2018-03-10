const fs = require('fs');

/* [START] Borrowed from: https://scotch.io/bar-talk/handling-file-uploads-with-hapi-js */
const uploader = (file, options) => {
    if (!file) throw new Error('no file(s)');

    return _fileHandler(file, options);
}

const _fileHandler = (file, options) => {
    if (!file) throw new Error('no file');

    const filename = file.hapi.filename;
    const path = `${options.dest}${filename}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', function (err) {
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename: filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            }

            resolve(fileDetails);
        })
    })
}
/* [END] Borrowed from: https://scotch.io/bar-talk/handling-file-uploads-with-hapi-js */

module.exports = uploader;