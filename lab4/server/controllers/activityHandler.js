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
            console.log(userName, id);
            const activity = await actService.getActivityById(id, userName);
            socket.emit("activities:getOne", activity)
        } catch (e) {
            console.log(e);
            SocketErrors.emitError(socket, e);
        }
    }

    async function editActivity(userName, activity) {
        try {
            console.log(activity, userName);
            const act = await actService.EditActivity(activity, userName);
            socket.emit("activities:editOne", act);
        } catch (e) {
            SocketErrors.emitError(socket, e);
        }
    }

    async function addActivity(activity) {
        try {
            const act = await actService.AddActivity(activity);
            socket.emit("activities:getOne", act);
        } catch (e) {
            SocketErrors.emitError(socket, e);
        }
    }

    async function deleteActivity(userName, activityId) {
        try {
            const act = await actService.DeleteActivity(activityId, userName);
            socket.emit("activities:deleteOne", act);
        } catch (e) {
            SocketErrors.emitError(socket, e);
        }
    }

    socket.on("activities:getAll", getAllActivitiesForUser)
    socket.on("activities:getOne", getActivityById)
    socket.on("activities:editOne", editActivity)
    socket.on("activities:addOne", addActivity)
    socket.on("activities:deleteOne", deleteActivity)
}