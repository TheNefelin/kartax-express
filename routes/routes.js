import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", (req, res) => {
    res.redirect("/kartax");
});

myRoutes.get("/iniciarSesion", async (req, res) => {
    try {
        const negocio = await fn.dataNav();
        res.render("iniciarSesion", {negocio: negocio});
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.post("/iniciarSesion", async (req, res) => {
    const inputs = req.body;

    try {
        if (inputs.btn1 == "iniciar") {
            const negocio = await fn.dataNav();
            const resIS = await fn.iniciarSesion(inputs);

            if (resIS.isActive) {
                req.session.logeado = true;
                req.session.usuario = inputs.txtUser;
                res.redirect("/admin");
            } else {
                res.render("iniciarSesion", {negocio: negocio, resIS: resIS})
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
        const negocio = await fn.dataNav()
        res.render("registrarse", {negocio: negocio});
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.post("/registrarse", async (req, res) => {
    const inputs = req.body;

    try {
        if (inputs.btn1 == "registrar") {
            const negocio = await fn.dataNav()
            const resU = await fn.registrarUsuario(inputs)
            console.log(resU)
            res.render("registrarse", {negocio: negocio, resU: resU})
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
        const data = await fn.dataKartax(1);
        res.render("kartax", data);
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

myRoutes.get("/kartax/:id", async (req, res) => {
    const id = isNaN() ? 1 : req.params.id;

    try {
        const data = await fn.dataKartax(id);
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

myRoutes.get("*", (req, res) => {
    res.redirect("/error");
});