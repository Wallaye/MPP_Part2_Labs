import express from "express";
import hbs from "hbs";
import path from "path";
import bodyParser from "express";

import {
    GetAct,
    editActivity,
    newActivity,
    deleteActivity,
    saveActivity,
    startActivity, finishActivity
} from "./controllers/activityController.js";
import {getTimeToDate, parseMsToDate, toDate} from "./controllers/helpers.js";

const __dirname = process.cwd()

const app = express();

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper("parseMsToDate", parseMsToDate);
hbs.registerHelper("toDate", toDate);
hbs.registerHelper("getTimeToDate", getTimeToDate);
app.set("view engine", "hbs");
const urlParser = bodyParser.urlencoded({extended: false});

app.get("/", function(request, response){
    let activities = GetAct();
    response.render("homePage.hbs", {
        Empty: activities.length == 0,
        activities: activities
    });
});
app.post("/editActivity", urlParser, editActivity);
app.get("/deleteActivity", deleteActivity);
app.post("/newActivity", urlParser, newActivity);
app.post("/saveActivity", urlParser, saveActivity);
app.post("/startActivity", urlParser, startActivity);
app.post("/stopActivity", urlParser, finishActivity);
app.get("/editActivity", editActivity);

app.listen(3000);