import React, {FC, useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useInput} from "../hooks/useInput";
import "bootstrap/dist/css/bootstrap.css"
import {useMutation} from "@apollo/client";
import {LOGIN, REGISTRATION} from "../graphql/mutations/userMutations";
import {onAuth, onError} from "../store/UserStore";
import {IUser} from "../models/IUser";
import {useNavigate} from "react-router-dom";

const LoginForm: FC = () => {
    const {value: userName, onChange: setUserName} = useInput('');
    const {value: password, onChange: setPassword} = useInput('');
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    const [login] = useMutation(LOGIN, {
        onCompleted: data => {
            onAuth(data.login);
        },
        onError: onError
    })

    const [registration] = useMutation(REGISTRATION, {
        onCompleted: data => {
            onAuth(data.login)
        },
        onError: onError
    })

    return (
        <>
            <div className="container bg-dark p-5 w-75 align-items-center
            rounded-5 border-top border-secondary">
                <span className="h1 align-self-center text-white">Авторизация</span>
                <div className="w-100">
                    <div className="form-group mb-2 w-100">
                        <label className="text-white">Введите имя пользователя</label>
                        <input
                            className="form-control"
                            onChange={setUserName}
                            value={userName}
                            type="text"
                            placeholder="Введите имя пользователя"
                        />
                    </div>
                </div>

                <div className="form-group mb-2 w-100">
                    <label className="text-white">Введите пароль</label>
                    <input
                        className="form-control"
                        onChange={setPassword}
                        value={password}
                        type="password"
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary w-50" onClick={() => {
                        try {
                            login({
                                variables: {
                                    input: {
                                        userName: userName,
                                        password: password
                                    }
                                }
                            }).then(data => {
                                console.log("success ", data)
                                userStore.setAuth(true);
                                userStore.setUser(data.data.login.user as IUser);
                                navigate("/graphql/activities")
                            })
                        } catch (e: any) {
                            console.log(e.response?.data?.message);
                        }
                    }}>Логин
                    </button>

                    <button className="btn btn-success w-50" onClick={() => {

                        try {
                            registration({
                                variables: {
                                    authInput: {
                                        userName: userName,
                                        password: password
                                    }
                                }
                            }).then(data => {
                                userStore.setAuth(true);
                                userStore.setUser(data.data.login.user as IUser);
                                navigate("/graphql/activities")
                            })
                        } catch (e: any) {
                            alert("Такой пользователь уже есть")
                            console.log(e.response?.data?.message);
                        }
                    }}>Регистрация
                    </button>
                </div>

            </div>
        </>
    );
};

export default observer(LoginForm);
