import store from '../store';
import {getHomeTitle} from '../actions/HomeActions';

/**
 * Get all users
 */
export function login() {
    //  call ajax here
    let response = {isLogedin: true};

    store.dispatch(getHomeTitle(response));
    return response;
}
