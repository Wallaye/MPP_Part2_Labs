import {IActivity} from "../models/IActivity";
import {makeAutoObservable} from "mobx";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import ActivitiesService from "../services/activitiesService";
import {privateClient, userClient} from "../graphql";
import {GET_ONE_ACTIVITY} from "../graphql/queries/activityQueries";

export default class ActivitiesStore{
    isLoading = false;
    activities: IActivity[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setLoading(loading: boolean){
        this.isLoading = loading;
    }

    setActivities(activities: IActivity[]){
        this.activities = activities;
    }

    async getActivity(userName: string, actId: string){
        const {data} = await userClient.mutate({
            mutation: GET_ONE_ACTIVITY,

        })
    }

    async getActivities(){
        this.setLoading(true);
        try {
            const response = await ActivitiesService.getActivities();
            this.setActivities(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally{
            this.setLoading(false);
        }
    }
}