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

    await test()
    return {katrax, tipoAlim, arrLinks};
};

async function test() {
 
}
