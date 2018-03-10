'use strict';

const fs = require('fs');

const Path = require('path');
const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');

const uploader = require('./uploader');

const UPLOAD_PATH = '/srv/upload/';
const KEEPR_HOST = process.env.KEEPR_HOST;
const MAX_BYTES = 10485760 || process.env.MAX_BYTES;

const server = Hapi.Server({
    port: 3000,
    host: KEEPR_HOST,
    debug: { request: ['error'] }
});

const init = async () => {
    await server.register(Inert);
    await server.register(Vision);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });

    await server.start();
    console.log(UPLOAD_PATH);
    console.log(process.env.KEEPR_HOST);
    console.log('Server started on ' + KEEPR_HOST);
};

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        const listing = fs.readdirSync(UPLOAD_PATH).map((item) => ({'name': item}));
        return h.view('upload', {listing: listing});
    }
});

server.route({
    method: 'POST',
    path: '/upload',
    config: {
        payload: {
            allow: 'multipart/form-data',
            output: 'stream',
            maxBytes: MAX_BYTES,
            uploads: UPLOAD_PATH
        }
    },
    handler: async (request, h) => {
        const details = await uploader(request.payload['file'], {dest: UPLOAD_PATH});
        console.log(details);
        return h.redirect('/');
    }
});

server.route({
    method: 'GET',
    path: '/get/{name}',
    handler: async (request, h) => {
        const requestedFile = Path.join(UPLOAD_PATH, request.params.name);
        return h.file(requestedFile);
    }
});

server.events.on('log', (event, tags) => {
    if (tags.error) {
        console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
    }
});

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
