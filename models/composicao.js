const { Pool } = require('pg');
const cred = require('./../cred/credentials');

module.exports = {
    async getComposicoes() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(comp) from (
                select
                    comp.id, comp.cod_rastreador,
                    (select row_to_json(geo) from (
                        select g.lat, g.lng 
                        from composicao g
                        where g.id = comp.id
                    ) as geo) as geo,
                    comp.ultima_atualizacao, comp.idmodal
                from composicao comp
                order by comp.id asc
            ) as comp
            `);
            client.release();
            return this.buildComposicoesList(result.rows);
        } catch (err) {
            return {erro: err};
        }
    },

    async getComposicao(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(comp) from (
                select
                    comp.id, comp.cod_rastreador,
                    (select row_to_json(geo) from (
                        select g.lat, g.lng 
                        from composicao g
                        where g.id = comp.id
                    ) as geo) as geo,
                    comp.ultima_atualizacao, comp.idmodal
                from composicao comp
                where comp.id = $1
            ) as comp
            `,[id]);
            client.release();
            return this.buildComposicao(result.rows[0]);
        } catch (err) {
            return {erro: err};
        }
    },
    
    async getComposicaoByRastreador(cod) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(comp) from (
                select
                    comp.id, comp.cod_rastreador,
                    (select row_to_json(geo) from (
                        select g.lat, g.lng 
                        from composicao g
                        where g.id = comp.id
                    ) as geo) as geo,
                    comp.ultima_atualizacao, comp.idmodal
                from composicao comp
                where comp.cod_rastreador = $1
            ) as comp
            `,[cod]);
            client.release();
            return this.buildComposicao(result.rows[0]);
        } catch (err) {
            return {erro: err};
        }
    },

    async updateComposicao(comp) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                UPDATE composicao
                SET cod_rastreador = $1, 
                    lat = $2,
                    lng = $3,
                    idmodal = $4,
                    ultima_atualizacao = $5
                WHERE id = $6
            `,[comp.cod_rastreador, comp.lat, comp.lng, comp.idmodal, comp.ultima_atualizacao, comp.id]);
            
            client.release();
            return await this.getComposicaoByRastreador(comp.cod_rastreador);
        } catch (err) {
            return {erro: err};
        }
    },

    async createComposicao(comp) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                INSERT INTO composicao (cod_rastreador, lat, lng, ultima_atualizacao, idmodal) values
                ($1, $2, $3, $4, $5)
            `,[comp.cod_rastreador, comp.lat, comp.lng, comp.ultima_atualizacao, comp.idmodal]);
            client.release();

            return await this.getComposicaoByRastreador(comp.cod_rastreador);
        } catch (err) {
            return {erro: err};
        }     
    },

    buildComposicoesList(comps) {
        let composicoesDB = comps;

        let ans = [];
        composicoesDB.forEach(composicao => {
            ans.push(this.buildComposicao(composicao));
        })

        return ans;
    },

    buildComposicao(composicao) {
        return composicao.row_to_json;
    }
}