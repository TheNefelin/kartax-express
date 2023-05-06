import dotenv from 'dotenv'
dotenv.config();
const url = process.env.API_LINK;

//url = "http://localhost:3001";
//url = "https://kartax-api-production.up.railway.app";

export default class ApiPostgreSQL {
    constructor() {};
    // publico --------------------------------------------------------
    async registrarUsuario(txtNombres, txtApellidos, txtUser, txtEmail, txtPass1, txtPass2) {
        return await post(`${url}/registrar-usuario`, { txtNombres, txtApellidos, txtUser, txtEmail, txtPass1, txtPass2 });
    };
    async iniciarSesion(txtUser, txtPass) {
        return await post(`${url}/iniciar-sesion`, { txtUser, txtPass });
    };
    async validarToken(token) {
        return await get(`${url}/token/${ token }`);
    }
    async getNegocio_ByIdMesa(id) {
        return await get(`${url}/negocio/idMesa/${ id }`);
    };
    async getTipoAlim_ByIdNegocio(id) {
        return await get(`${url}/tipo-alimento/${ id }`);
    };
    // privado --------------------------------------------------------
    async getAdmin(usuario, token) {
        return await get(`${url}/admin/${ usuario }&${ token }`);
    };
    // negocios
    async getAdminNegocios(usuario, token) {
        return await get(`${url}/admin/negocios/${ usuario }&${ token }`);
    };
    async postAdminNegocios(usuario, token, obj) {
        return await post(`${url}/admin/negocios`, { usuario, token, data: obj });
    };
    async putAdminNegocios(usuario, token, obj) {
        return await put(`${url}/admin/negocios`, { usuario, token, data: obj });
    };
    // usuarios
    async getAdminUsuarios(usuario, token) {
        return await get(`${url}/admin/usuarios/${ usuario }&${ token }`);
    };
    async postAdminUsuarios(usuario, token) {
        return await post(`${url}/admin/usuarios`, { usuario, token, data: obj });
    };
    async putAdminUsuarios(usuario, token) {
        return await put(`${thisurl}/admin/usuarios`, { usuario, token, data: obj });
    };
    // ----------------------------------------------------------------
    async getLinksCateg_All() {
        return await get("https://bsite.net/metalflap/links-group")
    };
    async getLinks_All() {
        return await get("https://bsite.net/metalflap/links")
    };
};

async function get(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch(err) {
        console.log(url)
        console.log(`Error: en la conexion a la API (ApiPostgreSQL) Detalle: ${ err }`)
        return [];
    };
};

async function put(url, obj) {
    try { 
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        }); 

        return res.json();
    } catch (err) {
        console.log(`Error: en la conexion a la API (ApiPostgreSQL), Detalle: ${ err }`);
        return [];
    };
};

async function post(url, obj) {
    console.log(JSON.stringify(obj));

    try { 
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        }); 

        return res.json();
    } catch (err) {
        console.log(`Error: en la conexion a la API (ApiPostgreSQL), Detalle: ${err}`);
        return [];
    };
};
