import graphql from "graphql";

export const activityType = new graphql.GraphQLObjectType({
    name: "Activity",
    fields: {
        activityId: {type: graphql.GraphQLInt},
        name: {type: graphql.GraphQLString},
        description: {type: graphql.GraphQLString},
        isActive: {type: graphql.GraphQLBoolean},
        isFinished: {type: graphql.GraphQLBoolean},
        startDate: {type: graphql.GraphQLString},
        finishDate: {type: graphql.GraphQLString},
        userName: {type: graphql.GraphQLString},
        project: {type: graphql.GraphQLString}
    }
})
