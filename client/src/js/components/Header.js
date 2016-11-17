import React, {Component, PropTypes} from "react";
import {render} from 'react-dom';
import LoginModal from './Container/LoginModalContainer';

export default function (props) {
    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mainMenu">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="logo navbar-brand" href="#">
                            <img className="img-responsive" alt="Brand" src="assets/img/logo.png"/>
                        </a>
                    </div>
                    <div className="main-menu collapse navbar-collapse" id="mainMenu">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden active">
                                <a href="#page-top"></a>
                            </li>
                            <li className="page-scroll last">
                                <a onClick={props.openLogin} href="#">Đăng ký / đăng nhập</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <LoginModal />
        </header>)
}
