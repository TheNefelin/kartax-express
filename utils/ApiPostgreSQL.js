import dotenv from 'dotenv'
dotenv.config();

export default class ApiPostgreSQL {
    #url;
    constructor() {
        //this.#url = "http://localhost:3001";
        //this.#url = "https://kartax-api-production.up.railway.app";
        this.#url = process.env.API_LINK;
    };
    getUrl() {
        return this.#url
    }
    async iniciarSesion(usuario, clave) {
        return await post(`${this.#url}/iniciar-sesion`, {usuario, clave});
    };
    async validarToken(token) {
        return await get(`${this.#url}/token/${token}`);
    }
    async getNegocio_ByIdMesa(id) {
        return await get(`${this.#url}/negocio/idMesa/${id}`);
    };
    async getTipoAlim_ByIdNegocio(id) {
        return await get(`${this.#url}/tipo-alimento/${id}`);
    };
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
        console.log(`Error: en la conexion a la API (ApiPostgreSQL) Detalle: ${err}`)
        return [];
    };
};

async function post(url, obj) {
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

