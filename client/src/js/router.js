import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import Layout from './components/Layout';

// Pages
import Container from './components/Container/Container';

export default (
    <Router history={browserHistory}>
        <Route component={Layout}>
            <Route path="/" component={Container.Home} />
            <Route path="topics">
                <IndexRoute component={Container.TopicList} />
            </Route>
        </Route>
    </Router>
);