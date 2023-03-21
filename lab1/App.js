import express, {response} from "express";
import hbs from "hbs";
import path from "path";
import bodyParser from "express";
import {deleteProject, editProject, newProject, saveProject} from "./controllers/projectController";

const __dirname = process.cwd()

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '/views/partials'));
const urlParser = bodyParser.urlencoded({extended: false});


app.get("/", function(request, response){
    response.render("homePage.hbs");
});



app.get("/projects", (req, res) => {
    res.render("projectsPage.hbs");
})
app.post("/newProject", urlParser, newProject);
app.post("/deleteProject", urlParser, deleteProject);
app.post("/saveProject", urlParser, saveProject);
app.post("/editProject", urlParser, editProject);
app.get("/editProject", (req, res) => {
    res.render("editProject.hbs", {
        title: "MEGA SUIII",
        project: req.query.id
    })
})

app.get("/editActivity", (req, res) => {
    res.render("editActivity.hbs", {
        title: "SUIIII",
        activity: req.query.id
    })
})


app.listen(3000);