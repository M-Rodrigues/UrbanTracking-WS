const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const db = require('./db');

var app = express();
app
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  

app.get('/', function (req, res) {
  res.send('hello world')
});

// MODAIS

app.get('/modais', async function (req, res) {
  res.send(JSON.stringify(await db.getModais()));
});

// ESTACOES

app.get('/estacoes', async function (req, res) {
  res.send(JSON.stringify(await db.getEstacoes()));
});

// LINHAS

app.get('/linhas', async function (req, res) {
  res.send(JSON.stringify(await db.getLinhas()));
});

app.get('/linhas/estacao/:id', async function(req, res) {
  res.send(JSON.stringify(await db.getLinhasPorEstacao(req.params.id)));
});

