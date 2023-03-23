import { Router } from "express";
import * as fn from "../utils/funciones.js";

const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", (req, res) => {
    fn.dataKartax().then(data => {
        console.log(data.arrLinks[0])
        res.render("kartax", data);
    }).catch(() => {
        res.render("error");
    });
});