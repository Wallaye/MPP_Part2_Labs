import graphql, {GraphQLObjectType} from "graphql";
import {addActivity, editActivity, deleteActivity} from "./activityMutations.js";

const privateMutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addActivity,
        editActivity,
        deleteActivity
    }
})

export default privateMutations;