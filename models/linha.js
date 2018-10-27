const { Pool } = require('pg');
const cred = require('./../cred/credentials');

const estacaoService = require('./estacao');

module.exports = {
    // LINHA
    async getLinhas() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                select 
                    l.id
                    , l.nome
                    , l.idmodal
                    , r.id as idRota
                    , r.nome as nomeRota
                    , t.ordem
                    , e.id as idEstacao
                    , e.nome as nomeEstacao
                    , e.lat as latEstacao
                    , e.lng as lngEstacao
                from linha l
                join rota r on l.id = r.idlinha
                join trajeto t on r.id = t.idrota
                join estacao e on t.idestacao = e.id
            `);
            client.release();

            return this.buildLinhasList(result.rows);
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
    },

    async getLinhasPorEstacao(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                SELECT * FROM linha l
                WHERE `+ id +` in (
                    SELECT idestacao FROM trajeto t
                    JOIN rota r ON r.id = t.idrota
                    WHERE r.idlinha = l.id
                )
            `);
            client.release();

            return await this.linhasList(result.rows);
        } catch (err) {
            return {erro: err};
        }
    },

    async buildLinhasList(linhas) {
        let linhasDB = linhas;
        let rotasDB = await this.getRotas();
        let trajetsoDB = await this.getTrajetos();

        let ans = [];
        linhasDB.forEach(linha => {
            let rotas = [];
            rotasDB.forEach(rota => {
                if (rota.idlinha == linha.id) {
                    let paradas = [];
                    trajetsoDB.forEach(trajeto => {
                        if (trajeto.idrota == rota.id) {
                            const estacao = estacaoService.getEstacao(trajeto.idestacao);
                            paradas.push(estacao);
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
    }
}