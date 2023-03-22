import fs from 'fs';
import {saveActivities} from "./activityController.js";

const projectsFile = "projects.json"

function GetProjectById(projectId){
    let content = fs.readFileSync(projectsFile, "utf8");
    let projects = JSON.parse(content);
    for (let project of projects){
        if (project.id === projectId){
            return project;
        }
    }
}

function GetProjects(){
    let data = "";
    let projects = [];

    try {
        data = fs.readFileSync(projectsFile, "utf8");
    } catch(error) {
        console.error(error);
    }

    try {
        projects = JSON.parse(data);
    } catch(error) {
        console.error(error);
        fs.writeFileSync(projectsFile, '[]');
        projects = [];
    }
    return projects;
}

function RewriteProjects(projects) {
    let data = JSON.stringify(projects);
    fs.writeFileSync(projectsFile, data);
}

export const newProject = (req, res) => {
    let project = {
        id: 0,
        name: 0,
        activities: []
    }
    res.render("editProject.hbs", {
        title: project.name,
        project: project
    })
}

export const saveProject = (req, res) => {
    if (!req.body) res.sendStatus(400).send();

    let projects = GetProjects();
    let project = {
        id: req.body.id,
        name: req.body.name,
        activities: req.body.activities
    }
    if (project.id == 0){
        let maxId = Math.max.apply(Math, projects.map(function(o) {
            return o.id;
        }));
        if (maxId == Infinity) {
            maxId = 0;
        }
        project.id = maxId + 1;
        projects.push(project);
    } else {
        for (let i = 0; i < projects.length; i++){
            if (projects[i].id == project.id){
                projects[i].name = project.name;
                projects[i].activities = project.activities;
            }
        }
    }
    RewriteProjects(projects);
    res.redirect("/editProject?id=" + project.id);
}

export const deleteProject = (req, res) => {
    let id = req.query.id;
    let projects = GetProjects();
    let index = -1;

    for(let i = 0; i < notes.length; i++) {
        if(projects[i].id == id){
            index = i;
            break;
        }
    }

    if (index > -1){
        for (let i = 0; i < projects[index].activities; i++){
            projects[index].activities[i].project = -1
        }
        saveActivities(projects[index].activities)
        projects.splice(index, 1);

        RewriteProjects(projects);
        res.redirect("/");
    } else {
        res.status(404).send();
    }
}

export const editProject = (req, res) => {
    let project = GetProjectById(req.query.id);

    if (project != null) {
        res.render("editProject.hbs", {
            title: project.name,
            project: project
        });
    } else {
        res.status(404).send();
    }
}