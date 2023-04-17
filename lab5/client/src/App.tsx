import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./pages/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ActivityItem from "./components/ActivityItem";
import ActivityPage from "./pages/ActivityPage";

const App: FC = () => {
    const {userStore, actStore} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkIsAuth().then(
                () => {
                    actStore.getActivities()
                }
            );
        }
    }, [])

    if (userStore.isLoading) {
        return <div className="align-self-center spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    }

    if (!userStore.isAuth) {
        return <LoginForm/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/api/'} element={<HomePage activities={actStore.activities}/>}></Route>
                <Route path={'/api/activities'} element={<HomePage activities={actStore.activities}/>}></Route>
                <Route path={'/api/activities/:id'} element={<ActivityPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default observer(App);
