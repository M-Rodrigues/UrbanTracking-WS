const estacaoService = require('./../models/estacao');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

module.exports = {
    app: {},

    setApp(app) { 
        this.app = app; 
        this.loadAPI();
    },

    loadAPI() {
        this.app.get('/estacoes', async (req, res) => { // Todas Estacoes
            res.send(JSON.stringify(await estacaoService.getEstacoes()));
        });

        this.app.get('/estacoes/:id', async (req, res) => { // Read Estacao
            res.send(JSON.stringify(await estacaoService.getEstacao(req.params.id)));
        });

        this.app.put('/estacoes', jsonParser, async (req, res) => { // Update Estacao
            res.send(JSON.stringify(await estacaoService.updateEstacao(req.body)));
        });

        this.app.post('/estacoes', jsonParser, async (req, res) => { // Update Estacao
            res.send(JSON.stringify(await estacaoService.createEstacao(req.body)));
        });

    }

};