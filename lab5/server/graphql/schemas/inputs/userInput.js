import graphql from "graphql";

export const userInput = new graphql.GraphQLInputObjectType({
    name: "AuthInput",
    fields: {
        userName: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
        password: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
    }
})
