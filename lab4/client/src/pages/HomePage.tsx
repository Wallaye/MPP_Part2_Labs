import React, {FC, useContext, useEffect, useState} from "react";
import {IActivity} from "../models/IActivity";
import ActivityItem from "../components/ActivityItem";
import NavBar from "../components/NavBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {socketPrivate} from "../http";
import {IUser} from "../models/IUser";
import ActivitiesService from "../services/activitiesService";


const HomePage: FC = () => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    function getActivities(activities: IActivity[]) {
        console.log("GOT", activities);
        setActivities([...activities])
        setLoading(false);
        setError(null);
    }

    function errorListener(err: any) {
        setError(err);
    }

    useEffect(() => {
        socketPrivate.on('activities:getAll', getActivities)
        socketPrivate.on('error', errorListener)
        return () => {
            socketPrivate.off('activities:getAll', getActivities)
            socketPrivate.off('error', errorListener)
        }
    }, [])

    useEffect(() => {
            setLoading(true);
            console.log("user: ", userStore.user)
            if (userStore.user !== {} as IUser) {
                ActivitiesService.getActivities(userStore.user.userName);
            }
        }
        , [])

    if (isLoading) {
        return <>
            <div className="align-self-center spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        </>
    }

    if (activities.length == 0) {
        return <>
            <NavBar userName={userStore.user.userName}></NavBar>
            <div className="container-fluid mt-3 d-grid justify-content-center">
                <div className="row">
                    <span className="h1 align-self-center">Нет активностей!</span>
                </div>
                <div className="row w-auto">
                    <button className="btn btn-success mb-3" onClick={() => navigate('-1')}>Добавить активность</button>
                </div>
            </div>
        </>
    }
    return (
        <div>
            <NavBar userName={userStore.user.userName}></NavBar>
            <div>
                <div className="container-fluid mt-3 d-flex justify-content-center">
                    <div className="row w-auto">
                        <button className="btn btn-success mb-3" onClick={() => navigate('/activities/-1')}>Добавить активность
                        </button>
                    </div>
                </div>
                {error &&
                    <div className="border border-danger border rounded-4 p-2 px-4 mt-2">
                        <span className="text-danger text-center h3">{error.message}</span>
                    </div>}
                <table className="table table-hover table-bordered mt2">
                    <thead className="thead-light">
                    <tr>
                        <th>Имя</th>
                        <th>Проект</th>
                        <th>Дата и время начала</th>
                        <th>Дата и время конца</th>
                        <th>Завершена</th>
                        <th>Время</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map(el =>
                        <ActivityItem key={el.activityId}
                                      onClick={(el) => navigate('/activities/' + el.activityId)}
                                      activity={el}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default observer(HomePage);