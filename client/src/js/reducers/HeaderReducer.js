import * as types from '../actions/Types';

const initialState = {};

const headerReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_USER_INFO:
            return Object.assign({}, state, { user: action.user });

        case types.OPEN_LOGIN:
            return Object.assign({}, state, { isOpenLogin: true });

        case types.CLOSE_LOGIN:
            return Object.assign({}, state, { isOpenLogin: false });

        case types.LOGIN:
            return Object.assign({}, state, { isLogedIn: action.isLogedIn });
    }

    return state;

};

export default headerReducer;