const {execSync} = require('child_process');
const app = require('express')();

const expressWs = require('express-ws')(app);

app.use(require('morgan')('combined'));

const moment = require('moment');

if (!process.env.HTTP_PORT || isNaN(Number(process.env.HTTP_PORT))) {
  process.env.HTTP_PORT = 3000;
}

const {HTTP_PORT} = process.env
const SECONDS_IN_DAY = 86400;

const getPreviousUnixTimeStamp = (date = moment(new Date()).unix()) => {
  return (date - SECONDS_IN_DAY);
};

const db = require('./db');

app.ws('/subscribe', function(ws, req) {});

app.get('/', (req, res) => {
  const currentDate = moment(new Date()).unix();
  const previousDate = getPreviousUnixTimeStamp(currentDate);

  db.allDocs().then(async (ids) => {
    ids = ids.rows.filter(doc => {
      let id = Number(doc.id);

      return id <= currentDate && id >= previousDate
    });
    let docs = [];
    for (let i = 0; i < ids.length; i++) {
      docs.push(await db.get(ids[i].id));
    }
    res.json(docs);
  });
});

app.post('/', (req, res) => {
  try {
    const speedtest = JSON.parse(execSync(`speedtest --json --share`).toString());
    speedtest._id = moment(speedtest.timestamp).unix(); // todo: Check if speedtest._id is NaN
    speedtest._id = String(speedtest._id);

    db.put(speedtest);

    res.on('finish', () => {
      expressWs.getWss().clients.forEach(client => {
        client.send('reload');
      });
    });

    res.json(speedtest);
  } catch (err) {
    console.error(err);
  }
});

app.listen(HTTP_PORT);
console.log(`Server listening on port ${HTTP_PORT}...`);
