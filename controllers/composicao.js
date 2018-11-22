const composicaoService = require('./../models/composicao');
const bodyParser = require('body-parser')

const city = require('./../start_city.js');

const jsonParser = bodyParser.json();


module.exports = {
    app: {},

    setApp(app) { 
        this.app = app; 
        this.loadAPI();
    },

    loadAPI() {
        this.app.get('/composicoes', async (req, res) => { // Todas Estacoes
            res.send(JSON.stringify(await composicaoService.getComposicoes()));
        });

        this.app.get('/composicoes/:id', async (req, res) => { // Read Estacao
            res.send(JSON.stringify(await composicaoService.getComposicao(req.params.id)));
        });

        this.app.put('/composicoes', jsonParser, async (req, res) => { // Update Estacao
            res.send(JSON.stringify(await composicaoService.updateComposicao(req.body)));
        });

        this.app.post('/composicoes', jsonParser, async (req, res) => { // Update Estacao
            res.send(JSON.stringify(await composicaoService.createComposicao(req.body)));
        });

        //city.start(composicaoService, 0);
    }

};