import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./pages/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ActivityPage from "./pages/ActivityPage";

const App: FC = () => {
    const {userStore} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            userStore.checkIsAuth();
        }
    }, [])

    if (userStore.isLoading) {
        return <>
            <h1>userStore</h1>
            <div className="align-self-center spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        </>
    }

    if (!userStore.isAuth) {
        return <LoginForm/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage/>}></Route>
                <Route path={'/activities'} element={<HomePage/>}></Route>
                <Route path={'/activities/:id'} element={<ActivityPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default observer(App);
