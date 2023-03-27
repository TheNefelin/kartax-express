import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", (req, res) => {
    res.render("iniciarSesion");
});

myRoutes.post("/", (req, res) => {
    const dt = req.body;

    console.log(req.ses)
    if (dt.btn1 == 1) {
        fn.iniciarSesion(dt.txtUser, dt.txtPass).then(data => {
            if (data.isValid) {
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
        fn.dataKartax(1).then(data => {
            res.render("kartax", data);
        }).catch((err) => {
            console.log(err);
            res.render("error");
        });
    } else {
        res.render("iniciarSesion");
    };
});

// myRoutes.get("/kartax", (req, res) => {
//     fn.dataKartax(1).then(data => {
//         res.render("kartax", data);
//     }).catch((err) => {
//         console.log(err);
//         res.render("error");
//     });
// });

// myRoutes.get("/kartax/:id", (req, res) => {
//     const id = isNaN() ? 1 : req.params.id;
//     fn.dataKartax(id).then(data => {
//         res.render("kartax", data);
//     }).catch((err) => {
//         console.log(err);
//         res.render("error");
//     });
// });
