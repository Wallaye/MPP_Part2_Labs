import graphql from "graphql";
import {userDataType, userType} from "../types/userType.js";
import {userInput} from "../inputs/userInput.js";
import * as AuthService from "../../../services/authService.js";

const userQueries = new graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        getUser: {
            type: userType,
            args: {
                id: {type: graphql.GraphQLString}
            },
            resolve: (async (_, {id}) => {
                return await AuthService.getUser(id);
            })
        }
    }
})

export default userQueries;