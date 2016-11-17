import * as types from '../actions/Types';

const initialState = {};

const loginModalReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.CLOSE_LOGIN:
            return Object.assign({}, state, { data: false });

    }

    return state;

};

export default loginModalReducer;