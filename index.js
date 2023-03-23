import express from "express";
import hbs from "hbs"
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import routes from "./routes/routes.js"

const app = express();

app.listen(3000);
app.set("view engine", "hbs");
hbs.registerPartials(join(dirname(fileURLToPath(import.meta.url)), "/views/partials"));
app.use(express.static("public"));
app.use(routes);


