const API_LINK = "http://localhost:3001";
//const API_LINK = "https://kartax-api-production.up.railway.app";

async function get_ItemsYCateg_ByIdAlim(id) {  
    return await get(`${API_LINK}/item-categ-e-items/${id}`);
};
async function get_Pedidos_ByIdMesa(id) {  
    return await get(`${API_LINK}/comanda-deta/idMesa/${id}`);
};
async function get_Item_ById(id) {  
    return await get(`${API_LINK}/item/${id}`);
};
async function get_Comanda_ByIdMesa(id) {  
    return await get(`${API_LINK}/mesa/${id}`);
};
async function post_AgregarItemAComanda(obj) {  
    return await post(`${API_LINK}/comanda-deta`, obj);
};
async function put_HacerPedido(obj) {  
    return await put(`${API_LINK}/comanda-deta`, obj);
};
async function get_Encuesta() {
    return await get(`${API_LINK}/encuesta`);
};
async function post_Encuesta(obj) {  
    return await post(`${API_LINK}/encuesta`, obj);
};

// obtiene datos del la API
async function get(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch(err) {
        console.log(`Error: en la conexion a la API (index) Detalle: ${err}`)
        return [];
    };
};

// inserta datos en la API
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
        console.log(`Error: en la conexion a la API (index), Detalle: ${err}`);
        return [];
    };
};

// actualiza datos en la API
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
        console.log(`Error: en la conexion a la API (index), Detalle: ${err}`);
        return [];
    };
};