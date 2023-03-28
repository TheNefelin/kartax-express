import mysql from "mysql2/promise";

export default class Sql {
    constructor() {
    };
    getIniciarSesion(usuario, clave) {
        return get("CALL sp_usuario_getAll(?,?)", [usuario, clave])
    };
};

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!nfra48x',
    database: 'kartax'
});

async function get(sql, values) {
    try {
        const [data] = await connection.execute(sql, values);
        return data[0];
    } catch (err) {
        console.log(err);
        return [];
    }
}