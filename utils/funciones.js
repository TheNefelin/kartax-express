import bcrypt from "bcrypt";
import Sql from "../utils/classMySql.js";
import Api from "../utils/classApi.js";

export async function kartax(id) {
    const api = new Api();

    const negocio = await api.getNegocioById(id);
    const tipoAlim = await api.getTipoAlimByIdNegocio(id);
    const nav = await dataNav();
    const footer = await dataFooter();

    return {negocio, tipoAlim, nav, footer};
};

export async function dataNav() {
    const api = new Api();
    const negocio = await api.getNegocioById(1);
    return negocio;
};

export async function dataFooter() {
    const api = new Api();

    const linksGrp = await api.getLinksGrpAll();
    const links = await api.getLinksAll();
    
    const footer = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return footer;
}

export async function iniciarSesion(obj) {
    const sql = new Sql();

    if (!obj.txtUser || !obj.txtPass) {
        return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
    };

    const res = await sql.getIniciarSesion(obj.txtUser, obj.txtPass)
    return res[0];
};

export async function registrarUsuario(obj) {
    const sql = new Sql();

    if (obj.txtPass1 !== obj.txtPass2) {
        return { isActive: 0, msge: "Contraseña no Coinciden" };
    };

    if (!obj.txtNombres || !obj.txtApellidos || !obj.txtUser || !obj.txtPass1 || !obj.txtPass2) {
        return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
    };

    const res = await sql.setUsuario(obj.txtNombres, obj.txtApellidos, obj.txtUser, obj.txtPass1);
    return res[0];
};
