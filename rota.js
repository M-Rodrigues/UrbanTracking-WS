const rotaService = require('./../models/rota');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

module.exports = {
    app: {},

    setApp(app) { 
        this.app = app; 
        this.loadAPI();
    },

    loadAPI() {
        // // Todas Rotas
        // this.app.get('/rotas', async (req, res) => { 
        //     res.send(JSON.stringify(await rotaService.getRotas()));
        // });

        // Rotas de uma Linha
        this.app.get('/rotas/linha/:id', async (req, res) => { 
            res.send(JSON.stringify(await rotaService.getRotasDeUmaLinhas(req.params.id)));
        });

        // // Update Rotas
        // this.app.put('/rotas', jsonParser, async (req, res) => { 
        //     res.send(JSON.stringify(await rotaService.updateComposicao(req.body)));
        // });

        // // Create Rotas
        // this.app.post('/rotas', jsonParser, async (req, res) => { 
        //     res.send(JSON.stringify(await rotaService.createComposicao(req.body)));
        // });
    }
};