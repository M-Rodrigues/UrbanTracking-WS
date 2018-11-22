const { Pool } = require('pg');
const cred = require('./cred/credentials');

module.exports = {
    // LINHA
    async getLinhas() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM linha');
            client.release();

            return await this.linhasList(result.rows);
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

    // COMPOSICAO
    async getComposicoes() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM composicao');
            client.release();
            console.log(result.rows);
            return await this.composicoesList(result.rows);
        } catch (err) {
            return {erro: err};
        }
    },

    async getComposicao(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM composicao WHERE id = $1',[id]);
            client.release();
            return result.rows[0];
        } catch (err) {
            return {erro: err};
        }
    },

    async setPosicaoAtualComposicao(composicao) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                UPDATE composicao
                SET lat = `+composicao.lat+`,
                    lng = `+composicao.lng+`,
                    ultima_atualizacao = `+composicao.ultima_atualizacao+`
                WHERE id = `+composicao.id+`
            `);
            client.release();
            return this.getComposicao(composicao.id);
        } catch (err) {
            return {erro: err};
        }
    },

    // UTILITÁRIOS
    async linhasList(data) {
        let linhasDB = data;
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
    },

    async composicoesList(data) {
        let composicoesDB = data;
        let modaisDB = await this.getModais();

        let ans = [];
        composicoesDB.forEach(composicao => {
            modaisDB.forEach(modal => {
                if (modal.id == composicao.idmodal) {
                    let comp = {
                        id: composicao.id,
                        corRastreador: composicao.cod_rastreador,
                        geo: {
                            lat: composicao.lat,
                            lng: composicao.lng
                        },
                        ultimaAtualizacao: composicao.ultima_atualizacao,
                        idModal: composicao.idmodal
                    }

                    ans.push(comp);
                }
            })
        })

        return ans;
    }
};