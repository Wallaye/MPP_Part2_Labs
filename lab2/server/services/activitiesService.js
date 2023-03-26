import Activity from "../models/Activity.js";
import {ApiError} from "../exceptions/apiError.js";

export async function getAllActivitiesForUser(userName){
    return Activity.find({userName: userName});
}

export async function getActivityById(activityId, userName){
    const activity = await Activity.findOne({activityId});
    if (!activity){
        throw ApiError.BadRequest("Нет такой активности");
    }
    if (activity.userName !== userName){
        throw ApiError.NoAccessError();
    }
    return activity;
}

export async function AddActivity(activity){
    const activities = await Activity.find();
    let maxIndex = -1;
    for(const _activity of activities){
        if (_activity.activityId > maxIndex){
            maxIndex = _activity.activityId;
        }
    }
    activity.activityId = maxIndex + 1;
    return Activity.create(activity);
}

export async function EditActivity(activity, userName){
    const act = await Activity.findOne({activityId: activity.activityId});
    if (!act){
        throw ApiError.BadRequest("Нет такой активности");
    }
    if (activity.userName !== userName){
        throw ApiError.NoAccessError();
    }
    return Activity.findOneAndUpdate({activityId: act.activityId}, activity, {new: true});
    // act.name = activity.name;
    // act.description = activity.description;
    // act.isActive = activity.isActive;
    // act.isFinished = activity.isFinished;
    // act.startDate = activity.startDate;
    // act.finishDate = activity.finishDate;
    // return act.save();
}

export async function DeleteActivity(activityId, userName){
    const act = await Activity.findOne({activityId: activityId});
    if (!act){
        throw ApiError.BadRequest("Нет такой активности");
    }
    if (act.userName !== userName){
        throw ApiError.NoAccessError();
    }
    return Activity.findOneAndRemove({activityId});
}