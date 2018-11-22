const { Pool } = require('pg');
const cred = require('./../cred/credentials');

module.exports = {
    async getModais() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(mod) from (
                select *
                from modal m
                order by m.id asc
            ) as mod
            `);
            client.release();
            return this.buildModaisList(result.rows);
        } catch (err) {
            return {erro: err};
        }
    },

    async getModal(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(mod) from (
                select *
                from modal m
                where m.id = $1
            ) as mod
            `,[id]);
            client.release();
            return this.buildModal(result.rows[0]);
        } catch (err) {
            return {erro: err};
        }
    },
    
    async getModalByName(name) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(mod) from (
                select *
                from modal m
                where m.nome = $1
            ) as mod
            `,[name]);
            client.release();
            return this.buildModal(result.rows[0]);
        } catch (err) {
            return {erro: err};
        }
    },

    async updateModal(modal) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                UPDATE modal
                    set nome = $1
                WHERE id = $2
            `,[modal.nome, modal.id]);
            client.release();
            return result.rows;
        } catch (err) {
            return {erro: err};
        }
    },

    async createModal(nome) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                INSERT INTO modal (nome) values
                ($1)
            `,[nome]);
            client.release();
            return await this.getModalByName(nome);
        } catch (err) {
            return {erro: err};
        }     
    },

    buildModaisList(modais) {
        let ans = [];

        modais.forEach(modal => ans.push(this.buildModal(modal)));

        return ans;
    },

    buildModal(modal) { return modal.row_to_json; }
}