const { Pool } = require('pg');
const cred = require('./../cred/credentials');

module.exports = {
    async getEstacoes() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM estacao');
            client.release();

            return await this.buildEstacoesList(result.rows);
        } catch (err) {
            return {erro: err};
        }
    },

    async getEstacao(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                SELECT * from estacao WHERE id = $1
            `,[id]);
            client.release();

            return await this.buildEstacao(result.rows[0]);
        } catch (err) {
            return {erro: err};
        }
    },
    
    async getEstacaoByNameAndModal(name, idmodal) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                SELECT * from estacao WHERE nome = $1 and idmodal = $2
            `,[name, idmodal]);
            client.release();

            return await this.buildEstacao(result.rows[0]);
        } catch (err) {
            return {erro: err};
        }
    },

    async updateEstacao(estacao) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                UPDATE estacao
                    set nome = $1
                        , lat = $2
                        , lng = $3
                WHERE id = $4
            `,[estacao.nome, estacao.geo.lat, estacao.geo.lng, estacao.id]);
            client.release();

            return await this.getEstacao(estacao.id);
        } catch (err) {
            return {erro: err};
        }
    },

    async createEstacao(estacao) {
        console.log(estacao);
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                INSERT INTO estacao (nome, lat, lng, idmodal) VALUES
                ($1, $2, $3, $4)
            `,[estacao.nome, estacao.lat, estacao.lng, estacao.idmodal]);
            client.release();

            return await this.getEstacaoByNameAndModal(estacao.nome, estacao.idModal);
        } catch (err) {
            return {erro: err};
        }     
    },

    async buildEstacoesList(estacoes) {
        let ans = [];
        
        estacoes.forEach(estacao => ans.push(this.buildEstacao(estacao)));

        return ans;
    },

    buildEstacao(estacao) {
        return {
            id: estacao.id,
            nome: estacao.nome,
            geo: {
                lat: estacao.lat,
                lng: estacao.lng
            },
            idModal: estacao.idmodal
        };
    }
}