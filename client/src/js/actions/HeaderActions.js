import * as types from '../actions/Types';

export function getUserInfo(title){
    return {
        type: types.GET_USER_INFO,
        user: {}
    };
}

export function openLoginModal(){
    return {
        type: types.OPEN_LOGIN,
        isOpenLogin: true
    }
}

export function closeLoginModal(){
    return {
        type: types.CLOSE_LOGIN,
        isOpenLogin: false
    }
}

export function requestLogin(){
    return {
        type: types.LOGIN,
        user: {}
    }
}

export function login(){
    return {
        type: types.LOGIN,
        isLogedIn: true
    }
}

export function logout(){
    return {
        type: types.LOGOUT,
        isLogedIn: false
    }
}
