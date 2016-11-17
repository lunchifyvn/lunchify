import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Store from '../../store';
import {openLoginModal} from '../../actions/HeaderActions';

const HeaderContainer = React.createClass({

    componentDidMount: function() {

    },

    showLogin: function(){
        Store.dispatch(openLoginModal())
    },

    render: function() {
        return (
            <Header user={this.props.user} openLogin={this.showLogin}/>
        );
    }

});

const mapStateToProps = function(store) {
    return {
        user: store.headerState
    };
};

export default connect(mapStateToProps)(HeaderContainer);
