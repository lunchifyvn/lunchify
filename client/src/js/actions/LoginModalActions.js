import * as types from '../actions/Types';

export function closeLoginModal()
{
    return {
        type: types.CLOSE_LOGIN,
        isOpenLogin: false
    }
}

export function login()
{
    return {
        type: types.LOGIN,
        isLogedIn: true
    }
}
