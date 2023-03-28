import Sql from "../utils/classMySql.js";
import Api from "../utils/classApi.js";

export async function dataKartax(id) {
    const api = new Api();

    const katrax = await api.getNegocioById(id);
    const tipoAlim = await api.getTipoAlimByIdNegocio(id);
    const linksGrp = await api.getLinksGrpAll();
    const links = await api.getLinksAll();
    
    const arrLinks = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return {katrax, tipoAlim, arrLinks};
};

export async function dataNav() {
    const api = new Api();
    const katrax = await api.getNegocioById(1);

    return {katrax};
};

export async function iniciarSesion(txtUser, txtPass) {
    const sql = new Sql();

    const data = await sql.getIniciarSesion(txtUser, txtPass)
    console.log(data)
    if (data[0].isActive) {
        return {isActive: true}
    } else {
        return {isActive: false, msge: "Usuario o Contraseña Incorrecta"}
    };
};

export async function registrarUsuario(obj) {
    console.log(obj);

};
