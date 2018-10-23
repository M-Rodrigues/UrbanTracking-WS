const { Pool } = require('pg');
const cred = require('./cred/credentials');

module.exports = {
    modais: [
        {id: 1,nome: 'Metrô'},
        {id: 2,nome: 'BRT'},
        {id: 3,nome: 'VLT'},
        {id: 4,nome: 'Trem'},
        {id: 5,nome: 'Ônibus'}
    ],
    estacoes: [
        {id: 1, nome: 'Jardim Oceânico', lat: -23.006807, lng: -43.311032, idModal: 1},
        {id: 2, nome: 'São Conrado', lat: -22.993602, lng: -43.253796, idModal: 1},
        {id: 3, nome: 'Antero de Quental', lat: -22.9846, lng: -43.223411, idModal: 1},
        {id: 4, nome: 'Jardim de Alah', lat: -22.983267, lng: -43.215962, idModal: 1},
        {id: 5, nome: 'Nossa Senhora da Paz', lat: -22.983709, lng: -43.207003, idModal: 1},
        {id: 6, nome: 'General Osório', lat: -22.98485, lng: -43.19719, idModal: 1},
        {id: 7, nome: 'Cantagalo', lat: -22.976689, lng: -43.193786, idModal: 1},
        {id: 8, nome: 'Siqueira Campos', lat: -22.96733, lng: -43.186992, idModal: 1},
        {id: 9, nome: 'Cardeal Arcoverde', lat: -22.964542, lng: -43.180769, idModal: 1},
        {id: 10, nome: 'Botafogo', lat: -22.951245, lng: -43.184277, idModal: 1},
        {id: 11, nome: 'Flamengo', lat: -22.937094, lng: -43.178382, idModal: 1},
        {id: 12, nome: 'Largo do Machado', lat: -22.930986, lng: -43.178386, idModal: 1},
        {id: 13, nome: 'Catete', lat: -22.925811, lng: -43.176512, idModal: 1},
        {id: 14, nome: 'Glória', lat: -22.920475, lng: -43.176592, idModal: 1},
        {id: 15, nome: 'Cinelândia', lat: -22.911727, lng: -43.175672, idModal: 1},
        {id: 16, nome: 'Carioca', lat: -22.908246, lng: -43.178521, idModal: 1},
        {id: 17, nome: 'Uruguaiana', lat: -22.902840, lng: -43.181648, idModal: 1},
        {id: 18, nome: 'Presidente Vargas', lat: -22.903729, lng: -43.185671, idModal: 1},
        {id: 19, nome: 'Central', lat: -22.904888, lng: -43.190813, idModal: 1},
        {id: 20, nome: 'Praça Onze', lat: -22.909987, lng: -43.200482, idModal: 1},
        {id: 21, nome: 'Estácio', lat: -22.913582, lng: -43.206286, idModal: 1},
        {id: 22, nome: 'Afonso Pena', lat: -22.918406, lng: -43.217794, idModal: 1},
        {id: 23, nome: 'São Francisco Xavier', lat: -22.920686, lng: -43.223813, idModal: 1},
        {id: 24, nome: 'Saes Peña', lat: -22.924429, lng: -43.232749, idModal: 1},
        {id: 25, nome: 'Uruguai', lat: -22.931978, lng: -43.239674, idModal: 1},
        {id: 26, nome: 'Cidade Nova', lat: -22.909135, lng: -43.206280, idModal: 1},
        {id: 27, nome: 'São Cristóvão', lat: -22.909913, lng: -43.220201, idModal: 1},
        {id: 28, nome: 'Maracanã', lat: -22.909701, lng: -43.233499, idModal: 1},
        {id: 29, nome: 'Triagem', lat: -22.896947, lng: -43.244560, idModal: 1},
        {id: 30, nome: 'Maria da Graça', lat: -22.881632, lng: -43.260358, idModal: 1},
        {id: 31, nome: 'Nova América/Del Castilho', lat: -22.879413, lng: -43.271650, idModal: 1},
        {id: 32, nome: 'Inhaúma', lat: -22.874678, lng: -43.283436, idModal: 1},
        {id: 33, nome: 'Engenho da Rainha', lat: -22.867976, lng: -43.297496, idModal: 1},
        {id: 34, nome: 'Thomaz Coelho', lat: -22.862549, lng: -43.306779, idModal: 1},
        {id: 35, nome: 'Vicente de Carvalho', lat: -22.853923, lng: -43.313299, idModal: 1},
        {id: 36, nome: 'Irajá', lat: -22.847844, lng: -43.323918, idModal: 1},
        {id: 37, nome: 'Colégio', lat: -22.842730, lng: -43.334800, idModal: 1},
        {id: 38, nome: 'Coelho Neto', lat: -22.831680, lng: -43.343284, idModal: 1},
        {id: 39, nome: 'Acari Fazenda Botafogo', lat: -22.824696, lng: -43.349727, idModal: 1},
        {id: 40, nome: 'Engenherio Rubens Paiva', lat: -22.816399, lng: -43.358407, idModal: 1},
        {id: 41, nome: 'Pavuna', lat: -22.806495, lng: -43.365260, idModal: 1},
        {id: 42, nome: 'Praia Formosa', lat: -22.903034, lng: -43.208290, idModal: 3},
        {id: 43, nome: 'Rodoviária', lat: -22.898997, lng: -43.207287, idModal: 3},
        {id: 44, nome: 'Equador', lat: -22.897999, lng: -43.204894, idModal: 3},
        {id: 45, nome: 'Pereira Reis', lat: -22.896684, lng: -43.201729, idModal: 3},
        {id: 46, nome: 'Vila Olímpica', lat: -22.899441, lng: -43.200259, idModal: 3},
        {id: 47, nome: 'Central', lat: -22.902738, lng: -43.192082, idModal: 3},
        {id: 48, nome: 'Saara', lat: -22.905840, lng: -43.187432, idModal: 3},
        {id: 49, nome: 'Tiradentes', lat: -22.906566, lng: -43.183052, idModal: 3},
        {id: 50, nome: 'Colombo', lat: -22.905211, lng: -43.178116, idModal: 3},
        {id: 51, nome: 'Praça XV', lat: -22.902194, lng: -43.173130, idModal: 3},
        {id: 52, nome: 'Gamboa', lat: -22.897959, lng: -43.199519, idModal: 3},
        {id: 53, nome: 'Santo Cristo', lat: -22.895399, lng: -43.200195, idModal: 3},
        {id: 54, nome: 'Cordeiro da Graça', lat: -22.897089, lng: -43.204304, idModal: 3},
        {id: 55, nome: 'Providência', lat: -22.897712, lng: -43.196965, idModal: 3},
        {id: 56, nome: 'Harmonia', lat: -22.895597, lng: -43.191183, idModal: 3},
        {id: 57, nome: 'Parada dos Navios', lat: -22.894243, lng: -43.187235, idModal: 3},
        {id: 58, nome: 'Parada dos Museus', lat: -22.896062, lng: -43.181999, idModal: 3},
        {id: 59, nome: 'São Bento', lat: -22.899057, lng: -43.179853, idModal: 3},
        {id: 60, nome: 'Candelária', lat: -22.901785, lng: -43.178930, idModal: 3},
        {id: 61, nome: 'Sete de Setembro', lat: -22.905317, lng: -43.177585, idModal: 3},
        {id: 62, nome: 'Carioca', lat: -22.908258, lng: -43.176446, idModal: 3},
        {id: 63, nome: 'Cinelândia', lat: -22.910887, lng: -43.175459, idModal: 3},
        {id: 64, nome: 'Antônio Carlos', lat: -22.911366, lng: -43.172205, idModal: 3},
        {id: 65, nome: 'Santos Dumont', lat: -22.912418, lng: -43.167618, idModal: 3},
        {id: 66, nome: 'Utopia AquaRio', lat: -22.893067, lng: -43.190110, idModal: 3},
        {id: 67, nome: 'Cidade do Samba', lat: -22.894579, lng: -43.198038, idModal: 3},
        {id: 76, nome: 'Terminal Alvorada', lat: -23.001064, lng: -43.365726, idModal: 2},
        {id: 178, nome: 'Madureira (Manaceia)', lat: -22.877300, lng: -43.336212, idModal: 2},
        {id: 185, nome: 'Vicente de Carvalho', lat: -22.852485, lng: -43.312542, idModal: 2},
        {id: 198, nome: 'Terminal Fundão', lat: -22.839301, lng: -43.240991, idModal: 2},
        {id: 199, nome: 'Galeão Tom Jobim 2', lat: -22.814461, lng: -43.246386, idModal: 2}
    ],
    linhas: [
        {id: 1, nome: 'Linha 1', idModal: 1},
        {id: 2, nome: 'Linha 2', idModal: 1},
        {id: 3, nome: 'Linha 4', idModal: 1},
        {id: 4, nome: 'Linha 1 - Azul', idModal: 3},
        {id: 5, nome: 'Linha 2 - Verde', idModal: 3},
        {id: 6, nome: '30 - Semidireto (Transcarioca)', idModal: 2},
        {id: 7, nome: '31 - Semidireto (Transcarioca)', idModal: 2},
        {id: 8, nome: '35 - Parador (Transcarioca)', idModal: 2},
        {id: 9, nome: '38 - Parador (Transcarioca)', idModal: 2},
        {id: 10, nome: '40 - Expresso (Transcarioca)', idModal: 2},
        {id: 11, nome: '41 - Expresso (Transcarioca)', idModal: 2},
        {id: 12, nome: '42 - Parador (Transcarioca)', idModal: 2},
        {id: 13, nome: '43 - Expresso (Transcarioca)', idModal: 2},
        {id: 14, nome: '46 - Expresso (Transcarioca)', idModal: 2},
        {id: 15, nome: '50 - Parador (Transcarioca)', idModal: 2},
        {id: 16, nome: '12 - Magarça x Alvorada - Expresso (Transoeste)', idModal: 2},
        {id: 17, nome: '18 - Expresso (Transoeste)', idModal: 2},
        {id: 18, nome: '21A - Parador (Transoeste)', idModal: 2},
        {id: 19, nome: '15 - Expresso (Transoeste)', idModal: 2},
        {id: 20, nome: '17 - Parador (Transoeste)', idModal: 2},
        {id: 21, nome: '13 - Expresso (Transoeste)', idModal: 2},
        {id: 22, nome: '13 - Direto (Transoeste)', idModal: 2},
        {id: 23, nome: '25 - Semidireto (Transoeste)', idModal: 2},
        {id: 24, nome: '12 - Magarça x Alvorada - Direto (Transoeste)', idModal: 2},
        {id: 25, nome: '19 - Expresso (Transoeste)', idModal: 2},
        {id: 26, nome: '12 - Pingo Dágua x Alvorada - Expresso (Transoeste)', idModal: 2},
        {id: 27, nome: '12 - Pingo Dágua x Alvorada - Direto (Transoeste)', idModal: 2},
        {id: 28, nome: '20 - Expresso (Transoeste)', idModal: 2},
        {id: 29, nome: '10 - Santa Cruz x Alvorada - Direto (Transoeste)', idModal: 2},
        {id: 30, nome: '10 - Santa Cruz x Alvorada - Expresso (Transoeste)', idModal: 2},
        {id: 31, nome: '11 - Parador (Transoeste)', idModal: 2},
        {id: 32, nome: '22 - Parador (Transoeste)', idModal: 2},
        {id: 33, nome: '53 - Expresso', idModal: 2},
        {id: 34, nome: '51 - Parador', idModal: 2}
    ],
    rotas: [
        {id: 1, nome: 'Gal. Osório x Uruguai', idLinha: 1},
        {id: 2, nome: 'Uruguai x Gal. Osório', idLinha: 1},
        {id: 3, nome: 'Pavuna x Botafogo', idLinha: 2},
        {id: 4, nome: 'Botafogo x Pavuna', idLinha: 2},
        {id: 5, nome: 'Jardim Oceânico x Gal. Osório', idLinha: 3},
        {id: 6, nome: 'Gal. Osório x Jardim Oceânico', idLinha: 3},
        {id: 7, nome: 'Praia Formosa x Santos Dumont', idLinha: 4},
        {id: 8, nome: 'Santos Dumont x Praia Formosa', idLinha: 4},
        {id: 9, nome: 'Praia Formosa x Praça XV', idLinha: 5},
        {id: 10, nome: 'Praça XV x Praia Formosa', idLinha: 5}
    ],
    trajetos: [
        {idRota: 1, ordem: 1, idEstacao: 6},
        {idRota: 1, ordem: 2, idEstacao: 7},
        {idRota: 1, ordem: 3, idEstacao: 8},
        {idRota: 1, ordem: 4, idEstacao: 9},
        {idRota: 1, ordem: 5, idEstacao: 10},
        {idRota: 1, ordem: 6, idEstacao: 11},
        {idRota: 1, ordem: 7, idEstacao: 12},
        {idRota: 1, ordem: 8, idEstacao: 13},
        {idRota: 1, ordem: 9, idEstacao: 14},
        {idRota: 1, ordem: 10, idEstacao: 15},
        {idRota: 1, ordem: 11, idEstacao: 16},
        {idRota: 1, ordem: 12, idEstacao: 17},
        {idRota: 1, ordem: 13, idEstacao: 18},
        {idRota: 1, ordem: 14, idEstacao: 19},
        {idRota: 1, ordem: 15, idEstacao: 20},
        {idRota: 1, ordem: 16, idEstacao: 21},
        {idRota: 1, ordem: 17, idEstacao: 22},
        {idRota: 1, ordem: 18, idEstacao: 23},
        {idRota: 1, ordem: 19, idEstacao: 24},
        {idRota: 1, ordem: 20, idEstacao: 25},
        {idRota: 2, ordem: 1, idEstacao: 25},
        {idRota: 2, ordem: 2, idEstacao: 24},
        {idRota: 2, ordem: 3, idEstacao: 23},
        {idRota: 2, ordem: 4, idEstacao: 22},
        {idRota: 2, ordem: 5, idEstacao: 21},
        {idRota: 2, ordem: 6, idEstacao: 20},
        {idRota: 2, ordem: 7, idEstacao: 19},
        {idRota: 2, ordem: 8, idEstacao: 18},
        {idRota: 2, ordem: 9, idEstacao: 17},
        {idRota: 2, ordem: 10, idEstacao: 16},
        {idRota: 2, ordem: 11, idEstacao: 15},
        {idRota: 2, ordem: 12, idEstacao: 14},
        {idRota: 2, ordem: 13, idEstacao: 13},
        {idRota: 2, ordem: 14, idEstacao: 12},
        {idRota: 2, ordem: 15, idEstacao: 11},
        {idRota: 2, ordem: 16, idEstacao: 10},
        {idRota: 2, ordem: 17, idEstacao: 9},
        {idRota: 2, ordem: 18, idEstacao: 8},
        {idRota: 2, ordem: 19, idEstacao: 7},
        {idRota: 2, ordem: 20, idEstacao: 6},
        {idRota: 3, ordem: 1, idEstacao: 41},
        {idRota: 3, ordem: 2, idEstacao: 40},
        {idRota: 3, ordem: 3, idEstacao: 39},
        {idRota: 3, ordem: 4, idEstacao: 38},
        {idRota: 3, ordem: 5, idEstacao: 37},
        {idRota: 3, ordem: 6, idEstacao: 36},
        {idRota: 3, ordem: 7, idEstacao: 35},
        {idRota: 3, ordem: 8, idEstacao: 34},
        {idRota: 3, ordem: 9, idEstacao: 33},
        {idRota: 3, ordem: 10, idEstacao: 32},
        {idRota: 3, ordem: 11, idEstacao: 31},
        {idRota: 3, ordem: 12, idEstacao: 30},
        {idRota: 3, ordem: 13, idEstacao: 29},
        {idRota: 3, ordem: 14, idEstacao: 28},
        {idRota: 3, ordem: 15, idEstacao: 27},
        {idRota: 3, ordem: 16, idEstacao: 26},
        {idRota: 3, ordem: 17, idEstacao: 19},
        {idRota: 3, ordem: 18, idEstacao: 18},
        {idRota: 3, ordem: 19, idEstacao: 17},
        {idRota: 3, ordem: 20, idEstacao: 16},
        {idRota: 3, ordem: 21, idEstacao: 15},
        {idRota: 3, ordem: 22, idEstacao: 14},
        {idRota: 3, ordem: 23, idEstacao: 13},
        {idRota: 3, ordem: 24, idEstacao: 12},
        {idRota: 3, ordem: 25, idEstacao: 11},
        {idRota: 3, ordem: 26, idEstacao: 10},
        {idRota: 4, ordem: 1, idEstacao: 10},
        {idRota: 4, ordem: 2, idEstacao: 11},
        {idRota: 4, ordem: 3, idEstacao: 12},
        {idRota: 4, ordem: 4, idEstacao: 13},
        {idRota: 4, ordem: 5, idEstacao: 14},
        {idRota: 4, ordem: 6, idEstacao: 15},
        {idRota: 4, ordem: 7, idEstacao: 16},
        {idRota: 4, ordem: 8, idEstacao: 17},
        {idRota: 4, ordem: 9, idEstacao: 18},
        {idRota: 4, ordem: 10, idEstacao: 19},
        {idRota: 4, ordem: 11, idEstacao: 26},
        {idRota: 4, ordem: 12, idEstacao: 27},
        {idRota: 4, ordem: 13, idEstacao: 28},
        {idRota: 4, ordem: 14, idEstacao: 29},
        {idRota: 4, ordem: 15, idEstacao: 30},
        {idRota: 4, ordem: 16, idEstacao: 31},
        {idRota: 4, ordem: 17, idEstacao: 32},
        {idRota: 4, ordem: 18, idEstacao: 33},
        {idRota: 4, ordem: 19, idEstacao: 34},
        {idRota: 4, ordem: 20, idEstacao: 35},
        {idRota: 4, ordem: 21, idEstacao: 36},
        {idRota: 4, ordem: 22, idEstacao: 37},
        {idRota: 4, ordem: 23, idEstacao: 38},
        {idRota: 4, ordem: 24, idEstacao: 39},
        {idRota: 4, ordem: 25, idEstacao: 40},
        {idRota: 4, ordem: 26, idEstacao: 41},
        {idRota: 5, ordem: 1, idEstacao: 1},
        {idRota: 5, ordem: 2, idEstacao: 2},
        {idRota: 5, ordem: 3, idEstacao: 3},
        {idRota: 5, ordem: 4, idEstacao: 4},
        {idRota: 5, ordem: 5, idEstacao: 5},
        {idRota: 5, ordem: 6, idEstacao: 6},
        {idRota: 6, ordem: 1, idEstacao: 6},
        {idRota: 6, ordem: 2, idEstacao: 5},
        {idRota: 6, ordem: 3, idEstacao: 4},
        {idRota: 6, ordem: 4, idEstacao: 3},
        {idRota: 6, ordem: 5, idEstacao: 2},
        {idRota: 6, ordem: 6, idEstacao: 1},
        {idRota: 7, ordem: 1, idEstacao: 42},
        {idRota: 7, ordem: 2, idEstacao: 43},
        {idRota: 7, ordem: 3, idEstacao: 44},
        {idRota: 7, ordem: 4, idEstacao: 45},
        {idRota: 7, ordem: 5, idEstacao: 52},
        {idRota: 7, ordem: 6, idEstacao: 55},
        {idRota: 7, ordem: 7, idEstacao: 56},
        {idRota: 7, ordem: 8, idEstacao: 57},
        {idRota: 7, ordem: 9, idEstacao: 58},
        {idRota: 7, ordem: 10, idEstacao: 59},
        {idRota: 7, ordem: 11, idEstacao: 60},
        {idRota: 7, ordem: 12, idEstacao: 61},
        {idRota: 7, ordem: 13, idEstacao: 62},
        {idRota: 7, ordem: 14, idEstacao: 63},
        {idRota: 7, ordem: 15, idEstacao: 64},
        {idRota: 7, ordem: 16, idEstacao: 65},
        {idRota: 8, ordem: 1, idEstacao: 65},
        {idRota: 8, ordem: 2, idEstacao: 64},
        {idRota: 8, ordem: 3, idEstacao: 63},
        {idRota: 8, ordem: 4, idEstacao: 62},
        {idRota: 8, ordem: 5, idEstacao: 61},
        {idRota: 8, ordem: 6, idEstacao: 60},
        {idRota: 8, ordem: 7, idEstacao: 59},
        {idRota: 8, ordem: 8, idEstacao: 58},
        {idRota: 8, ordem: 9, idEstacao: 57},
        {idRota: 8, ordem: 10, idEstacao: 66},
        {idRota: 8, ordem: 11, idEstacao: 67},
        {idRota: 8, ordem: 12, idEstacao: 53},
        {idRota: 8, ordem: 13, idEstacao: 54},
        {idRota: 8, ordem: 14, idEstacao: 43},
        {idRota: 8, ordem: 15, idEstacao: 42},
        {idRota: 9, ordem: 1, idEstacao: 42},
        {idRota: 9, ordem: 2, idEstacao: 43},
        {idRota: 9, ordem: 3, idEstacao: 44},
        {idRota: 9, ordem: 4, idEstacao: 45},
        {idRota: 9, ordem: 5, idEstacao: 46},
        {idRota: 9, ordem: 6, idEstacao: 47},
        {idRota: 9, ordem: 7, idEstacao: 48},
        {idRota: 9, ordem: 8, idEstacao: 49},
        {idRota: 9, ordem: 9, idEstacao: 50},
        {idRota: 9, ordem: 10, idEstacao: 51},
        {idRota: 10, ordem: 1, idEstacao: 51},
        {idRota: 10, ordem: 2, idEstacao: 50},
        {idRota: 10, ordem: 3, idEstacao: 49},
        {idRota: 10, ordem: 4, idEstacao: 48},
        {idRota: 10, ordem: 5, idEstacao: 47},
        {idRota: 10, ordem: 6, idEstacao: 52},
        {idRota: 10, ordem: 7, idEstacao: 53},
        {idRota: 10, ordem: 8, idEstacao: 54},
        {idRota: 10, ordem: 9, idEstacao: 43},
        {idRota: 10, ordem: 10, idEstacao: 42}
    ],

    async getModais() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM modal');
            client.release();
            return result.rows;
        } catch (err) {
            return {erro: err};
        }
    },

    async getEstacoes() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM estacao');
            client.release();

            let estacoes = result.rows;
            let ans = [];
            estacoes.forEach(estacao => {
                let estacaoObj = {
                    id: estacao.id,
                    nome: estacao.nome,
                    geo: {
                    lat: estacao.lat,
                    lng: estacao.lng
                    },
                    idModal: estacao.idmodal
                };
                ans.push(estacaoObj);
            })
            
            return ans;
        } catch (err) {
            return {erro: err};
        }

    },

    getEstacao(id, estacoes) {
        let ans;
        estacoes.forEach(estacao => {
            if (estacao.id == id) {
                ans = {
                    id: estacao.id,
                    nome: estacao.nome,
                    geo: {
                        lat: estacao.geo.lat,
                        lng: estacao.geo.lng
                    },
                    idModal: estacao.idModal
                };
                return ans;
            }
        })
        return ans;
    },

    async getLinhas() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM linha');
            client.release();


            let linhasDB = result.rows;
            let rotasDB = await this.getRotas();
            let trajetsoDB = await this.getTrajetos();
            let estacoesDB = await this.getEstacoes();

            let ans = [];
            linhasDB.forEach(linha => {
                let rotas = [];
                rotasDB.forEach(rota => {
                    if (rota.idlinha == linha.id) {
                        let paradas = [];
                        trajetsoDB.forEach(trajeto => {
                            if (trajeto.idrota == rota.id) {
                                paradas.push(this.getEstacao(trajeto.idestacao, estacoesDB));
                            } 
                        })
                        rotas.push({
                            id: rota.id,
                            nome: rota.nome,
                            trajeto: paradas
                        });
                    }
                })
                
                ans.push({
                    id: linha.id,
                    nome: linha.nome,
                    rotas: rotas,
                    idModal: linha.idmodal
                })
            });

            return ans;
        } catch (err) {
            return {erro: err};
        }

    },

    async getRotas() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM rota');
            client.release();
            return result.rows;
        } catch (err) {
            return {erro: err};
        }
    },

    async getTrajetos() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM trajeto');
            client.release();
            return result.rows;
        } catch (err) {
            return {erro: err};
        }
    }


};