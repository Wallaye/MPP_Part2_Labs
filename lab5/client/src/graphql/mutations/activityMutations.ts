import {gql} from "@apollo/client";

export const ADD_ACTIVITY = gql`
mutation addActivity($actInput: ActivityInput!){
  addActivity(actInput: $actInput){
    activityId
    name,
    description,
    userName,
    project,
    startDate,
    isActive, 
    isFinished, 
    startDate,
    finishDate
  }
}
`

export const DELETE_ACTIVITY = gql`
mutation deleteActivity($activityId: Int, $userName: String){
  deleteActivity(activityId: $activityId, userName: $userName){
    activityId
    name,
    description,
    userName,
    project,
    startDate,
    isActive, 
    isFinished, 
    startDate,
    finishDate
  }
}
`

export const EDIT_ACTIVITY = gql`
mutation editActivity($actInput: ActivityInput!, $userName: String){
  editActivity(actInput: $actInput, userName: $userName){
    activityId
    name,
    description,
    userName,
    project,
    startDate,
    isActive, 
    isFinished, 
    startDate,
    finishDate
  }
}
`