import store from '../store';
import {getHomeTitle} from '../actions/HomeActions';

/**
 * Get all users
 */
export function getTopics() {
    //  call ajax here
    let response = "list topics";
    store.dispatch(getTopicList(response));
    return response;
}
