import Api from "../utils/classApi.js";
const api = new Api();

export async function dataKartax() {
    const linksGrp = await api.getLinksGrpAll();
    const links = await api.getLinksAll();

    const arrLinks = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return {arrLinks};
};

