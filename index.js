const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const db = require('./db');
const cred = require('./credentials');

var app = express();
app
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


app.get('/', function (req, res) {
  res.send('hello world')
});

app.get('/modais', async function (req, res) {
  res.send(JSON.stringify(await db.getModais()));
});

app.get('/estacoes', async function (req, res) {
  res.send(JSON.stringify(await db.getEstacoes()));
});

app.get('/linhas', async function (req, res) {
  res.send(JSON.stringify(await db.getLinhas()));
});

