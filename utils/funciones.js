import bcrypt from "bcrypt";
import Sql from "../utils/classMySql.js";
import Api from "../utils/classApi.js";

const saltRounds = 10;

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
    let data;

    if (txtUser && txtPass) {
        data = await sql.getIniciarSesion(txtUser, txtPass)
        data = data[0];
    } else {
        data = {isActive: false};
    };

    if (data.isActive) {
        return {isActive: true}
    } else {
        return {isActive: false, msge: "Usuario o Contraseña Incorrecta"}
    };
};

export async function registrarUsuario(obj) {
    const sql = new Sql();
    const res = { isActive: false, msge: "" };

    if (obj.txtPass1 !== obj.txtPass2) {
        res.msge = "Contraseña no Coinciden";
        return res;
    };

    if (!obj.txtNombres || !obj.txtApellidos || !obj.txtUser || !obj.txtPass1 || !obj.txtPass2) {
        res.msge = "Debe Ingresar Todos los Datos Requeridos";
        return res;
    };

    obj.hash = await bcrypt.hash(obj.txtPass1, saltRounds);

    const data = await sql.setUsuario(obj.txtNombres, obj.txtApellidos, obj.txtUser, obj.hash);
    return data;
};
