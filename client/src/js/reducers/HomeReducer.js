import * as types from '../actions/Types';

const initialState = {
  title: "Hello home reducer"
};

const homeReducer = function (state = initialState, action) {

  switch (action.type) {
    case types.GET_HOME_TITLE:
      return Object.assign({}, state, {title: action.title});
  }
  return state;

};

export default homeReducer;
