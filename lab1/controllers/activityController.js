import fs from 'fs';

const activitiesFile = "activities.json"

function GetActivityById(activityId){
    let content = fs.readFileSync(activitiesFile, "utf8");
    let activities = JSON.parse(content);
    for (let activity of activities){
        if (activity.id == activityId){
            return activity;
        }
    }
}

function GetActivities(){
    let data = "";
    let activities = [];

    try {
        data = fs.readFileSync(activitiesFile, "utf8");
    } catch(error) {
        console.error(error);
    }
    try {
        activities = JSON.parse(data);
    } catch(error) {
        console.error(error);
        fs.writeFileSync(activitiesFile, '[]');
        activities = [];
    }
    return activities;
}

export const GetAct = () => {
    return GetActivities();
}

function RewriteActivities(activities) {
    let data = JSON.stringify(activities);
    fs.writeFileSync(activitiesFile, data);
}

export const newActivity = (req, res) => {
    let activity = {
        id: -1,
        name: "",
        description: "",
        project: "",
        startDate: Date.now(),
        timeActive: -1,
        isFinished: false
    }
    res.render("editActivity.hbs", {
        title: activity.name,
        isNew: true,
        activity: activity
    })
}

export const saveActivity = (req, res) => {
    console.log(req.body)
    if (!req.body) res.sendStatus(400).send();

    let activities = GetActivities();
    let activity = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        project: req.body.project,
        startDate: req.body.startDate,
        finishDate: req.body.finishDate,
        isActive: true,
        isFinished: true
    }
    if (activity.id == -1){
        let maxId = Math.max.apply(Math, activities.map(function(o) {
            return o.id;
        }));
        if (Math.abs(maxId) === Infinity) {
            maxId = 0;
        }
        activity.id = maxId + 1;
        activities.push(activity);
    } else {
        for (let i = 0; i < activities.length; i++){
            if (activities[i].id == activity.id){
                activities[i].name = activity.name;
                activities[i].description = activity.description;
                if (activity.finishDate > activity.startDate){
                    activities[i].startDate = Date.parse(activity.startDate);
                    activities[i].finishDate = Date.parse(activity.finishDate);
                }
                activities[i].isActive = true;
                activities[i].project = activity.project;
                activities[i].isFinished = true;
            }
        }
    }
    RewriteActivities(activities);
    res.redirect("/editActivity?id=" + activity.id);
}


export const deleteActivity = (req, res) => {
    let id = req.query.id;
    let activities = GetActivities();
    let index = -1;

    for(let i = 0; i < activities.length; i++) {
        if(activities[i].id == id){
            index = i;
            break;
        }
    }

    if (index > -1){
        activities.splice(index, 1);
        RewriteActivities(activities);
        res.redirect("/");
    } else {
        res.status(404).send();
    }
}

export const saveActivities = (activities) => {
    RewriteActivities(activities);
}

export const editActivity = (req, res) => {
    let activity = GetActivityById(req.query.id);
    if (activity != null) {
        res.render("editActivity.hbs", {
            title: activity.name,
            activity: activity
        });
    } else {
        res.status(404).send();
    }
}

export const startActivity = (req, res) =>{
    if (!req.body) res.sendStatus(400).send();

    let activities = GetActivities();
    let activity = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        project: req.body.project,
        startDate: req.body.startDate,
        finishDate: 0,
        isActive: true,
        isFinished: false
    }
    console.log(activity)
    if (activity.id == -1){
        let maxId = Math.max.apply(Math, activities.map(function(o) {
            return o.id;
        }));
        if (Math.abs(maxId) === Infinity) {
            maxId = 0;
        }
        activity.id = maxId + 1;
        activities.push(activity);
    } else {
        for (let i = 0; i < activities.length; i++){
            if (activities[i].id == activity.id){
                activities[i].name = activity.name;
                activities[i].description = activity.description;
                activities[i].startDate = Date.parse(activity.startDate);
                activities[i].isActive = true;
                activities[i].project = activity.project;
                activities[i].isFinished = false;
            }
        }
    }
    RewriteActivities(activities);
    res.redirect("/editActivity?id=" + activity.id);
}

export const finishActivity = (req, res) => {
    if (!req.body) res.sendStatus(400).send();

    let activities = GetActivities();
    let activity = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        project: req.body.project,
        startDate: req.body.startDate,
        finishDate: req.body.finishDate,
        isActive: true,
        isFinished: false
    }
    if (activity.id == -1){
        let maxId = Math.max.apply(Math, activities.map(function(o) {
            return o.id;
        }));
        if (Math.abs(maxId) === Infinity) {
            maxId = 0;
        }
        activity.id = maxId + 1;
        activities.push(activity);
    } else {
        for (let i = 0; i < activities.length; i++){
            if (activities[i].id == activity.id){
                activities[i].name = activity.name;
                activities[i].description = activity.description;
                activities[i].startDate = Date.parse(activity.startDate);
                activities[i].finishDate = Date.now();
                activities[i].isActive = true;
                activities[i].project = activity.project;
                activities[i].isFinished = true;
            }
        }
    }
    RewriteActivities(activities);
    res.redirect("/editActivity?id=" + activity.id);
}