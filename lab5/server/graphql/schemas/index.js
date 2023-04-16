import graphql from "graphql";
import userMutations from "./mutations/userMutations.js";
import userQueries from "./queries/userQueries.js";
import privateMutations from "./mutations/privateMutations.js";
import privateQueries from "./queries/privateQueries.js";

export const userSchema = new graphql.GraphQLSchema({mutation: userMutations, query: userQueries})
export const privateSchema = new graphql.GraphQLSchema({mutation: privateMutations, query: privateQueries})