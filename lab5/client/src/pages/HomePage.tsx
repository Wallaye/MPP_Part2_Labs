import React, {FC, useContext, useEffect, useState} from "react";
import {IActivity} from "../models/IActivity";
import ActivityItem from "../components/ActivityItem";
import NavBar from "../components/NavBar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ACTIVITIES} from "../graphql/queries/activityQueries";

interface HomePageProps {
    activities: IActivity[];
}

const HomePage: FC = () => {
    const {userStore} = useContext(Context);
    const [activities, setActivities] = useState<IActivity[]>([])
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        userStore.checkIsAuth().then(data => {
            console.log("isAuth" + data);
            if (!data){
                navigate('/graphql/auth')
            }
        })
    }, [])

    const onErrorHandler = (err: any) => {
        console.log(error)
        setError(err.networkError.result.message)
    }

    const {loading} = useQuery(GET_ACTIVITIES, {
        variables: {
            userName: userStore.user.userName
        },
        onCompleted: data => {
            setActivities(data.getActivities as IActivity[])
        },
        onError: err => {
            console.log(err)
            onErrorHandler(err)
        }
    })

    if (loading || userStore.isLoading) {
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
                    <button className="btn btn-success mb-3" onClick={() => navigate('/graphql/activities/-1')}>Добавить активность</button>
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
                        <button className="btn btn-success mb-3" onClick={() => navigate('/graphql/activities/-1')}>Добавить активность
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
                                      onClick={(el) => navigate('/graphql/activities/' + el.activityId)}
                                      activity={el}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default observer(HomePage);