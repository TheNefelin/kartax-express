import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", (req, res) => {
    res.render("iniciarSesion");
});

myRoutes.post("/", (req, res) => {
    const dt = req.body;

    if (dt.btn1 == 1) {
        fn.iniciarSesion(dt.txtUser, dt.txtPass).then(data => {
            if (data.isActive) {
                res.render("admin");
            } else {
                res.render("iniciarSesion");
            }
        }).catch((err) => {
            console.log(err);
            res.render("error");
        });
    } else if (dt.btn1 == 2) {
        res.render("registrarse");
    } else if (dt.btn1 == 3) {
        res.render("iniciarSesion");
    } else if (dt.btn1 == 4) {
        res.redirect("/kartax")
    } else {
        res.render("iniciarSesion");
    };
});

myRoutes.get("/iniciarSesion", (req, res) => {
    res.render("iniciarSesion");
});

myRoutes.post("/iniciarSesion", (req, res) => {
    const inputs = req.body;

    if (inputs.btn1 == 1) {
        fn.iniciarSesion(inputs.txtUser, inputs.txtPass).then(data => {
            if (data.isActive) {
                res.render("admin");
            } else {
                res.redirect("/registrarse");
            }
        }).catch((err) => {
            console.log(err);
            res.render("error");
        });
    };
});

myRoutes.get("/registrarse", (req, res) => {
    res.render("registrarse");
});

myRoutes.get("/kartax", (req, res) => {
    fn.dataKartax(1).then(data => {
        res.render("kartax", data);
    }).catch((err) => {
        console.log(err);
        res.render("error");
    });
});

myRoutes.get("/kartax/:id", (req, res) => {
    const id = isNaN() ? 1 : req.params.id;
    fn.dataKartax(id).then(data => {
        res.render("kartax", data);
    }).catch((err) => {
        console.log(err);
        res.render("error");
    });
});

myRoutes.get("/error", (req, res) => {
    res.render("error");
});

myRoutes.get("*", (req, res) => {
    res.redirect("/error")
});