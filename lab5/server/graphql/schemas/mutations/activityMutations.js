import graphql, {GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";
import * as ActService from "../../../services/activitiesService.js";
import {activityInput} from "../inputs/activityInput.js";
import {activityType} from "../types/activityType.js";

export const addActivity = {
    type: activityType,
    args: {
        actInput: {type: new graphql.GraphQLNonNull(activityInput)}
    },
    resolve: async (_, {actInput}) => {
        return await ActService.AddActivity(actInput)
    }
}
export const deleteActivity = {
    type: activityType,
    args: {
        activityId: {type: GraphQLInt},
        userName: {type: GraphQLString}
    },
    resolve: async (_, {activityId, userName}) => {
        return await ActService.DeleteActivity(activityId, userName)
    }
}
export const editActivity = {
    type: activityType,
    args: {
        actInput: {type: new graphql.GraphQLNonNull(activityInput)},
        userName: {type: GraphQLString}
    },
    resolve: async (_, {actInput, userName}) => {
        return await ActService.EditActivity(actInput, userName)
    }
}