import express, {response} from "express";
import hbs from "hbs";
import path from "path";
import bodyParser from "express";
import {deleteProject, editProject, newProject, saveProject} from "./controllers/projectController.js";
import {GetAct, editActivity, newActivity, deleteActivity, saveActivity} from "./controllers/activityController.js";

const __dirname = process.cwd()

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, '/views/partials'));
const urlParser = bodyParser.urlencoded({extended: false});


app.get("/", function(request, response){
    let activities = GetAct();
    response.render("homePage.hbs", {
        Empty: activities.length == 0,
        activities: activities
    });
});
app.post("/editActivity", urlParser, editActivity);
app.post("/deleteActivity", urlParser, deleteActivity);
app.post("/newActivity", urlParser, newActivity);
app.post("/saveActivity", urlParser, saveActivity);

app.get("/projects", (req, res) => {
    res.render("projectsPage.hbs");
})
app.post("/newProject", urlParser, newProject);
app.post("/deleteProject", urlParser, deleteProject);
app.post("/saveProject", urlParser, saveProject);
app.post("/editProject", urlParser, editProject);

app.get("/editActivity", (req, res) => {
    res.render("editActivity.hbs", {
        title: "SUIIII",
        activity: req.query.id
    })
})


app.listen(3000);