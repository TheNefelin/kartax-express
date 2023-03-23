import Api from "../utils/classApi.js";
const api = new Api();

export async function dataKartax(id) {
    const katrax = await api.getNegocioById(id);
    const linksGrp = await api.getLinksGrpAll();
    const links = await api.getLinksAll();
    
    const arrLinks = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    await test()
    return {katrax, arrLinks};
};

async function test() {
    const test = await api.getTipoAlimByIdNegocio(1);
    // console.log(test)
}
