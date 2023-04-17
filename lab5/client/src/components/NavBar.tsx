import React, {FC, useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {LOGOUT} from "../graphql/mutations/userMutations";
import {onError, onLogout} from "../store/UserStore";
import {IUser} from "../models/IUser";

interface NavBarProps {
    userName: string
}

const NavBar: FC<NavBarProps> = (props) => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();
    const [logout] = useMutation(LOGOUT, {
        onCompleted: data => {
            onLogout()
            console.log(data)
        },
        onError: onError
    })

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/graphql/activities/">Home</a>
                    </li>
                </ul>
            </div>
            <div className="my-2 my-lg-0">
                <span className="mr-sm-2 text-black">{props.userName}</span>
                <button onClick={() => {
                    try {
                        logout({
                            variables: {
                                refreshToken: localStorage.getItem("refreshToken")
                            }
                        }).then(data => {
                            console.log(data)
                            onLogout()
                            userStore.setAuth(false);
                            userStore.setUser({} as IUser);
                        })
                    } catch (e: any) {
                        console.log("logout", e);
                        console.log(e.response?.data?.message);
                    }
                    navigate('/graphql/auth')
                }} className="btn btn-outline-danger my-2 my-sm-0">Выйти
                </button>
            </div>
        </nav>
    );
};

export default NavBar;