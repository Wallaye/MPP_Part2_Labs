import {gql} from "@apollo/client";

export const GET_ACTIVITIES = gql`
query getActivities($userName: String){
    getActivities(userName: $userName){
        activityId, name, description, isActive, isFinished, startDate, finishDate, project, userName
    }
}  
`

export const GET_ONE_ACTIVITY = gql`
query getActivity($id: Int!, $userName: String){
    getActivity(id: $id, userName: $userName){
        activityId, name, description, isActive, isFinished, startDate, finishDate, project, userName    
    }
}
`
