import * as types from '../actions/Types';

export function getHomeTitle(title){
    return {
        type: types.GET_HOME_TITLE,
        title
    };
}
