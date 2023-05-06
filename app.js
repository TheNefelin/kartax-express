import express from "express";
import hbs from "hbs";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import routes from "./routes/routes.js";
import * as helpers from "./utils/helpers.js"

const app = express();

hbs.registerPartials(join(dirname(fileURLToPath(import.meta.url)), "/views/partials"));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(routes);
app.listen(process.env.PORT, (req, res) => {
    console.log(`Kartax App Running on ${process.env.PORT}!!!`);
    console.log(`API ${process.env.API_LINK}`);
});
