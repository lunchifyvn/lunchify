import React from 'react';
import { connect } from 'react-redux';
import Home from '../Pages/Home';
import * as homeApi from '../../api/Home';

const HomeContainer = React.createClass({

    componentDidMount: function() {
        homeApi.getTitle();
        //store.dispatch(loadSearchLayout('users', 'User Results'));
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
