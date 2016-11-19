import * as types from '../actions/Types';

const initialState = {
<<<<<<< HEAD
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
=======
    title: "Hello home reducer"
};

const homeReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_HOME_TITLE:
            return Object.assign({}, state, { title: action.title });

    }

    return state;

};

export default homeReducer;
>>>>>>> 792bf76f499b7ee50338e628643afd26e9920bf2
