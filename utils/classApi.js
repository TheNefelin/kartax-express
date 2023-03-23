export default class Api {
    #url;
    #urlNegocio;
    #urlTipoAlim;
    #urlItemCateg;
    #urlItem;
    #urlLinksGrp;
    #urlLinks;
    constructor() {
        this.#url = "https://bsite.net/metalflap";
        this.#urlNegocio = `${this.#url}/demo-negocio`
        this.#urlTipoAlim = `${this.#url}/demo-tipo-alimento`
        this.#urlItemCateg = `${this.#url}/demo-item-categ`
        this.#urlItem = `${this.#url}/demo-item`
        this.#urlLinksGrp = `${this.#url}/links-group`
        this.#urlLinks = `${this.#url}/links`
    };
    getNegocioById(id){
        return getById(id, this.#urlNegocio);
    };
    getLinksGrpAll(){
        return get(this.#urlLinksGrp);
    };
    getLinksAll(){
        return get(this.#urlLinks);
    };
    getTipoAlimByIdNegocio(id){
        return getById(id, `${this.#urlTipoAlim}/IdNegocio`);
    };
    getItemCategByIdTipoAlimento(id){
        return getById(id, `${this.#urlItemCateg}/IdTipoAlimento`);
    };
    getItemByIdCateg(id){
        return getById(id, `${this.#urlItem}/IdCateg`);
    };
    getItemByIdNegocio(id){
        return getById(id, `${this.#urlItem}/IdNegocio`);
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
