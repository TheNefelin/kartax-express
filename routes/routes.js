import { Router } from "express";
const myRoutes = Router();
export default myRoutes;

myRoutes.get("/", (req, res) => {
    res.render("kartax");
});