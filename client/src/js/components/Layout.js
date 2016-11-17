import React, { Component, PropTypes } from "react";
import Header from './Container/HeaderContainer';
import Footer from './Footer';

export default function(props) {

    return (
        <div>
            <Header/>
            <div className="wrapper">{props.children}</div>
            <Footer/>
        </div>
    )

}


