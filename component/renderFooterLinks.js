export default function renderFooterLinks(linksGrp, links) {
    const footer = document.createElement("section");
    footer.classList.add("footer");
   
    linksGrp.forEach(grp => {
        const div = document.createElement("div");

        const p = document.createElement("p");
        p.innerText = grp.nombre
        div.appendChild(p);

        const linksPorGrp = links.filter(e => e.idLinkGrupo == grp.id)

        linksPorGrp.map(d => {
            const a = document.createElement("a");
            a.target = "_blank";
            a.href = d.link;
            a.innerText = d.nombre;

            div.appendChild(a);
        });

        footer.appendChild(div);
    });  

    return footer;
};