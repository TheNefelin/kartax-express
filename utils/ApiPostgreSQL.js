export default class ApiPostgreSQL {
    #url;
    constructor() {
        //this.#url = "http://localhost:3001";
        this.#url = "https://kartax-api-production.up.railway.app";
    };
    getUrl() {
        return this.#url
    }
    async iniciarSesion(usuario, clave) {
        return await get(`${this.#url}/iniciar-sesion/${usuario}&${clave}`);
    };
    async getNegocio_ById(id) {
        return await get(`${this.#url}/negocio/${id}`);
    };
    async getNegocio_ByIdMesa(id) {
        return await get(`${this.#url}/negocio/idMesa/${id}`);
    };
    async getTipoAlim_ByIdNegocio(id) {
        return await get(`${this.#url}/tipo-alimento/${id}`);
    };
    async getItemCateg_ByIdAlim(id) {
        return await get(`${this.#url}/item-categ/${id}`);
    };
    async getItem_ByIdItemCateg(id) {
        return await get(`${this.#url}/item/${id}`);
    };
    async getLinksCateg_All() {
        return await get("https://bsite.net/metalflap/links-group")
    };
    async getLinks_All() {
        return await get("https://bsite.net/metalflap/links")
    };
};

async function get(url, obj) {
    try {
        const res = await fetch(url, obj);
        return await res.json();
    } catch(e) {
        console.log(`Error: ${e}`)
        return [];
    };
};
