import pkg from 'pg';
const { Pool, Client } = pkg;

export default class PGSQL {
    constructor() { }
    async getUsuario() {
        const sqlQuery = {
            query: "SELECT * FROM Usuario WHERE id > 1",
            values: []
        };

        return await myQuery(sqlQuery);
    };
};

const conexion = {
    user: "postgres",
    host: "localhost",
    database: "kartax",
    password: "123456",
    port: 5432
    // max: 20, 
    // connectionTimeoutMillis: 5000,
    // idleTimeoutMillis: 3000
};

async function myQuery(props) {
    const client = new Client(conexion);

    try {
        await client.connect()
        const res = await client.query(props.query, props.values);
        return res.rows
    } catch (err) {
        console.log(err);
        return [];
    } finally {
        await client.end()
    };
};

async function transaccion(sqlQuery) {
    const pool = new Pool(conexion);

    try {
        await pool.connect()
        // const res = await pool.query(sqlQuery.text, sqlQuery.value);
        const res = await pool.query("SELECT * FROM usuario");
        console.table(res.rows);
    } catch (err) {
        console.log(err);
    } finally {
        await pool.end()
    };
};
