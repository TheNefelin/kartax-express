import express from "express";
import hbs from "hbs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import routes from "./routes/routes.js";
import bodyParser from 'body-parser';
import session from "express-session";

const app = express();

hbs.registerPartials(join(dirname(fileURLToPath(import.meta.url)), "/views/partials"));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'esmerilemelo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(routes);
app.listen(3000, (req, res) => {
    console.log("SERVER UP!!!");
});

