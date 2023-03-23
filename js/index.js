import { Api } from "../class/ApiFetch.js";
import renderLoading from "../component/renderLoading.js";
import renderNavBar from "../component/renderNavBar.js"
import renderAcordion from "../component/renderAcordion.js"
import renderSlider from "../component/renderSlider.js"
import renderFooterLinks from "../component/renderFooterLinks.js";

window.onload = () => {
    inicializar();
};

function inicializar() {
    const idNegocio = 1;
    // // se renderiza el fondo en modo paralax
    // const body = document.querySelector("body");
    // body.classList.add("paralax");
    // // se renderiza el menu
    // const navbar = document.querySelector("nav");
    // navbar.appendChild(renderNavBar());

    const header = document.querySelector("header");
    // header.appendChild(renderLoading());

    // const main = document.querySelector("main");
    // main.appendChild(renderLoading());

    // const footer = document.querySelector("footer");
    // footer.appendChild(renderLoading());

    const api = new Api();

    Promise.all([
        api.getNegocioById(idNegocio).then(data => data),
        api.getTipoAlimByIdNegocio(idNegocio).then(data => data),
        api.getItemCategByIdTipoAlimento(1).then(data => data),
        // api.getItemByIdCateg(2).then(data => data),
        api.getItemByIdNegocio(idNegocio).then(data => data),
        api.getLinksGrpAll().then(data => data),
        api.getLinksAll().then(data => data),
    ]).then(arr => {
        // header.innerHTML = "";
        // header.appendChild(renderSlider(arr[1]));
        main.innerHTML = "";
        main.appendChild(renderAcordion(arr[2], arr[3]));
        footer.innerHTML = "";
        footer.appendChild(renderFooterLinks(arr[4], arr[5]));
    });
};
