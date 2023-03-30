import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", async (req, res) => {
    try {
        const nav = await fn.dataNav();
        const footer = await fn.dataFooter();
        res.render("index", {nav: nav, footer: footer});
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/iniciarSesion", async (req, res) => {
    try {
        const nav = await fn.dataNav();
        res.render("iniciarSesion", {nav: nav});
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.post("/iniciarSesion", async (req, res) => {
    const inputs = req.body;

    try {
        if (inputs.btn1 == "iniciar") {
            const nav = await fn.dataNav();
            const resIS = await fn.iniciarSesion(inputs);

            if (resIS.isActive) {
                req.session.logeado = true;
                req.session.usuario = inputs.txtUser;
                res.redirect("/admin");
            } else {
                res.render("iniciarSesion", {nav: nav, resIS: resIS})
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
        const nav = await fn.dataNav()
        res.render("registrarse", {nav: nav});
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.post("/registrarse", async (req, res) => {
    const inputs = req.body;

    try {
        if (inputs.btn1 == "registrar") {
            const nav = await fn.dataNav()
            const resU = await fn.registrarUsuario(inputs)
            console.log(resU)
            res.render("registrarse", {nav: nav, resU: resU})
        } else {
            res.redirect("/kartax");
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/kartax", async (req, res) => {
    try {
        const data = await fn.kartax(1);
        res.render("kartax", data);
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/kartax/:id", async (req, res) => {
    const id = isNaN() ? 1 : req.params.id;

    try {
        const data = await fn.kartax(id);
        res.render("kartax", data);
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/admin", (req, res) => {
    res.render("admin");
});

myRoutes.post("/admin", (req, res) => {
    res.render("admin");
});

myRoutes.get("/error", (req, res) => {
    res.render("error");
});

myRoutes.get("/testing", (req, res) => {
    res.render("testing");
});

myRoutes.get("*", (req, res) => {
    res.redirect("/error");
});
