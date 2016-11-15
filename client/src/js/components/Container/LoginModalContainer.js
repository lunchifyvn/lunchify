import React from 'react';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal';
import Store from '../../store';
import {closeLoginModal} from '../../actions/HeaderActions';

const LoginModalContainer = React.createClass({

    closeLogin: function(){
        Store.dispatch(closeLoginModal())
    },

    login: function(){
        console.log("login");
        Store.dispatch();
    },

    render: function() {
        console.log(this.props.isOpenLogin);
        return (
            <LoginModal isOpenLogin={this.props.isOpenLogin} closeLogin={this.closeLogin} login={this.login}/>
        );
    }

});

const mapStateToProps = function(store) {
    return {
        isOpenLogin: store.headerState.isOpenLogin
    };
};

export default connect(mapStateToProps)(LoginModalContainer);
