import fs from 'fs';

const activitiesFile = "activities.json"

function GetActivityById(activityId){
    let content = fs.readFileSync(activitiesFile, "utf8");
    let activities = JSON.parse(content);
    for (let activity of activities){
        if (activity.id === activityId){
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

function RewriteActivities(activities) {
    let data = JSON.stringify(activities);
    fs.writeFileSync(activitiesFile, data);
}

export const newActivity = (req, res) => {
    let activity = {
        id: 0,
        name: "",
        description: "",
        project: -1,
        startDate: Date.now(),
        time: -1
    }
    res.render("editActivity.hbs", {
        title: activity.name,
        activity: activity
    })
}

export const saveActivity = (req, res) => {
    if (!req.body) res.sendStatus(400).send();

    let activities = GetActivities();
    let activity = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        project: -1,
        startDate: req.body.startDate,
        time: -1
    }
    if (activity.id == 0){
        let maxId = Math.max.apply(Math, activities.map(function(o) {
            return o.id;
        }));
        if (maxId == Infinity) {
            maxId = 0;
        }
        activity.id = maxId + 1;
        activities.push(activity);
    } else {
        for (let i = 0; i < activities.length; i++){
            if (activities[i].id == activity.id){
                activities[i].name = activity.name;
                activities[i].description = activity.description;
                activities[i].startDate = activity.startDate;
                activities[i].time = activity.time;
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