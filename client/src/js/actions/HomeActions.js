import * as types from '../actions/Types';

export function getHomeTitle(title="Homepage"){
    return {
        type: types.GET_HOME_TITLE,
        title
    };
}
