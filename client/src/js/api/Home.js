import store from '../store';
import {getHomeTitle} from '../actions/HomeActions';

/**
 * Get all users
 */
export function getTitle() {
    //  call ajax here
    let response = "Home title sample";
    store.dispatch(getHomeTitle(response));
    return response;
}
