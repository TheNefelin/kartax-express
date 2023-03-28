import bcrypt from "bcrypt";
import Sql from "../utils/classMySql.js";
import Api from "../utils/classApi.js";

const saltRounds = 10;

export async function dataKartax(id) {
    const api = new Api();

    const negocio = await api.getNegocioById(id);
    const tipoAlim = await api.getTipoAlimByIdNegocio(id);
    const linksGrp = await api.getLinksGrpAll();
    const links = await api.getLinksAll();
    
    const arrLinks = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return {negocio, tipoAlim, arrLinks};
};

export async function dataNav() {
    const api = new Api();
    const negocio = await api.getNegocioById(1);

    return negocio;
};

export async function iniciarSesion(obj) {
    const sql = new Sql();

    if (!obj.txtUser || !obj.txtPass) {
        return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
    };

    const res = await sql.getIniciarSesion(obj.txtUser, obj.txtPass)
    // console.log(bcrypt.compareSync(obj.txtPass, res[0].msge))

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

    // obj.hash = await bcrypt.hash(obj.txtPass1, saltRounds);

    const res = await sql.setUsuario(obj.txtNombres, obj.txtApellidos, obj.txtUser, obj.txtPass1);
    return res[0];
};
