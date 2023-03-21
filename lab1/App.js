import express, {response} from "express";
import hbs from "hbs";
import * as path from "path";

const __dirname = process.cwd()

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get("/", function(request, response){
    response.render("homePage.hbs");
});

app.get("/projects", (req, res) => {
    res.render("projectsPage.hbs");
})


app.listen(3000);