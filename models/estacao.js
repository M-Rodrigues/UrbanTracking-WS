const { Pool } = require('pg');
const cred = require('./../cred/credentials');

module.exports = {
    async getEstacoes() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(est) from (
                select 
                    e.id, e.nome, 
                    (select row_to_json(g) from (
                        select est.lat, est.lng from estacao est where est.id = e.id
                    ) as g) as geo,
                    e.idmodal
                from estacao e
                order by e.id asc
            ) as est
            `);
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
            select row_to_json(est) from (
                select 
                    e.id, e.nome, 
                    (select row_to_json(g) from (
                        select est.lat, est.lng from estacao est where est.id = e.id
                    ) as g) as geo,
                    e.idmodal
                from estacao e
                where e.id = $1
            ) as est
            `,[id]);
            client.release();

            return this.buildEstacao(result.rows[0]);
        } catch (err) {
            return {erro: err};
        }
    },

    async getEstacoesProximas(lat, lng, r) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(est) from (
                select 
                    e.id, e.nome, 
                    (select row_to_json(g) from (
                        select est.lat, est.lng from estacao est where est.id = e.id
                    ) as g) as geo,
                    e.idmodal
                from estacao e
                where dist_reta(e.lat, e.lng, $1, $2) <= power($3,2)
                order by dist_reta(e.lat, e.lng, $1, $2) asc
            ) as est
            `,[lat, lng, r]);
            client.release();

            return this.buildEstacoesList(result.rows);
        } catch (err) {
            return {erro: err};
        }
    },
    
    async getEstacaoByNameAndModal(name, idmodal) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(est) from (
                select 
                    e.id, e.nome, 
                    (select row_to_json(g) from (
                        select est.lat, est.lng from estacao est where est.id = e.id
                    ) as g) as geo,
                    e.idmodal
                from estacao e
                where e.nome = $1 and e.idmodal = $2
            ) as est
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
        
        //estacoes.forEach(estacao => ans.push(this.buildEstacao(estacao)));
        estacoes.forEach(estacao => ans.push(this.buildEstacao(estacao)));

        return ans;
    },


    buildEstacao(estacao) {
        return estacao.row_to_json;
    }
}