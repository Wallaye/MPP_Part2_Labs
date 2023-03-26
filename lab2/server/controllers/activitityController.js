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
        console.log(userName);
        const activity = await actService.getActivityById(id, userName);
        res.json(activity);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function EditActivity(req, res){
    try {
        let activity = req.body.activity;
        let act = await actService.EditActivity(activity);
        res.json(act);
    } catch (e){
        res.status(500).json(e)
    }
}
export async function AddActivity(req, res){
    try {
        let activity = req.body.activity;
        let act = await actService.AddActivity(activity);
        res.json(activity);
    } catch (e){
        res.status(500).json(e)
    }
}

export async function DeleteActivity(req, res){
    try{
        let activityId = req.params.id;
        const {userName} = req.user;
        console.log(activityId);
        let act = await actService.DeleteActivity(activityId, userName);
        res.json(act);
    } catch (e){
        res.status(500).json(e)
    }
}