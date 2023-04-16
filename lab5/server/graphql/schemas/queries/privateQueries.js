import graphql from "graphql";
import {getActivity, getActivities} from "./activitiesQueries.js";

const privateQueries = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        getActivity,
        getActivities
    }
})

export default privateQueries;