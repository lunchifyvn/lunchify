import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import router from './router';
import {render} from 'react-dom';

require("../scss/index.scss");

render(
    <Provider store={store}>{router}</Provider>,
    document.getElementById('root')
);