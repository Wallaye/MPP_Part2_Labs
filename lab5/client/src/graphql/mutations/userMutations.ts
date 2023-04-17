import {gql} from "@apollo/client";

export const LOGIN = gql`
mutation login($input: AuthInput!){
  login(authInput: $input){
    user {userName},
    refreshToken,
    accessToken
  }
}
`

export const REGISTRATION = gql`
mutation registration($input:AuthInput!){
  registration(authInput: $input){
    user {userName},
    refreshToken,
    accessToken
  }
}
`

export const LOGOUT = gql`
mutation logout($token:String!){
  logout(refreshToken: $token)
}
`

export const REFRESH = gql`
mutation refresh($token: String!){
  refresh(refreshToken: $token){
     user {
        userName
      }, 
      refreshToken,
      accessToken
    }
  }
`