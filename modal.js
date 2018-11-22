const modalService = require('./../models/modal');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

module.exports = {
    app: {},

    setApp(app) { 
        this.app = app; 
        
        this.loadAPI();
    },

    loadAPI() {
        this.app.get('/modais', async (req, res) => { // Todos Modais
            res.send(JSON.stringify(await modalService.getModais()));
        });

        this.app.get('/modais/:id', async (req, res) => { // Read Modal
            res.send(JSON.stringify(await modalService.getModal(req.params.id)));
        });

        this.app.put('/modais', jsonParser, async (req, res) => { // Update Modal
            res.send(JSON.stringify(await modalService.updateModal(req.body)));
        });

        this.app.post('/modais', jsonParser, async (req, res) => {
            res.send(JSON.stringify(await modalService.createModal(req.body.nome)));
        });
        
    }

};