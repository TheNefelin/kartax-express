//const API_LINK = "https://kartax-api-production.up.railway.app";
const API_LINK = "http://localhost:3001"

// obtiene datos del la API
async function getFetch(semiUrl) {
    const url = `${API_LINK}/${semiUrl}`
    console.log(url)

    const res = await fetch(url);
    return res.json();
};

// inserta datos en la API
async function setFetch(semiUrl, obj) {
    const url = `${API_LINK}/${semiUrl}`
    console.log(url)
    console.log(obj)

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
        console.log(`Error: en la conexion a la API (comanda linea 130), Detalle: ${err}`);
        return [];
    };
};
