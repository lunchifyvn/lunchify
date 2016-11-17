import React from 'react';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal';
import Store from '../../store';
import {closeLoginModal} from '../../actions/HeaderActions';
import {login} from '../../api/User';

const LoginModalContainer = React.createClass({

    closeLogin: function(){
        Store.dispatch(closeLoginModal())
    },

    login: function(){
        console.log("send login");
        login();
    },

    render: function() {
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
