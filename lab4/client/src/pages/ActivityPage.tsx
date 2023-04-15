import React, {FC, useContext, useEffect, useState} from 'react';
import {IActivity} from "../models/IActivity";
import {DateToStringForInput} from "../utility/Utils";
import {useNavigate, useParams} from "react-router-dom";
import ActivitiesService from "../services/activitiesService";
import NavBar from "../components/NavBar";
import {Context} from "../index";
import {socket, socketPrivate} from "../http";

interface IError {
    status: number,
    message: string;
}

const ActivityPage: FC = () => {
    const {id} = useParams<string>();
    const [activity, setActivity] = useState<IActivity>({} as IActivity);
    const [isLoading, setLoading] = useState<boolean>(false);
    const {userStore} = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState<IError | null>(null)

    const [fields, setFields] = useState<IActivity>({
        name: "",
        description: "",
        startDate: DateToStringForInput(Date.now()),
        finishDate: "",
        isActive: false,
        isFinished: false,
        activityId: -1,
        project: "",
        userName: userStore.user.userName
    })

    function getActivity(activity: IActivity) {
        console.log(activity);
        setLoading(false);
        setActivity(activity)
        setFields({...activity});
        setError(null);
        navigate(`/activities/${activity.activityId}`)
    }

    function deleteActivity(activity: IActivity) {
        setLoading(false);
        setError(null);
        console.log("delete", activity);
        navigate("/activities/");
    }

    function editActivity(activity: IActivity) {
        setLoading(false);
        setActivity(activity)
        setFields({...activity});
        setError(null);
    }

    function errorListener(err: IError | null) {
        setError(err);
    }

    useEffect(() => {
        socketPrivate.on("activities:getOne", getActivity);
        socketPrivate.on("activities:deleteOne", deleteActivity);
        socketPrivate.on("error", errorListener);
        socketPrivate.on("activities:editOne", editActivity);
        return () => {
            socketPrivate.off("activities:getOne", getActivity);
            socketPrivate.off("activities:deleteOne", deleteActivity);
            socketPrivate.off("error", errorListener);
            socketPrivate.off("activities:editOne", editActivity);
        }
    }, [])

    useEffect(() => {
        if (id != '-1') {
            ActivitiesService.getActivity( +id!, userStore.user.userName!);
        } else {
            setFields({...fields, startDate: DateToStringForInput(Date.now())})
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFields({...fields, [name]: value});
    }

    useEffect(() => {
        setActivity(activity)
    })

    if (isLoading) {
        return <div className="align-self-center spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    }

    if (error != null) {
        return <>
            <NavBar userName={userStore.user.userName}/>
            <div className="container d-grid">
                <div className="row">
                    <h1 className="text-danger">{error.status}</h1>
                </div>
                <div className="row">
                    <h2 className="text-danger">{error.message}</h2>
                </div>
            </div>
        </>
    }

    return (
        <>
            <NavBar userName={userStore.user.userName}/>
            <div className="container-fluid mt-3">
                {fields.activityId != -1 && <button onClick={() => {
                    ActivitiesService.deleteActivity(userStore.user.userName, fields.activityId);
                }
                } className="btn btn-danger">Удалить</button>}
                <input hidden name="id" value={activity.activityId}/>
                <div className="form-group">
                    <label htmlFor="title">Заголовок:</label>
                    <input className="form-control" name="name" onChange={handleChange} value={fields.name}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Описание активности:</label>
                    <textarea value={fields.description} onChange={handleChange} className="form-control"
                              name="description" placeholder="Описание активности.."/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Проект</label>
                    <input value={fields.project} onChange={handleChange} className="form-control"
                           name="project" placeholder="Проект.."/>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Дата и время начала:</label><br/>
                    <input type="datetime-local" name="startDate" value={DateToStringForInput(fields.startDate)}
                           onChange={handleChange}/>
                </div>

                {fields.isFinished && <div className="form-group">
                    <label htmlFor="date">Дата и время окончания:</label><br/>
                    <input type="datetime-local" name="finishDate" value={DateToStringForInput(fields.finishDate)}
                           onChange={handleChange}/>
                </div>}

                {(!fields.isActive && !fields.isFinished && fields.name.trim() != "") &&
                    <button className="btn btn-primary mt-2" onClick={() => {
                        setFields({...fields, isActive: true});
                        if (canAddActivity(fields.name)) {
                            console.log("Adding");
                            console.log(fields);
                            ActivitiesService.addActivity({...fields, isActive: true});
                        }
                    }}>Запустить</button>}
                {(fields.isActive && !fields.isFinished && fields.name.trim() != "") &&
                    <button className="btn btn-success mt-2"
                            onClick={() => {
                                if (canAddActivity(fields.name)) {
                                    setFields({
                                        ...fields,
                                        isFinished: true,
                                        isActive: false,
                                        finishDate: DateToStringForInput(Date.now())
                                    });
                                    ActivitiesService.saveActivity(userStore.user.userName, {
                                        ...fields,
                                        isFinished: true,
                                        isActive: false,
                                        finishDate: DateToStringForInput(Date.now())
                                    });
                                }
                            }}>Завершить</button>}
                {(!fields.isActive && fields.isFinished && fields.name.trim() != "") &&
                    <button className="btn btn-warning mt-2"
                            onClick={() => {
                                if (canSaveActivity(fields)) {
                                    ActivitiesService.saveActivity( userStore.user.userName, {...fields});
                                } else {
                                    alert("Окончание должно быть позже начала!")
                                }
                            }}>Сохранить</button>}
            </div>
        </>
    );
};
export default ActivityPage;

function canAddActivity(name: string) {
    return name.trim() != "";
}

function canSaveActivity(activity: IActivity): boolean {
    if (activity.name.trim() == "") return false;
    const startDate = new Date(activity.startDate);
    const finishDate = new Date(activity.finishDate);
    return startDate <= finishDate;
}