import {ApolloClient, InMemoryCache} from "@apollo/client";
import {RetryLink} from "@apollo/client/link/retry";
import {REFRESH} from "./mutations/userMutations";
import {setContext} from "@apollo/client/link/context";
import {useContext} from "react";
import {Context} from "../index";

export const API_URL = `http://localhost:5000/graphql/auth`;
export const PRIVATE_URL = `http://localhost:5000/graphql/activities`;

export const userClient = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
})

function retryLink(refreshFailCallback: any) {
    return new RetryLink({
        attempts: {
            max: 2,
            retryIf: async (error, operation) => {
                if (error && error.response && error.response.status === 401) {
                    try {
                        const {data} = await userClient.mutate({
                            mutation: REFRESH,
                            variables: {
                                input: localStorage.getItem("refreshToken")
                            }
                        })
                        if(!data.errors){
                            console.log(data)
                            localStorage.setItem("refreshToken", data.refresh.refreshToken)
                            localStorage.setItem("accessToken", data.refresh.accessToken)
                        }else{
                            refreshFailCallback(data.errors)
                            return false
                        }

                        operation.setContext((prev: any) => {
                            const token = localStorage.getItem('accessToken');
                            return {
                                headers:{
                                    ...prev.headers,
                                    authorization: token ? `Bearer ${token}` : "",
                                }
                            }
                        })
                        return true
                    } catch (e) {
                        refreshFailCallback(e)
                        return false
                    }
                }
                return false
            }
        }
    })
}