import ApiPostgreSQL from "./ApiPostgreSQL.js";

const apiPostgreSQL = new ApiPostgreSQL();
const id_mesa_demo = 1;

// funciones que van responden a las rutas --------------------------------
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
export async function iniciar_sesion2(obj) {
    const negocio = await data_negocio(id_mesa_demo);
    const resultado = { negocio, estado: false, msge: "" };

    if (!obj.txtUser || !obj.txtPass) {
        return resultado.msge = "Debe Ingresar Todos los Datos Requeridos";
    };

    const token = await apiPostgreSQL.iniciarSesion(obj.txtUser, obj.txtPass);
    console.log(token)
    if (token.length == 0) {
        return resultado.msge = "El Usuario no Existe" ;
    };
};

export async function iniciar_sesion(obj) {  

console.log(await iniciar_sesion2(obj))

    if (!obj.txtUser || !obj.txtPass) {
        return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
    };
    
    const res = await apiPostgreSQL.iniciarSesion(obj.txtUser, obj.txtPass);

    if (res.length == 0) {
        return { isActive: 0, msge: "El Usuario no Existe" };
    };

    if (res[0].estado) {
        return { isActive: 1, token: res[0].token };
    } else {
        return { isActive: 0, msge: "Usuario o Contraseña Incorrecta" };
    };
};

// funciones que extraen informacion desde la API -------------------------
// ------------------------------------------------------------------------
export async function data_negocio(id) {
    const respuesta = await apiPostgreSQL.getNegocio_ByIdMesa(id);
    return respuesta;
};

export async function data_footer() {
    const linksGrp = await apiPostgreSQL.getLinksCateg_All();
    const links = await apiPostgreSQL.getLinks_All();

    const footer = linksGrp.map(lg => {
        lg.links = links.filter(l => l.idLinkGrupo == lg.id);
        return lg;
    });

    return footer;
};

export async function data_tipo_alim(id) {
    const respuesta = await apiPostgreSQL.getTipoAlim_ByIdNegocio(id);
    return respuesta;
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
export async function pgIniciarSesion(obj) {  
    if (!obj.txtUser || !obj.txtPass) {
        return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
    };
    
    const res = await apiPostgreSQL.iniciarSesion(obj.txtUser, obj.txtPass);
    console.log(res[0].cant)

    if (res.length == 0) {
        return { isActive: 0, msge: "El Usuario no Existe" };
    };

    if (parseInt(res[0].cant) > 0) {
        return { isActive: 1, msge: "" };
    } else {
        return { isActive: 0, msge: "Usuario o Contraseña Incorrecta" };
    };
};

// export async function nuevoUsuario(obj) {
//     const pgSql = new PGSQL();

//     if (!obj.txtNombres || !obj.txtApellidos || !obj.txtEmail || !obj.txtUser || !obj.txtPass) {
//         return { isActive: 0, msge: "Debe Ingresar Todos los Datos Requeridos" };
//     };

//     return await pgSql.setUsuarioXNegocio(1, obj.txtNombres, obj.txtApellidos, obj.txtEmail, obj.txtUser, obj.txtPass);
// };
