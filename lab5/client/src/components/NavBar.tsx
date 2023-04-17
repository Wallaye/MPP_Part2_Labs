import React, {FC, useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

interface NavBarProps{
    userName: string
}

const NavBar: FC<NavBarProps>= (props) => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();
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
                        <button className="nav-link btn-outline-light border-0"
                           onClick={() => {navigate("/graphql/activities/")}}
                           >Home</button>
                    </li>
                </ul>
            </div>
            <div className="my-2 my-lg-0">
                <span className="mr-sm-2 text-black">{props.userName}</span>
                <button onClick={() => {
                    try {
                        userStore.logout(localStorage.getItem("refreshToken")!).then(data => {
                            console.log(data)
                        })
                    } catch (e: any) {
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