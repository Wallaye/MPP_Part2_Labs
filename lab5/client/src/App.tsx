import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./pages/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ActivityItem from "./components/ActivityItem";
import ActivityPage from "./pages/ActivityPage";
import privateDecorator from "./components/privateDecorator";
import PrivateContextLayout from "./components/privateDecorator";

const loginFail = () => {
    alert("SIIOO");
}

const App: FC = () => {
    const {userStore} = useContext(Context);

    useEffect(() => {
        userStore.checkIsAuth()
    }, [])

    if (userStore.isLoading) {
        return <div className="align-self-center spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/graphql/auth'} element={<LoginForm/>}></Route>
                <Route element={<PrivateContextLayout loginFail={loginFail}/>}>
                    <Route path={'/graphql/activities'} element={<HomePage/>}></Route>
                    <Route path={'/graphql/activities/:id'} element={<ActivityPage/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default observer(App);
