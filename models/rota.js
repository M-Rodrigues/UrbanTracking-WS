const { Pool } = require('pg');
const cred = require('./../cred/credentials');

module.exports = {
    async getRotasDeUmaLinhas(idlinha) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                SELECT * FROM composicao
            `);
            client.release();
            return this.buildComposicoesList(result.rows);
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
        return {
            id: composicao.id,
            codRastreador: composicao.cod_rastreador,
            geo: {
                lat: composicao.lat,
                lng: composicao.lng
            },
            ultimaAtualizacao: composicao.ultima_atualizacao,
            idModal: composicao.idmodal
        }
    }
}