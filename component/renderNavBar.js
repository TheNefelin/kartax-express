export default function renderNavBar() {
    const logo = {
        src: "./img/logo.png",
        nombre: "Kartax"
    }
    
    const arrLinks = [
        {
            id: 1,
            href: "#", 
            target: "_blank",
            nombre: "Link 1"
        }
        ,{
            id: 2,
            href: "#", 
            target: "_blank",
            nombre: "Link 2"
        }
        ,{
            id: 3,
            href: "#", 
            target: "_blank",
            nombre: "Link 3"
        }
    ]

    const navBar = document.createElement("section");
    navBar.classList.add("navBar-contenedor");
    // logo -----------------------------
    const a = document.createElement("a");
    a.classList.add("navBar-logo");
    a.href = "#";

    const img = document.createElement("img");
    img.src = logo.src;
    a.appendChild(img);

    const h1 = document.createElement("h1");
    h1.innerText = logo.nombre;
    a.appendChild(h1);

    navBar.appendChild(a);
    // burger ---------------------------
    const burger = document.createElement("div");
    burger.classList.add("navBar-btn");

    const div_a = document.createElement("div");
    div_a.classList.add("navBar-A");
    burger.appendChild(div_a);

    const div_b = document.createElement("div");
    div_b.classList.add("navBar-B");
    burger.appendChild(div_b);

    const div_c = document.createElement("div");
    div_c.classList.add("navBar-C");
    burger.appendChild(div_c);

    navBar.appendChild(burger);
    // links ----------------------------
    const links = document.createElement("div");
    links.classList.add("navBar-links");

    arrLinks.forEach(e => {
        const a = document.createElement("a");
        a.id = e.id;
        a.href = e.href;
        a.target = e.target;
        a.innerText = e.nombre;
        links.appendChild(a);
    });

    navBar.appendChild(links);

    // comportamiento -------------------
    burger.addEventListener("click", () => {
        burger.classList.toggle("navBar-btn_click");
    
        const links = document.querySelector(".navBar-links"); 
        links.classList.toggle("navBar-links_noOcultar");
    });

    return navBar;
}


