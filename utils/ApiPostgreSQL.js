export default class ApiPostgreSQL {
    #url;
    constructor() {
        this.#url = "http://localhost:3001";
    };
    async iniciarSesion(usuario, clave) {
        return await get(`${this.#url}/iniciar-sesion/${usuario}&${clave}`);
    };
    async getNegocioBy_Id(id) {
        return await get(`${this.#url}/negocio/${id}`);
    };
    async getTipoAlimBy_IdNegocio(id) {
        return await get(`${this.#url}/tipo-alimento/${id}`);
    };
    async getItemCategBy_IdAlim(id) {
        return await get(`${this.#url}/item-categ/${id}`);
    };
    async getItemBy_IdItemCateg(id) {
        return await get(`${this.#url}/item/${id}`);
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
    } catch(e) {
        console.log(`Error: ${e}`)
        return [];
    };
};
