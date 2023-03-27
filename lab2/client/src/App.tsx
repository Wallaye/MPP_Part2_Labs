import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App: FC = () => {
    const {userStore} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkIsAuth();
        }
    }, [])

    if (userStore.isLoading){
        return <div>Loading</div>
    }
    if (!userStore.isAuth){
        return <LoginForm/>
    }
    return (
        <div className="App">
            <h1>{userStore.isAuth ? `Авторизован ${userStore.user.userName}` : "НЮХАЙ БЕБРУ"}</h1>
            <button onClick={()=>{userStore.logout().then()}}>Выйти</button>
        </div>
    );
}

export default observer(App);
