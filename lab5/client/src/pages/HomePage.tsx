import React, {FC, useContext, useEffect, useState} from "react";
import {IActivity} from "../models/IActivity";
import ActivityItem from "../components/ActivityItem";
import NavBar from "../components/NavBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

interface HomePageProps {
    activities: IActivity[];
}

const HomePage: FC<HomePageProps> = ({activities}) => {
    const {userStore, actStore} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
            actStore.getActivities()
        }
        , [actStore])

    if (actStore.isLoading) {
        return <div className="align-self-center spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
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
                        <button className="btn btn-success mb-3" onClick={() => navigate('-1')}>Добавить активность
                        </button>
                    </div>
                </div>
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
                                      onClick={(el) => navigate('/api/activities/' + el.activityId)}
                                      activity={el}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default observer(HomePage);