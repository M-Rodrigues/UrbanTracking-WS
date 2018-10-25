const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const db = require('./db');

var app = express();
app.use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
app.get('/', function (req, res) {
  res.send('WS working!');
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

// COMPOSICOES
app.get('/composicoes', async function (req, res) {
  res.send(JSON.stringify(await db.getComposicoes()));
});


// Simulando Atualizações em tempo real da posição de 1 composição
// let i = 0;
// setInterval(async function() {
//   let posicoes = [
//     {id:1, cod_restreador: '531829', lat: -22.9371670004413, lng: -43.1785575093104, ultima_atualizacao: 1540426111106, idmodal: 1},
//     {id:1, cod_restreador: '531829', lat: -22.9393691201638, lng: -43.1790421523969, ultima_atualizacao: 1540426113106, idmodal: 1},
//     {id:1, cod_restreador: '531829', lat: -22.9412391139108, lng: -43.180929258985, ultima_atualizacao: 1540426115106, idmodal: 1},
//     {id:1, cod_restreador: '531829', lat: -22.9448643766835, lng: -43.183867140996, ultima_atualizacao: 1540426117106, idmodal: 1},
//     {id:1, cod_restreador: '531829', lat: -22.947374725384, lng: -43.1841673624987, ultima_atualizacao: 1540426119106, idmodal: 1},
//     {id:1, cod_restreador: '531829', lat: -22.9511378318007, lng: -43.1841662500492, ultima_atualizacao: 1540426121107, idmodal: 1}
//   ]

//   let ans = await db.setPosicaoAtualComposicao(posicoes[i]);
//   console.log(ans);

//   i = (i+1)%6;
// }, 2000);
