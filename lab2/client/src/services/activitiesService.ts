import api from "../http";
import {AxiosResponse} from "axios";
import {IActivity} from "../models/IActivity";

export default class ActivitiesService{
    static async getActivities(){
        return await api.get<IActivity[]>('/activities/')
    }
    static async getActivity(id: number){
        console.log(id);
        return await api.get<IActivity>('/activities/' + id);
    }
    static async deleteActivity(id: number){
        return await api.delete('/activities/' + id);
    }
    static async saveActivity(activity: IActivity, userName: string){
        return await api.put('/activities/', {activity, userName});
    }
    static async addActivity(activity: IActivity){
        return await api.post('/activities/', {activity});
    }
}