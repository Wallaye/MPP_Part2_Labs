import graphql from "graphql";

export const activityInput = new graphql.GraphQLInputObjectType({
    name: "ActivityInput",
    fields: {
        activityId: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
        name: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
        description: {type: graphql.GraphQLString},
        isActive: {type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)},
        isFinished: {type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)},
        startDate: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
        finishDate: {type: graphql.GraphQLString},
        userName: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
        project: {type: graphql.GraphQLString},
    }
})
