import mysql from "mysql2/promise";
import Api from "../utils/classApi.js";
const api = new Api();

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!nfra48x',
    database: 'kartax'
});

export async function dataKartax(id) {
    const katrax = await api.getNegocioById(id);
    const tipoAlim = await api.getTipoAlimByIdNegocio(id);
    // const itemCateg = await api.getItemCategByIdNegocio(id);
    const linksGrp = await api.getLinksGrpAll();
    const links = await api.getLinksAll();
    
    const arrLinks = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return {katrax, tipoAlim, arrLinks};
};

export async function iniciarSesion(txtUser, txtPass) {
    const sql = "CALL sp_usuario_getAll"
    const [rows, fields] = await connection.execute(query);
    console.log(rows);
    
    // query = "CALL sp_usuario_getAll"
    // const [rows, fields] = await connection.execute(query);
    // console.log(rows);

    // query = "CALL sp_usuario_getAll"
    // const [rows, fields] = await connection.execute(query);
    // console.log(rows);

    // const data = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
    // const [rows, fields] = await connection.execute('SELECT * FROM usuario');
    // try {
    //     const query = 'INSERT INTO usuario (nombre, apellido, usuario, clave) VALUES ("FRANCISCO", "NEFELIN", "NEFELIN", 123456789);'
    //     const [rows, fields] = await connection.execute(query);
    //     console.log(rows);
    // } catch (err) {
    //     console.log(err);
    //     console.log(rows);
    // }


    // connection.connect();

    // data = connection.query('SELECT * FROM usuario', async function(err, rows, fields) {
    // if (err) throw err;
    //     console.log(rows);
    //     return rows;
    // });

    // connection.end();

    if (txtUser == "FRANCISCO" && txtPass == 123456) {
        return {isValid: true}
    } else {
        return {isValid: false}
    }      
}
