import React, {FC, useState} from 'react';

interface NavBarProps{
    isLogged: boolean;
}

//const NavBar: FC<NavBarProps> = ({isLogged}) => {
const NavBar: FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">APP</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/">Главная</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;