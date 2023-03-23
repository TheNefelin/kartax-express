export default function renderAcordion(itemCateg, item) {
    const contenedor = document.createElement("section");
    contenedor.classList.add("acordion-list");

    itemCateg.forEach(categ => {
        const divCateg = document.createElement("div");
        divCateg.id = categ.id;
        divCateg.innerText = categ.nombre;
        divCateg.classList.add("acordion-list-titulo");
        contenedor.appendChild(divCateg);

        item.filter(e => e.id_ItemCateg == categ.id).forEach(d => {
            const btnItem =  document.createElement("button");
            btnItem.classList.add("acordion");
            btnItem.innerText = d.nombre;
            contenedor.appendChild(btnItem);

            const divContenido = document.createElement("div");
            divContenido.classList.add("acordion-contenido");

            const img = document.createElement("img");
            img.classList.add("acordion-contenido-img");
            img.src = d.link; 
            divContenido.appendChild(img);

            const descripcion = document.createElement("p");
            descripcion.innerText = d.descripcion;
            divContenido.appendChild(descripcion);

            const precio = document.createElement("p");
            precio.innerText = `Precio: ${d.precio} .-`;
            divContenido.appendChild(precio);

            const btnAgregar = document.createElement("button");
            btnAgregar.classList.add("btn");
            btnAgregar.classList.add("animacion");

            const span = document.createElement("span");
            span.innerText = "Agregar";
            btnAgregar.appendChild(span);

            divContenido.appendChild(btnAgregar);

            contenedor.appendChild(divContenido);

            btnItem.addEventListener("click", () => {
                acordion_click(btnItem);
            })
        });

    });

    return contenedor;
};

function acordion_click(obj) {
    obj.classList.toggle("active");
    let hijo = obj.nextElementSibling;

    if (hijo.style.maxHeight) {
        hijo.style.maxHeight = null;
    } else {
        hijo.style.maxHeight = hijo.scrollHeight + "px";
    };
};
