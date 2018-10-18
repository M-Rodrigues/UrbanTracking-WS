const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./db');

var app = express();
app
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));




app.get('/', function (req, res) {
  res.send('hello world')
});

app.get('/modais', function (req, res) {
  res.send(db.getModais());
});

app.get('/estacoes', function (req, res) {
  res.send(db.getEstacoes());
});

app.get('/linhas', function (req, res) {
  res.send(db.getLinhas());
});

app.get('/rotas', function (req, res) {
  res.send(db.getRotas());
});

app.get('/trajetos', function (req, res) {
  res.send(db.getTrajetos());
});