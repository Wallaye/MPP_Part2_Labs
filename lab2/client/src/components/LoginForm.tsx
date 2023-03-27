import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "bootstrap/dist/css/bootstrap.css"
import NavBar from "./NavBar";

/*const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {userStore} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={() => userStore.login(email, password)}>
                Логин
            </button>
            <button onClick={() => userStore.registration(email, password)}>
                Регистрация
            </button>
        </div>
    );
};

export default observer(LoginForm);*/
const LoginForm: FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {userStore} = useContext(Context);

    return (
        <>
            {//<NavBar />
            }
            <div className="container-fluid bg-secondary justify-content-center">
                <div className="form-group">
                    <label>Введите имя пользователя</label>
                    <input
                        className="form-control"
                        onChange={e => setUserName(e.target.value)}
                        value={userName}
                        type="text"
                        placeholder="Введите имя пользователя"
                    />
                </div>

                <div className="form-group">
                    <label>Введите пароль</label>
                    <input
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Введите пароль"
                    />
                </div>

                <button className="btn btn-primary" onClick={() => {
                    userStore.login(userName, password)
                }}>Логин
                </button>

                <button className="btn btn-success" onClick={() => {
                    userStore.registration(userName, password)
                }}>Регистрация
                </button>
            </div>
        </>
    );
};

export default observer(LoginForm);
