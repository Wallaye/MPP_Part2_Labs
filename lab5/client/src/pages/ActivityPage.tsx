import React, {FC, useContext, useEffect, useState} from 'react';
import {IActivity} from "../models/IActivity";
import {DateToStringForInput} from "../utility/Utils";
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../components/NavBar";
import {Context} from "../index";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ONE_ACTIVITY} from "../graphql/queries/activityQueries";
import {ADD_ACTIVITY, DELETE_ACTIVITY, EDIT_ACTIVITY} from "../graphql/mutations/activityMutations";
import {observer} from "mobx-react-lite";

interface IError {
    status: number,
    message: string;
}

const ActivityPage: FC = () => {
    const {id} = useParams<string>();
    const [activity, setActivity] = useState<IActivity>({} as IActivity);
    const {userStore} = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState<IError | null>(null)
    const [myError, setErr] = useState<any>(null)
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

    const errorHandler = (error: any) => {
        console.log(error)
        setErr(error.networkError.result.message)
    }

    const {loading, refetch} = useQuery(GET_ONE_ACTIVITY, {
        variables: {
            id: +id!,
            userName: userStore.user.userName
        },
        onCompleted: data => {
            setFields({...data.getActivity});
            setActivity(data.getActivity);
        },
        onError: errorHandler
    })

    const [addActivity] = useMutation(ADD_ACTIVITY, {
        onError: errorHandler,
        onCompleted: () => {
            refetch()
        }
    })

    const [deleteActivity] = useMutation(DELETE_ACTIVITY, {
        onError: errorHandler,
        onCompleted: () => {
            navigate(-1)
        }
    })

    const [editActivity] = useMutation(EDIT_ACTIVITY, {
        onError: errorHandler,
        onCompleted: () => {
            refetch()
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFields({...fields, [name]: value});
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFields({...fields, [name]: value});
        console.log(fields.finishDate)
    }

    if (loading) {
        return <div className="align-self-center spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    }

    if (myError != null) {
        return <>
            <NavBar userName={userStore.user.userName}/>
            <div className="container d-grid">
                <div className="row">
                    <h1 className="text-danger">{myError.status}</h1>
                </div>
                <div className="row">
                    <h2 className="text-danger">{myError.message}</h2>
                </div>
            </div>
        </>
    }

    return (
        <>
            <NavBar userName={userStore.user.userName}/>
            <div className="container-fluid mt-3">
                {fields.activityId != -1 && <button onClick={async (e) => {
                    e.preventDefault();
                    deleteActivity({
                        variables: {
                            activityId: fields.activityId,
                            userName: fields.userName
                        }
                    })
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
                           onChange={handleDateChange}/>
                </div>

                {fields.isFinished && <div className="form-group">
                    <label htmlFor="date">Дата и время окончания:</label><br/>
                    <input type="datetime-local" name="finishDate" value={DateToStringForInput(fields.finishDate)}
                           onChange={handleDateChange}/>
                </div>}

                {(!fields.isActive && !fields.isFinished && fields.name.trim() != "") &&
                    <button className="btn btn-primary mt-2" onClick={(event) => {
                        event.preventDefault();

                        setFields({...fields, isActive: true});
                        if (canAddActivity(fields.name)) {
                            console.log("Adding");
                            addActivity({
                                variables: {
                                    actInput: {
                                        name: fields.name,
                                        isActive: true,
                                        isFinished: false,
                                        userName: fields.userName,
                                        startDate: fields.startDate,
                                        activityId: -1
                                    }
                                }
                            }).then(activity => {
                                console.log("activity after adding", activity);
                                setFields({
                                    ...(activity.data.addActivity)
                                })
                                navigate(`/graphql/activities/${activity.data.addActivity.activityId}`)
                            })
                        }
                    }}>Запустить</button>}
                {(fields.isActive && !fields.isFinished && fields.name.trim() != "") &&
                    <button className="btn btn-success mt-2"
                            onClick={(e) => {
                                e.preventDefault();
                                setFields({
                                    ...fields,
                                    isFinished: true,
                                    isActive: false,
                                    finishDate: DateToStringForInput(Date.now())
                                })
                                if (canAddActivity(fields.name)) {
                                    console.log(userStore.user.userName, fields)
                                    console.log({...fields})
                                    editActivity({
                                        variables: {
                                            userName: userStore.user.userName,
                                            actInput: {
                                                activityId: fields.activityId,
                                                name: fields.name,
                                                description: fields.description,
                                                isActive: false,
                                                isFinished: true,
                                                startDate: fields.startDate,
                                                finishDate: DateToStringForInput(Date.now()),
                                                userName: fields.userName,
                                                project: fields.project
                                            }
                                        }
                                    })
                                }
                            }}>Завершить</button>}
                {(!fields.isActive && fields.isFinished && fields.name.trim() != "") &&
                    <button className="btn btn-warning mt-2"
                            onClick={() => {
                                if (canSaveActivity(fields)) {
                                    editActivity({
                                        variables: {
                                            userName: userStore.user.userName,
                                            actInput: {
                                                activityId: fields.activityId,
                                                name: fields.name,
                                                description: fields.description,
                                                isActive: false,
                                                isFinished: true,
                                                startDate: fields.startDate,
                                                finishDate: DateToStringForInput(Date.now()),
                                                userName: fields.userName,
                                                project: fields.project
                                            }
                                        }
                                    }).then(data => {
                                        console.log(data.data.editActivity)
                                    })
                                } else {
                                    alert("Окончание должно быть позже начала!")
                                }
                            }}>Сохранить</button>}
            </div>
        </>
    );
};
export default observer(ActivityPage);

function canAddActivity(name: string) {
    return name.trim() != "";
}

function canSaveActivity(activity: IActivity): boolean {
    if (activity.name.trim() == "") return false;
    const startDate = new Date(DateToStringForInput(activity.startDate));
    const finishDate = new Date(DateToStringForInput(activity.finishDate));
    return startDate <= finishDate;
}