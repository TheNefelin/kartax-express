export default class ApiPostgreSQL {
    #url;
    constructor() {
        this.#url = "http://localhost:3001";
    };
    async iniciarSesion(usuario, clave) {
        return await get(`${this.#url}/iniciar-sesion/${usuario}&${clave}`, {method: "GET"});
    };
    async getNegocioBy_Id(id) {
        return await get(`${this.#url}/negocio/${id}`, {method: "GET"});
    };
    async getTipoAlimBy_IdNegocio(id) {
        return await get(`${this.#url}/tipo-alimento/${id}`, {method: "GET"});
    };
    async getItemCategBy_IdAlim(id) {
        return await get(`${this.#url}/item-categ/${id}`, {method: "GET"});
    };
    async getItemBy_IdItemCateg(id) {
        return await get(`${this.#url}/item/${id}`, {method: "GET"});
    };
    async getLinksCateg_All() {
        return await get("https://bsite.net/metalflap/links-group", {method: "GET"})
    };
    async getLinks_All() {
        return await get("https://bsite.net/metalflap/links", {method: "GET"})
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
