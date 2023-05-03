import { Router } from "express";
import * as fn from "../utils/funciones.js";
import ApiPostgreSQL from "../utils/ApiPostgreSQL.js";

const myRoutes = Router();
export default myRoutes;

const apiPostgreSQL = new ApiPostgreSQL();

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
        const { negocio, footer } = await fn.principal();
        res.render("iniciarSesion", { negocio: negocio });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

// envia los datos de iniciar sesion a la API y recibe un token
myRoutes.post("/iniciarSesion", async (req, res) => {
    const { txtUser, txtPass, btn1 } = req.body

    try {
        const respuesta = await fn.iniciar_sesion(txtUser, txtPass)
        if (respuesta[0].estado) {
            res.redirect("/admin");
        } else {
            const { negocio, footer } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, respuesta: respuesta[0] })
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    }
});

// renderiza para registrarse
myRoutes.get("/registrarse", async (req, res) => {
    try {
        const { negocio, footer } = await fn.principal();
        res.render("registrarse", { negocio: negocio });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

// Crea una cuenta nueva
myRoutes.post("/registrarse", async (req, res) => {
    const { txtNombres, txtApellidos, txtUser, txtEmail, txtPass1, txtPass2, btn1 } = req.body;

    try {
        const { negocio, footer } = await fn.principal();
        const respuesta = await apiPostgreSQL.registrarUsuario(txtNombres, txtApellidos, txtUser, txtEmail, txtPass1, txtPass2);
        res.render("registrarse", { negocio: negocio, respuesta: respuesta[0] });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

// privado ------------------------------------------------------
// --------------------------------------------------------------
myRoutes.get("/admin", async (req, res) => {
    try {
        const respuesta = await fn.admin();
        if (respuesta[0].estado) {
            res.render("admin", { menu: "admin" });
        } else {
            const { negocio } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, msge: respuesta[0].msge });
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/admin/negocios", async (req, res) => {
    try {
        const resultado = await fn.admin_negocio();
        if (resultado[0].estado) {
            res.render("admin", { menu: "negocios", negocios: resultado[0].negocios });
        } else {
            const { negocio } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, msge: resultado[0].msge });
        }
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.post("/admin/negocios", async (req, res) => {
    try {
        const respuesta = await fn.admin_negocio_post(req.body);
        if (respuesta[0].estado) {
            res.redirect("/admin/negocios");
        } else {
            const { negocio } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, msge: respuesta[0].msge });
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.put("/admin/negocios", async (req, res) => {
    try {
        const respuesta = await fn.admin_negocio_put(req.body);
        if (respuesta[0].estado) {
            res.redirect("/admin/negocios");
        } else {
            const { negocio } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, msge: respuesta[0].msge });
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/admin/usuarios", async (req, res) => {
    try {
        const respuesta = await fn.admin_usuarios();
        if (respuesta[0].estado) {
            res.render("admin", { menu: "usuarios", usuarios: respuesta[0].usuarios });
        } else {
            const { negocio } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, msge: respuesta[0].msge });
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };    
});

myRoutes.post("/admin/usuarios", async (req, res) => {
    try {
        const respuesta = await fn.admin_usuarios_post(req.body);
        if (respuesta[0].estado) {
            res.redirect("/admin/usuarios");
        } else {
            const { negocio } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, msge: respuesta[0].msge });
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.put("/admin/usuarios", async (req, res) => {
    try {
        const respuesta = await fn.admin_usuarios_put(req.body);
        if (respuesta[0].estado) {
            res.redirect("/admin/usuarios");
        } else {
            const { negocio } = await fn.principal();
            res.render("iniciarSesion", { negocio: negocio, msge: respuesta[0].msge });
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
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
