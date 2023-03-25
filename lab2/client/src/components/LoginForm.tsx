import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {userStore} = useContext(Context);
    return (
        <div>
            <input
                onChange={e => setUserName(e.target.value)}
                value={userName}
                type="text"
                placeholder="Введите имя пользователя"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Введите пароль"
            />
            <button onClick={() => {
                userStore.login(userName, password)
            }}>Логин
            </button>
            <button onClick={() => {
                userStore.registration(userName, password)
            }}>Регистрация
            </button>
        </div>
    );
};

export default observer(LoginForm);