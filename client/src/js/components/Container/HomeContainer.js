import React from 'react';
import { connect } from 'react-redux';
import Home from '../Pages/Home';
import {getHomeTitle} from '../../actions/HomeActions';
const HomeContainer = React.createClass({

    componentDidMount: function() {
        store.dispatch(getHomeTitle("home page"));
    },

    render: function() {
        return (
            <Home title={this.props.title} />
        );
    }

});

const mapStateToProps = function(store) {
    return {
        title: store.homeState.title
    };
};

export default connect(mapStateToProps)(HomeContainer);
