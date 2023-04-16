import graphql from "graphql";

export const userType = new graphql.GraphQLObjectType({
    name: "User",
    fields: {
        _id: {type: graphql.GraphQLString},
        userName: {type: graphql.GraphQLString},
        password: {type: graphql.GraphQLString}
    }
})

export const userDataType = new graphql.GraphQLObjectType({
    name: "UserData",
    fields: {
        user: {type: userType},
        refreshToken: {type: graphql.GraphQLString},
        accessToken: {type: graphql.GraphQLString}
    }
})
