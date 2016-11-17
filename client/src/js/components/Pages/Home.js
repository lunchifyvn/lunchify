import React, {Component, PropTypes} from "react";
import {render} from 'react-dom';

export default function (props) {
    return (
        <div className="container">
            <div className="banner text-center">
                <img className="banner-bg img-responsive" src="assets/img/banner.jpg"/>
                <div className="cta-content">
                    <div className="inner">
                        <img className="logo" src="assets/img/logo.png"/>
                        <h1>Kết nối những người có chung sở thích</h1>
                        <a onClick={props.openLoginModal} href="#" className="cta-btn">Tìm hiểu thêm</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
