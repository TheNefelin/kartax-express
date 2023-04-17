import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

const mySession = { isActive: false, usuario: "", rol: 1, idNegocio: 1 }

// publico ------------------------------------------------------
// --------------------------------------------------------------
myRoutes.get("/kartax", async (req, res) => {
    try {
        const negocio = await fn.data_negocio(1);
        const tipoAlim = await fn.data_tipo_alim(1)
        const footer = await fn.data_footer();
        res.render("kartax", { negocio: negocio, tipoAlim: tipoAlim, footer: footer });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/kartax/:id", async (req, res) => {
    const id = isNaN(req.params.id) ? 1 : req.params.id;

    try {
        const negocio = await fn.data_negocio(id);
        const tipoAlim = await fn.data_tipo_alim(id)
        const footer = await fn.data_footer();
        res.render("kartax", { negocio: negocio, tipoAlim: tipoAlim, footer: footer });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/", async (req, res) => {
    try {
        const negocio = await fn.data_negocio(1);
        const footer = await fn.data_footer();
        res.render("index", { negocio: negocio, footer: footer });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/iniciarSesion", async (req, res) => {
    try {
        const negocio = await fn.data_negocio(1);
        res.render("iniciarSesion", { negocio: negocio });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.post("/iniciarSesion", async (req, res) => {
    const inputs = req.body;

    try {
        if (inputs.btn1 == "iniciar") {
            const negocio = await fn.data_negocio(1);
            const resIS = await fn.pgIniciarSesion(inputs);

            if (resIS.isActive) {
                mySession.isActive = true;
                mySession.usuario = inputs.txtUser;

                res.redirect("/admin");
            } else {
                res.render("iniciarSesion", { negocio: negocio, resIS: resIS })
            };
        } else {
            res.redirect("/kartax");
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/registrarse", async (req, res) => {
    try {
        const negocio = await fn.data_negocio(1);
        res.render("registrarse", { negocio: negocio });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.post("/registrarse", async (req, res) => {
    const inputs = req.body;

    try {
        if (inputs.btn1 == "registrar") {
            const negocio = await fn.data_negocio(1);
            const resU = await fn.registrarUsuario(inputs);
            res.render("registrarse", { negocio: negocio, resU: resU });
        } else {
            res.redirect("/kartax");
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

// privado ------------------------------------------------------
// --------------------------------------------------------------
myRoutes.get("/admin", async (req, res) => {
    if (mySession.isActive) {
        res.render("admin");
    } else {
        const nav = await fn.dataNav();
        res.render("registrarse", {nav: nav});
    }
});

myRoutes.post("/admin", (req, res) => {
    res.render("admin");
});

// otros --------------------------------------------------------
// --------------------------------------------------------------
myRoutes.get("/error", (req, res) => {
    res.render("error");
});

myRoutes.get("*", (req, res) => {
    res.redirect("/error");
});

myRoutes.get("/testing", async (req, res) => {
    const usuarios = await fn.testing();
    res.render("testing", {usuarios: usuarios});
});

myRoutes.post("/testing", async (req, res) => {
    const inputs = req.body;
    console.log(inputs);
    res.redirect("/testing");
});