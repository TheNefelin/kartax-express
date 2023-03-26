import Api from "../utils/classApi.js";
const api = new Api();

export async function dataKartax(id) {
    const katrax = await api.getNegocioById(id);
    const tipoAlim = await api.getTipoAlimByIdNegocio(id);
    // const itemCateg = await api.getItemCategByIdNegocio(id);
    const linksGrp = await api.getLinksGrpAll();
    const links = await api.getLinksAll();
    
    const arrLinks = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return {katrax, tipoAlim, arrLinks};
};

export async function iniciarSesion(txtUser, txtPass) {
    if (txtUser == "FRANCISCO" && txtPass == 123456) {
        return {isValid: true}
    } else {
        return {isValid: false}
    }
}
