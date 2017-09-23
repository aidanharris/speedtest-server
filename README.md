# Speedtest-Server

A JSON API for [speedtest.net](https://speedtest.net/).

## API

I'm still fleshing out how the API should work, for now:

### GET /

Returns the last 24 hours worth of data

### POST /

Takes a [speedtest](https://speedtest.net/) and returns the results

## Dependencies

* [Nodejs](https://nodejs.org/en/) (Obviously) - Tested with v8.5.0, it might work with the LTS and / or newer versions
* [speedtest-cli](https://github.com/sivel/speedtest-cli)
* [SQLite](https://sqlite.org/) - Used as a backend for PouchDB, CouchDB backends should in theory work as well but are untested
