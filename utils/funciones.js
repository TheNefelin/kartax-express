import * as fs from "fs"
import ApiPostgreSQL from "./ApiPostgreSQL.js";
import { json } from "express";

const apiPostgreSQL = new ApiPostgreSQL();
const id_mesa_demo = 1;

// funciones que responden a las rutas publicas ---------------------------
// ------------------------------------------------------------------------

// funcion para cargar la app
export async function kartax(id_mesa) {
    id_mesa = isNaN(id_mesa) ? id_mesa_demo : id_mesa;

    const negocio = await data_negocio(id_mesa);
    
    if (negocio.length == 0) {
        return { estado: false };
    };

    const tipoAlim = await data_tipo_alim(id_mesa);
    const footer = await data_footer();

    return { estado: true,  negocio, tipoAlim, footer};
};

// funcion para cargar la pagina principal
export async function principal() { 
    const negocio = await data_negocio(id_mesa_demo);
    const footer = await data_footer();

    return { negocio, footer };
};

// funcion para iniciar sesion
export async function iniciar_sesion(txtUser, txtPass) {
    const respuesta = await apiPostgreSQL.iniciarSesion(txtUser, txtPass);

    if (respuesta[0].estado) {
        await guardarToken({usuario: txtUser, fecha: Date(), token: respuesta[0].token});
    }

    return respuesta;
};

// funciones que responden a las rutas privadas ---------------------------
// ------------------------------------------------------------------------

// acede a la seccion negocio del administrador
export async function admin() {
    const { usuario, token } = await recuperarToken();
 
    if (usuario == "" || token == "") {
        const arrAdmin = await apiPostgreSQL.getAdmin("-", "-");
        return arrAdmin;
    };
    
    const arrAdmin = await apiPostgreSQL.getAdmin(usuario, token);
    return arrAdmin;
};

// acede a la seccion negocio del administrador
export async function admin_negocio() {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminNegocios = await apiPostgreSQL.getAdminNegocios("-", "-");
        return arrAdminNegocios;
    };
    
    const arrAdminNegocio = await apiPostgreSQL.getAdminNegocios(usuario, token);
    return arrAdminNegocio;    
};

// crear un negocio
export async function admin_negocio_post(body) {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminNegocios = await apiPostgreSQL.postAdminNegocios("-", "-", {});
        return arrAdminNegocios;  
    };

    const arrAdminNegocio = await apiPostgreSQL.postAdminNegocios(usuario, token, body);
    return arrAdminNegocio;
};

// modifica un negocio
export async function admin_negocio_put(body) {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminNegocios = await apiPostgreSQL.putAdminNegocios("-", "-", {});
        return arrAdminNegocios;  
    };

    const arrAdminNegocio = await apiPostgreSQL.putAdminNegocios(usuario, token, body);
    return arrAdminNegocio;
};

// acede a la seccion usuarios del administrador
export async function admin_usuarios() {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminUsuarios = await apiPostgreSQL.getAdminUsuarios("-", "-");
        return arrAdminUsuarios;
    };

    const arrAdminUsuarios = await apiPostgreSQL.getAdminUsuarios(usuario, token);
    return arrAdminUsuarios;
};

// crea un usuario
export async function admin_usuarios_post(body) {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminNegocios = await apiPostgreSQL.postAdminUsuaruio("-", "-", {});
        return arrAdminNegocios;  
    };

    const arrAdminUsuarios = await apiPostgreSQL.postAdminUsuaruio(usuario, token, body);
    return arrAdminUsuarios;
};

// modifica un usuario
export async function admin_usuarios_put(body) {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminNegocios = await apiPostgreSQL.putAdminUsuaruio("-", "-", {});
        return arrAdminNegocios;  
    };

    const arrAdminUsuarios = await apiPostgreSQL.putAdminUsuaruio(usuario, token, body);
    return arrAdminUsuarios;
};

// sale de la app
export async function admin_salir() {
    await guardarToken({usuario: "", fecha: "",token: ""});
};

// funciones que extraen informacion desde la API -------------------------
// ------------------------------------------------------------------------

async function data_negocio(id) {
    const respuesta = await apiPostgreSQL.getNegocio_ByIdMesa(id);
    return respuesta;
};

async function data_footer() {
    const linksGrp = await apiPostgreSQL.getLinksCateg_All();
    const links = await apiPostgreSQL.getLinks_All();

    const footer = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return footer;
};

async function data_tipo_alim(id) {
    const respuesta = await apiPostgreSQL.getTipoAlim_ByIdNegocio(id);
    return respuesta;
};

// funciones --------------------------------------------------------------
// ------------------------------------------------------------------------

async function guardarToken(obj) {
    console.log(obj)
    await fs.promises.writeFile("./data/login.json", JSON.stringify(obj));
};

async function recuperarToken() {
    const jsonLogin = await fs.promises.readFile("./data/login.json");
    return await JSON.parse(jsonLogin);
};

export async function validarToken() {
    const objLogin = await recuperarToken();
    const serverToken = await apiPostgreSQL.validarToken(objLogin.token);

    if (serverToken.length > 0) {
        return serverToken[0];
    } else {
        return { estado: false, msge: "La API no pudo validar su Usuario" };
    };
};

// privado ----------------------------------------------------------------
// ------------------------------------------------------------------------

// postgre functions ------------------------------------------------------
// ------------------------------------------------------------------------
// export async function pgIniciarSesion(obj) {  
//     if (!obj.txtUser || !obj.txtPass) {
//         return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
//     };
    
//     const res = await apiPostgreSQL.iniciarSesion(obj.txtUser, obj.txtPass);
//     console.log(res[0].cant)

//     if (res.length == 0) {
//         return { isActive: 0, msge: "El Usuario no Existe" };
//     };

//     if (parseInt(res[0].cant) > 0) {
//         return { isActive: 1, msge: "" };
//     } else {
//         return { isActive: 0, msge: "Usuario o Contraseña Incorrecta" };
//     };
// };

// export async function nuevoUsuario(obj) {
//     const pgSql = new PGSQL();

//     if (!obj.txtNombres || !obj.txtApellidos || !obj.txtEmail || !obj.txtUser || !obj.txtPass) {
//         return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
//     };

//     return await pgSql.setUsuarioXNegocio(1, obj.txtNombres, obj.txtApellidos, obj.txtEmail, obj.txtUser, obj.txtPass);
// };
