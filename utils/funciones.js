import * as fs from "fs"
import ApiPostgreSQL from "./ApiPostgreSQL.js";

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
export async function iniciar_sesion(obj) {
    const negocio = await data_negocio(id_mesa_demo);
    const resultado = { negocio, estado: false, msge: "" };

    if (!obj.txtUser || !obj.txtPass) {
        resultado.msge = "Debe Ingresar Todos los Datos Requeridos";
        return resultado;
    };

    const token = await apiPostgreSQL.iniciarSesion(obj.txtUser, obj.txtPass);

    if (token.length == 0) {
        resultado.msge = "Usuario o Contraseña Incorrecta";
        return resultado;
    } else {   
        await guardarToken({usuario: obj.txtUser, fecha: Date(), token: token[0].token});
        resultado.estado = true;  
        return resultado;
    };
};

// funciones que responden a las rutas privadas ---------------------------
// ------------------------------------------------------------------------

// acede a la seccion negocio del administrador
export async function admin() {
    const { usuario, token } = await recuperarToken();
 
    if (usuario == "" || token == "") {
        const arrAdmin = await apiPostgreSQL.getAdmin("-", "-");
        return arrAdmin[0];
    };
    
    const arrAdmin = await apiPostgreSQL.getAdmin(usuario, token);
    return arrAdmin[0];
};

// acede a la seccion negocio del administrador
export async function admin_negocio() {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminNegocios = await apiPostgreSQL.getAdminNegocios("-", "-");
        return arrAdminNegocios[0];
    };
    
    const arrAdminNegocio = await apiPostgreSQL.getAdminNegocios(usuario, token);
    console.log(arrAdminNegocio[0])
    return arrAdminNegocio[0];    
};

// modifica un negocio
export async function admin_negocio_post(body) {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminNegocios = await apiPostgreSQL.getAdminNegocios("-", "-");
        return arrAdminNegocios[0];  
    };

    const arrAdminNegocio = await apiPostgreSQL.postAdminNegocios(usuario, token, body);
    return arrAdminNegocio[0];
}

// acede a la seccion usuarios del administrador
export async function admin_usuarios() {
    const { usuario, token } = await recuperarToken();

    if (usuario == "" || token == "") {
        const arrAdminUsuarios = await apiPostgreSQL.getAdminUsuarios("-", "-");
        return arrAdminUsuarios[0];
    };

    const arrAdminUsuarios = await apiPostgreSQL.getAdminUsuarios(usuario, token);
    return arrAdminUsuarios[0];
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
// export async function registrarUsuario(obj) {
//     const sql = new Sql();

//     if (obj.txtPass1 !== obj.txtPass2) {
//         return { isActive: 0, msge: "Contraseña no Coinciden" };
//     };

//     if (!obj.txtNombres || !obj.txtApellidos || !obj.txtUser || !obj.txtPass1 || !obj.txtPass2) {
//         return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
//     };

//     const res = await sql.setUsuario(obj.txtNombres, obj.txtApellidos, obj.txtUser, obj.txtPass1);
//     return res[0];
// };

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
