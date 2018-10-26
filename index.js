const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

const db = require('./db');
const jsonParser = bodyParser.json();

var app = express();
app.use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT")
  next();
});
  
app.get('/', function (req, res) {
  res.send('WS working!');
});

// MODAIS

app.get('/modais', async function (req, res) { // Todos Modais
  res.send(JSON.stringify(await db.getModais()));
});

app.get('/modais/:id', async function (req, res) { // Read Modal
  res.send(JSON.stringify(await db.getModal(req.params.id)));
});

app.put('/modais', jsonParser, async function(req, res) { // Update Modal
  res.send(JSON.stringify(await db.alterarModal(req.body)));
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

// COMPOSICOES
app.get('/composicoes', async function (req, res) {
  res.send(JSON.stringify(await db.getComposicoes()));
});

app.get('/composicoes/:id', async function (req, res) {
  res.send(JSON.stringify(await db.getComposicao(req.params.id)));
});

app.put('/composicoes/:id', jsonParser, async function(req, res) {
  res.send(JSON.stringify(await db.setPosicaoAtualComposicao(req.body)));
});




