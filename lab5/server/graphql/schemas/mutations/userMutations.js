import graphql from "graphql";
import * as AuthService from "../../../services/authService.js";
import {userInput} from "../inputs/userInput.js";
import {userDataType} from "../types/userType.js";

const userMutations = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields:{
        login: {
            type: userDataType,
            args:{
                authInput: {type: new graphql.GraphQLNonNull(userInput)}
            },
            resolve: async (_, {authInput}) => {
                return await AuthService.login(authInput.userName, authInput.password);
            }
        },
        registration: {
            type: userDataType,
            args:{
                authInput: {type: new graphql.GraphQLNonNull(userInput)}
            },
            resolve: async (_, {authInput}) => {

                return await AuthService.registration(authInput.userName, authInput.password);
            }
        },
        logout: {
            type: graphql.GraphQLString,
            args:{
                refreshToken: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: async (_, {refreshToken}) => {
                const response = await AuthService.logout(refreshToken)
                console.log(response);
                return response.refreshToken;
            }
        },
         refresh: {
            type: userDataType,
            args:{
                refreshToken: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: async (_, {refreshToken}) => {
                return await AuthService.refresh(refreshToken)
            }
        }
    }
})

export default userMutations;