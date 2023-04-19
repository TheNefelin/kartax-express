export default class Api {
    #url;
    constructor() {
        this.#url = "https://bsite.net/metalflap";
    };
    getNegocioById(id){
        return getById(id, `${this.#url}/demo-negocio`);
    };
    getTipoAlimByIdNegocio(id){
        return getById(id, `${this.#url}/demo-tipo-alimento/IdNegocio`);
    };
    getItemCategByIdNegocio(id){
        return getById(id, `${this.#url}/demo-item-categ/IdNegocio`);
    };
    getItemByIdCateg(id){
        return getById(id, `${this.#url}/demo-item-categ/IdCateg`);
    };
    getItemByIdNegocio(id){
        return getById(id, `${this.#url}/demo-item/IdNegocio`);
    };
    getLinksGrpAll(){
        return get(`${this.#url}/links-group`);
    };
    getLinksAll(){
        return get(`${this.#url}/links`);
    };
};

async function get(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log(`Error: ${e}`)
        return [];
    };
};

async function getById(id, url) {
    try {
        const res = await fetch(`${url}/${id}`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log(`Error: ${e}`)
        return [];
    };
};
