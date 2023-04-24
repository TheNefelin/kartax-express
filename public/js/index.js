//const API_LINK = "https://kartax-api-production.up.railway.app";
const API_LINK = "http://localhost:3001"

// obtiene datos del la API
async function getFetch(semiUrl) {
    const url = `${API_LINK}/${semiUrl}`
    console.log(url);

    try {
        const res = await fetch(url);
        return res.json();
    } catch (err) {
        console.log(`Error: en la conexion a la API (index linea 9), Detalle: ${err}`);
        return [];
    };
};

// inserta datos en la API
async function setFetch(semiUrl, obj) {
    const url = `${API_LINK}/${semiUrl}`
    console.log(url);
    console.log(obj);

    try { 
        const res = await fetch(`${API_LINK}/${semiUrl}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        }); 

        return res.json();
    } catch (err) {
        console.log(`Error: en la conexion a la API (index linea 19), Detalle: ${err}`);
        return [];
    };
};

// actualiza datos en la API
async function updateFetch(semiUrl, obj) {
    const url = `${API_LINK}/${semiUrl}`
    console.log(url);
    console.log(obj);

    try {
        const res = await fetch(`${API_LINK}/${semiUrl}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        }); 

        return res.json();
    } catch (err) {
        console.log(`Error: en la conexion a la API (index linea 42), Detalle: ${err}`);
        return [];
    };
};
