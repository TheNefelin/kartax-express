import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

// publico ------------------------------------------------------
// --------------------------------------------------------------

// renderiza la demo de Kartax
myRoutes.get("/kartax", async (req, res) => {
    console.log(req.headers.host);
    res.redirect("/kartax/1");
});

// renderiza la app segun mesa de cliente
myRoutes.get("/kartax/:id", async (req, res) => {
    const {estado, negocio, tipoAlim, footer} = await fn.kartax(req.params.id);

    if (estado) {
        res.render("kartax", { negocio: negocio, tipoAlim: tipoAlim, footer: footer });
    } else {
        res.redirect("/error")
    };
});

// renderiza pagina principal
myRoutes.get("/", async (req, res) => {
    try {
        const { negocio, footer } = await fn.principal();
        res.render("index", { negocio: negocio, footer: footer });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

//renderiza el inicio de sesion
myRoutes.get("/iniciarSesion", async (req, res) => {
    try {
        const { negocio } = await fn.principal();
        res.render("iniciarSesion", { negocio: negocio });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

// envia los datos de iniciar sesion a la API y recibe un token
myRoutes.post("/iniciarSesion", async (req, res) => {
    const { negocio, estado, msge } = await fn.iniciar_sesion(req.body);

    if (estado) {
        res.redirect("/admin");
    } else {
        res.render("iniciarSesion", { negocio: negocio, msge: msge })
    };
});

// en construccion
// myRoutes.get("/registrarse", async (req, res) => {
//     try {
//         const negocio = await fn.data_negocio(1);
//         res.render("registrarse", { negocio: negocio });
//     } catch (err) {
//         console.log(err);
//         res.redirect("/error");
//     };
// });

// myRoutes.post("/registrarse", async (req, res) => {
//     const inputs = req.body;

//     try {
//         if (inputs.btn1 == "registrar") {
//             const negocio = await fn.data_negocio(1);
//             const resU = await fn.registrarUsuario(inputs);
//             res.render("registrarse", { negocio: negocio, resU: resU });
//         } else {
//             res.redirect("/kartax");
//         };
//     } catch (err) {
//         console.log(err);
//         res.redirect("/error");
//     };
// });

// privado ------------------------------------------------------
// --------------------------------------------------------------
myRoutes.get("/admin", async (req, res) => {
    const { token, usuario } = await fn.admin();

    if (token.estado) {
        res.render("admin", { menu: "admin", usuario: usuario });
    } else {
        const { negocio } = await fn.principal();
        res.render("iniciarSesion", { negocio: negocio, msge: token.msge });
    };
});

myRoutes.get("/admin/negocios", async (req, res) => {
    const { token, usuario, negocios } = await fn.admin_negocio();

    if (token.estado) {
        res.render("admin", { menu: "negocios", usuario: usuario, negocios: negocios });
    } else {
        const { negocio } = await fn.principal();
        res.render("iniciarSesion", { negocio: negocio, msge: token.msge });
    };
});

myRoutes.get("/admin/usuarios", async (req, res) => {
    const { token, usuario, usuarios } = await fn.admin_usuarios();

    if (token.estado) {
        res.render("admin", { menu: "usuarios", usuario: usuario });
    } else {
        const { negocio } = await fn.principal();
        res.render("iniciarSesion", { negocio: negocio, msge: token.msge });
    };    
});

myRoutes.get("/admin/configuracion", async (req, res) => {
    const { token, usuario } = await fn.admin();

    res.render("admin", { menu: "configuracion", usuario: usuario });
});

myRoutes.get("/admin/salir", async (req, res) => {
    await fn.admin_salir();
    res.redirect("/iniciarSesion")
});

// otros --------------------------------------------------------
// --------------------------------------------------------------
myRoutes.get("/testing", (req, res) => {
    res.render("testing");
});

myRoutes.get("/error", (req, res) => {
    res.render("error");
});

myRoutes.get("*", (req, res) => {
    res.redirect("/error");
});
