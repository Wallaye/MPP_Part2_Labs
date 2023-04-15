import SocketErrors from "./errorHandler.js";
import * as actService from "../services/activitiesService.js"

export const activityHandler = (socket) => {
    async function getAllActivitiesForUser(userName) {
        try {
            const activities = await actService.getAllActivitiesForUser(userName);
            socket.emit("activities:getAll", activities);
        } catch (e) {
            SocketErrors.emitError(e);
        }
    }

    async function getActivityById(userName, id) {
        try {
            const activity = await actService.getActivityById(id, userName);
            socket.emit("activities:getOne", activity)
        } catch (e) {
            SocketErrors.emitError(e);
        }
    }

    async function EditActivity(activity, userName) {
        try {
            let act = await actService.EditActivity(activity, userName);
            socket.emit("activities:editOne", act);
        } catch (e) {
            SocketErrors.emitError(e);
        }
    }

}