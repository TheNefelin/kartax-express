import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", (req, res) => {
    res.redirect("/kartax");
});

myRoutes.get("/iniciarSesion", (req, res) => {
    fn.dataNav().then(data => {
        res.render("iniciarSesion", data);
    }).catch((err) => {
        console.log(err);
        res.render("error");
    });
});

myRoutes.post("/iniciarSesion", (req, res) => {
    const inputs = req.body;

    if (inputs.btn1 == "iniciar") {
        fn.iniciarSesion(inputs.txtUser, inputs.txtPass).then(data => {
            if (data.isActive) {
                res.redirect("/admin");
                req.session.logeado = true;
				req.session.usuario =  "Prueba";
            } else {
                res.redirect("/registrarse");
            }
        }).catch((err) => {
            console.log(err);
            res.render("error");
        });
    } else {
        res.redirect("/kartax");
    }; 
});

myRoutes.get("/registrarse", (req, res) => {
    fn.dataNav().then(data => {
        res.render("registrarse", data);
    }).catch((err) => {
        console.log(err);
        res.render("error");
    });
});

myRoutes.post("/registrarse", (req, res) => {
    const inputs = req.body;

    if (inputs.btn1 == "registrar") {
        fn.registrarUsuario(inputs).then(data => {
            console.log(data)
            res.redirect("/iniciarSesion")
        }).catch(err => {
            console.log(err);
            res.render("error");
        });
    } else {
        res.redirect("/kartax");
    };
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
    res.redirect("/error")
});