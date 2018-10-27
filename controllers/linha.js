const linhaService = require('./../models/linha');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

module.exports = {
    app: {},

    setApp(app) { 
        this.app = app; 
        this.loadAPI();
    },

    loadAPI() {
        this.app.get('/linhas', async (req, res) => {
            res.send(JSON.stringify(await linhaService.getLinhas()));
        });
        
        this.app.get('/linhas/estacao/:id', async (req, res) => {
            res.send(JSON.stringify(await linhaService.getLinhasPorEstacao(req.params.id)));
        });
    }

};