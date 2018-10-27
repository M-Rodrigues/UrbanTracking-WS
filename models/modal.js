const { Pool } = require('pg');
const cred = require('./../cred/credentials');

module.exports = {
    async getModais() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                SELECT * FROM modal
            `);
            client.release();
            return result.rows;
        } catch (err) {
            return {erro: err};
        }
    },

    async getModal(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                SELECT * from modal WHERE id = $1
            `,[id]);
            client.release();
            return result.rows[0];
        } catch (err) {
            return {erro: err};
        }
    },
    
    async getModalByName(name) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
                SELECT * from modal WHERE nome = $1
            `,[name]);
            client.release();
            return result.rows[0];
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
    }
}