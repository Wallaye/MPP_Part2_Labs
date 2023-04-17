import graphql from "graphql";
import {activityType} from "../types/activityType.js";
import * as ActivityService from "../../../services/activitiesService.js";

export const getActivities = {
    type: new graphql.GraphQLList(activityType),
    args: {
        userName: {type: graphql.GraphQLString}
    },
    resolve: async (_, {userName}) => {
        return await ActivityService.getAllActivitiesForUser(userName);
    }
}

export const getActivity = {
    type: activityType,
    args: {
        userName: {type: graphql.GraphQLString},
        id: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)}
    },
    resolve: async (_, {userName, id}) => {
        return await ActivityService.getActivityById(id, userName);
    }
}