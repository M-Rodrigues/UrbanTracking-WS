const { Pool } = require('pg');
const cred = require('./../cred/credentials');

const estacaoService = require('./estacao');
const modalService = require('./modal');

module.exports = {
    // LINHA
    async getLinhas() {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select json_agg(line) from (
                select
                    l.id, l.nome, l.idmodal,
                    (select json_agg(rota) from (
                        select r.id, r.nome,
                            (select json_agg(traj) from (
                                select e.id, e.nome,
                                    (select row_to_json(geo) from (
                                        select g.lat, g.lng
                                        from estacao g
                                        where g.id = e.id
                                    ) as geo) as geo,
                                    e.idmodal						
                                from trajeto t
                                join estacao e on t.idestacao = e.id
                                where t.idrota = r.id
                                order by t.ordem
                            ) as traj) as trajeto
                        from rota r
                        where r.idlinha = l.id
                    ) as rota) as rotas,
                    (select row_to_json(m) from (
                        select *
                        from modal m
                        where m.id = l.idmodal
                    ) as m) as modal
                from linha l
            ) as line
            `);
            client.release();

            // return await this.buildLinhasList(result.rows);
            return await result.rows[0].json_agg;
        } catch (err) {
            return {erro: err};
        }
    },

    async getLinha(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select row_to_json(line) from (
                select
                    l.id, l.nome, l.idmodal,
                    (select json_agg(rota) from (
                        select r.id, r.nome,
                            (select json_agg(traj) from (
                                select e.id, e.nome,
                                    (select row_to_json(geo) from (
                                        select g.lat, g.lng
                                        from estacao g
                                        where g.id = e.id
                                    ) as geo) as geo,
                                    e.idmodal						
                                from trajeto t
                                join estacao e on t.idestacao = e.id
                                where t.idrota = r.id
                                order by t.ordem
                            ) as traj) as trajeto
                        from rota r
                        where r.idlinha = l.id
                    ) as rota) as rotas,
                    (select row_to_json(m) from (
                        select *
                        from modal m
                        where m.id = l.idmodal
                    ) as m) as modal
                from linha l
                where l.id = $1
                ) as line                
            `,[id]);
            client.release();

            // let ans = await this.buildLinhasList(result.rows)
            // return ans[0];

            return result.rows[0].row_to_json;
        } catch (err) {
            return {erro: err};
        }
    },

    // async getRotas() {
    //     const pool = new Pool(cred.DATABASE_CONN_CONFIG);
    //     try {
    //         const client = await pool.connect();
    //         const result = await client.query('SELECT * FROM rota');
    //         client.release();
    //         return result.rows;
    //     } catch (err) {
    //         return {erro: err};
    //     }
    // },

    // async getTrajetos() {
    //     const pool = new Pool(cred.DATABASE_CONN_CONFIG);
    //     try {
    //         const client = await pool.connect();
    //         const result = await client.query('SELECT * FROM trajeto');
    //         client.release();
    //         return result.rows;
    //     } catch (err) {
    //         return {erro: err};
    //     }
    // },

    async getLinhasPorEstacao(id) {
        const pool = new Pool(cred.DATABASE_CONN_CONFIG);
        
        try {
            const client = await pool.connect();
            const result = await client.query(`
            select json_agg(line) from (
                select
                    l.id, l.nome, l.idmodal,
                    (select json_agg(rota) from (
                        select r.id, r.nome,
                            (select json_agg(traj) from (
                                select e.id, e.nome,
                                    (select row_to_json(geo) from (
                                        select g.lat, g.lng
                                        from estacao g
                                        where g.id = e.id
                                    ) as geo) as geo,
                                    e.idmodal						
                                from trajeto t
                                join estacao e on t.idestacao = e.id
                                where t.idrota = r.id
                                order by t.ordem
                            ) as traj) as trajeto
                        from rota r
                        where r.idlinha = l.id
                    ) as rota) as rotas,
                    (select row_to_json(m) from (
                        select *
                        from modal m
                        where m.id = l.idmodal
                    ) as m) as modal
                from linha l
                where $1 in (
                    select idestacao from trajeto t
                    join rota r on r.id = t.idrota
                    where r.idlinha = l.id
                )
            ) as line
            `,[id]);
            client.release();

            // return await this.buildLinhasList(result.rows);
            return await result.rows[0].json_agg;
        } catch (err) {
            return {erro: err};
        }
    },

    // async buildLinhasList(linhas) {
    //     try {
    //         let linhasDB = linhas;
    //         let rotasDB = await this.getRotas();
    //         let trajetsoDB = await this.getTrajetos();
    //         let estacoesDB = await estacaoService.getEstacoes();
    //         let modaisDB = await modalService.getModais();

    //         let ans = [];
    //         linhasDB.forEach(linha => {
    //             let rotas = [];
    //             rotasDB.forEach(rota => {
    //                 if (rota.idlinha == linha.id) {
    //                     let paradas = [];
    //                     trajetsoDB.forEach(trajeto => {
    //                         if (trajeto.idrota == rota.id) {
    //                             estacoesDB.forEach((estacao) => {
    //                                 if (estacao.id == trajeto.idestacao) {
    //                                     paradas.push(estacao);
    //                                 }
    //                             })
    //                         } 
    //                     })
                        
    //                     rotas.push({
    //                         id: rota.id,
    //                         nome: rota.nome,
    //                         trajeto: paradas
    //                     });
                        
    //                 }
    //             })

    //             modaisDB.forEach((modal) => {
    //                 if (modal.id == linha.idmodal) {
    //                     ans.push({
    //                         id: linha.id,
    //                         nome: linha.nome,
    //                         rotas: rotas,
    //                         modal:{
    //                             id: modal.id,
    //                             nome: modal.nome
    //                         },
    //                         idModal: linha.idmodal
    //                     })
    //                 }
    //             })
    
                                
    //         });
            
    //         return ans;
    //     } catch (err) {
    //         return {erro: err}
    //     }
        
    // }
}