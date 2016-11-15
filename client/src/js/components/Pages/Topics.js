import React, {Component, PropTypes} from "react";
import {render} from 'react-dom';


export default function (props) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
}