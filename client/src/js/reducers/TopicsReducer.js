import * as types from '../actions/Types';

const initialState = {
    title: "Hello topics reducer"
};

const topicReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_TOPICS:
            return Object.assign({}, state, { title: action.title });

    }

    return state;

};

export default topicReducer;