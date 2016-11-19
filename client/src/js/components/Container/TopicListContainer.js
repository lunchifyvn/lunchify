import React from 'react';
import { connect } from 'react-redux';
import Topics from '../Pages/Topics';
import * as topicsApi from '../../api/Topics';

const HomeContainer = React.createClass({

    componentDidMount: function() {
        topicsApi.getTopics();
<<<<<<< HEAD
=======
        //store.dispatch(loadSearchLayout('users', 'User Results'));
>>>>>>> 792bf76f499b7ee50338e628643afd26e9920bf2
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
