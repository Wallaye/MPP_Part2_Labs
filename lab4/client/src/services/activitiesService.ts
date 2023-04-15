import {socketPrivate} from "../http";
import {IActivity} from "../models/IActivity";

export default class ActivitiesService {
    static getActivities(userName: string) {
        socketPrivate.emit("activities:getAll", userName);
    }

    static getActivity(id: number, userName: string) {
        socketPrivate.emit("activities:getOne", userName, id);
    }

    static deleteActivity(userName: string, id: number) {
        socketPrivate.emit("activities:deleteOne", userName, id)
    }

    static saveActivity(userName: string, activity: IActivity) {
        socketPrivate.emit("activities:editOne", userName, activity)
    }

    static addActivity(userName: string, activity: IActivity) {
        socketPrivate.emit("activities:deleteOne", userName, activity)
    }
}