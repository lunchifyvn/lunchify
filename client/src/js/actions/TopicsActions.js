import * as types from '../actions/Types';

export function getTopicList(data){
    return {
        type: types.GET_TOPICS,
        data
    };
}
