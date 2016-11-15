import React, {Component, PropTypes} from "react";
import {render} from 'react-dom';

export default class Footer extends Component {
    render() {
        return (<div className="page-footer text-center">
            <div className="page-footer-inner">
                Copyright 2016 &copy; Lunchify. All rights reserved
            </div>
            <div className="scroll-to-top">
                <i className="icon-arrow-up"></i>
            </div>
        </div>);
    }
}