import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", (req, res) => {
    fn.dataKartax(1).then(data => {
        res.render("kartax", data);
    }).catch(() => {
        res.render("error");
    });
});

myRoutes.get("/:id", (req, res) => {
    const id = isNaN() ? 1 : req.params.id;
    fn.dataKartax(id).then(data => {
        res.render("kartax", data);
    }).catch(() => {
        res.render("error");
    });
});