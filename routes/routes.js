import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

const mySession = { isActive: false, token: "" }

// publico ------------------------------------------------------
// --------------------------------------------------------------
// renderiza la demo de Kartax
myRoutes.get("/kartax", async (req, res) => {
    console.log(req.headers.host);
    res.redirect("/kartax/1");
});

// renderiza la app segun mesa de cliente
myRoutes.get("/kartax/:id", async (req, res) => {
    try {
        const kartax = await fn.kartax(req.params.id);

        if (kartax.estado) {
            const {negocio, tipoAlim, footer} = kartax
            res.render("kartax", { negocio: negocio, tipoAlim: tipoAlim, footer: footer });
        } else {
            res.redirect("/");
        };
    } catch (err) {
        console.log(err);
        res.redirect("/error");
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
        const negocio = await fn.principal();
        res.render("iniciarSesion", { negocio: negocio });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    };
});

// envia los datos de iniciar sesion a la API y recibe un token
myRoutes.post("/iniciarSesion", async (req, res) => {
    const inputs = req.body;

    try {
        if (inputs.btn1 == "iniciar") {
            const negocio = await fn.data_negocio(1);
            const resIS = await fn.iniciar_sesion(inputs);

            if (resIS.isActive) {
                mySession.isActive = true;
                mySession.token = resIS.token;

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
    if (mySession.isActive) {
        res.render("admin");
    } else {
        res.redirect("/iniciarSesion");
    }
});

myRoutes.post("/admin", (req, res) => {
    res.render("admin");
});

// otros --------------------------------------------------------
// --------------------------------------------------------------
myRoutes.get("/testing", async (req, res) => {
    //  try {
    //     let resultado = await fetch("http://localhost:3001/testing", {
    //         method: "GET",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({usuario: "Prueba", clave: "francisco"})
    //     });
        
    //     resultado = await resultado.json();
    //     consoleo.log(resultado);
    // } catch(e) {
    //     console.log(`Error: ${e}`)
    // };
    
    res.render("testing");
});

myRoutes.get("/error", (req, res) => {
    res.render("error");
});

myRoutes.get("*", (req, res) => {
    res.redirect("/error");
});

