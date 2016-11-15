import React from 'react';
import { connect } from 'react-redux';
import Topics from '../Pages/Topics';
import * as topicsApi from '../../api/Topics';

const HomeContainer = React.createClass({

    componentDidMount: function() {
        topicsApi.getTopics();
        //store.dispatch(loadSearchLayout('users', 'User Results'));
    },

    render: function() {
        return (
            <Topics title={this.props.title} />
        );
    }

});

const mapStateToProps = function(store) {
    return {
        title: store.homeState.title
    };
};

export default connect(mapStateToProps)(HomeContainer);
