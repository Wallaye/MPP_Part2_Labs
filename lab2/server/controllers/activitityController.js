import Activity from "../models/Activity.js";
import * as actService from "../services/activitiesService.js"
import activitiesRouter from "../routes/activitiesRouter.js";
import {ApiError} from "../exceptions/apiError.js";

export async function getAllActivitiesForUser(req, res){
    try {
        const {userName} = req.user;
        const activities = await actService.getAllActivitiesForUser(userName);
        res.json(activities);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function getActivityById(req, res){
    try {
        const {id} = req.params;
        const {userName} = req.user;
        const activity = await actService.getActivityById(id, userName);
        res.json(activity);
    } catch (e){
        res.status(e.status).json(e)
    }
}

export async function EditActivity(req, res){
    try {
        console.log("Activity got", req.body);
        let activity = req.body.activity;
        let act = await actService.EditActivity(activity, req.body.userName);
        console.log("activity saved", act);
        res.json(act);
    } catch (e){
        res.status(e.status).json(e)
    }
}
export async function AddActivity(req, res){
    try {
        let {activity} = req.body;
        console.log(req.body)
        let act = await actService.AddActivity(activity);
        console.log("db", act)
        res.json(activity);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function DeleteActivity(req, res){
    try{
        let activityId = req.params.id;
        const {userName} = req.user;
        let act = await actService.DeleteActivity(activityId, userName);
        res.json(act);
    } catch (e){
        res.status(e.status).json(e)
    }
}