const express = require('express')
const path = require('path')

const modalCtrl = require('./controllers/modal.js');
const estacaoCtrl = require('./controllers/estacao.js');
const linhaCtrl = require('./controllers/linha.js');
const composicaoCtrl = require('./controllers/composicao.js');

const PORT = process.env.PORT || 5000

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



modalCtrl.setApp(app);
estacaoCtrl.setApp(app);
linhaCtrl.setApp(app);
composicaoCtrl.setApp(app);


// COMPOSICOES
// app.get('/composicoes', async function (req, res) {
//   res.send(JSON.stringify(await db.getComposicoes()));
// });

// app.get('/composicoes/:id', async function (req, res) {
//   res.send(JSON.stringify(await db.getComposicao(req.params.id)));
// });

// app.put('/composicoes/:id', jsonParser, async function(req, res) {
//   res.send(JSON.stringify(await db.setPosicaoAtualComposicao(req.body)));
// });

