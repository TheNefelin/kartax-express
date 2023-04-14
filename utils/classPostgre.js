import pkg from 'pg';
const { Pool, Client } = pkg;

const conexion = {
    user: "postgres",
    host: "localhost",
    database: "kartax",
    password: "!nfra48x",
    // password: "123456",
    port: 5432,
    // max: 20, 
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 3000
};

export default class PGSQL {
    constructor() { }
    async iniciarSesion(usuario, clave) {
        return await myQuery( 
            "SELECT COUNT(id) AS cant FROM usuario WHERE usuario = $1 AND clave = crypt($2, clave)", 
            [usuario, clave]
        );
    };

    async getUsuariosXNegocio(idNegocio) {
        return await myQuery( 
            `SELECT
                b.nombre AS rol,
                a.nombres,
                a.apellidos,
                a.correo,
                a.usuario,
                -- c.fecha,
                a.is_active AS activo
            FROM usuario a
                INNER JOIN rol b ON b.id = a.id_rol
                INNER JOIN usuario_negocio c ON c.id_usuario = a.id
            WHERE c.id_negocio = $1`, 
            [idNegocio]
        );
    };
    // el 3 representa el rol de usuario
    async setUsuarioXNegocio(idNegocio, nombres, apellidos, email, user, pass) {
        return await transSetUsuario(idNegocio, [nombres, apellidos, email, user, pass, true, 3])
    }
};

async function myQuery(sql, values) {
    const client = new Client(conexion);
    let resultado;

    try {
        await client.connect()
        const res = await client.query(sql, values);
        resultado = res.rows
    } catch (err) {
        console.log(err);
        resultado = [];
    } finally {
        await client.end()
        await client.release;
    };

    return resultado;
};

async function transSetUsuario(idNegocio, values) {
    const pool = new Pool(conexion);
    let resultado;

    try {
        await pool.connect()
        await pool.query("BEGIN");

        const res1 = await pool.query("INSERT INTO usuario (nombres, apellidos, correo, usuario, clave, is_active, id_rol) VALUES ($1, $2, $3, $4, crypt($5, gen_salt('bf')), $6, $7) RETURNING id", values);
        console.table(res1.rows)
        const res2 = await pool.query("INSERT INTO usuario_negocio (id_usuario, id_negocio, fecha) VALUES ($1, $2, NOW()) RETURNING *", [res1.rows[0].id, idNegocio]);
        console.table(res2.rows)

        await pool.query("COMMIT");
        resultado = res2.rows
    } catch (err) {
        await pool.query("ROLLBACK");
        console.log(err);
        resultado = [];
    } finally {
        await pool.end()
        await pool.release;
    };

    console.log(resultado)
    return resultado;
};
