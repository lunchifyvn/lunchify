import React from 'react';
import { connect } from 'react-redux';
import Home from '../Pages/Home';
import Store from '../../store';
import {openLoginModal} from '../../actions/HeaderActions';

const HomeContainer = React.createClass({

    componentDidMount: function() {
    },

    getProfile: function(){

    },

    openLoginModal: function(){
      Store.dispatch(openLoginModal())
    },

    render: function() {
        return (
            <Home openLoginModal={this.openLoginModal} title={this.props.title} />
        );
    }

});

const mapStateToProps = function(store) {
    return {
        title: store.homeState.title
    };
};

export default connect(mapStateToProps)(HomeContainer);
