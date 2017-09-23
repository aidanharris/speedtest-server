const PouchDB = require('pouchdb-node');
PouchDB.plugin(require('pouchdb-adapter-node-websql'));

module.exports = (new PouchDB('speedtests', {adapter: 'websql'}));
