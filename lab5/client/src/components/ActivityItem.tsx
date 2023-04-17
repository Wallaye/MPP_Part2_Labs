import React, {FC}from 'react';
import {IActivity} from "../models/IActivity";
import {toDate, getTimeDiff, DateToStringForInput} from "../utility/Utils";
import {useParams} from "react-router-dom";

interface ActivityItemProps {
    activity: IActivity,
    onClick: (activity: IActivity) => void
}

const ActivityItem: FC<ActivityItemProps> = ({activity, onClick}) => {
    return (
        <tr className="table-hover" onClick={() => {onClick(activity)}}>
            <td>{activity.name}</td>
            <td>{activity.project ?? ""}</td>
            <td>{toDate(DateToStringForInput(activity.startDate))}</td>
            <td>{activity.isFinished ? toDate(DateToStringForInput(activity.finishDate)) : "Ещё не завершено"}</td>
            <td>{activity.isFinished ? "Да" : "Нет"}</td>
            <td>{getTimeDiff(activity.startDate, activity.finishDate)}</td>
        </tr>
    );
};

export default ActivityItem;