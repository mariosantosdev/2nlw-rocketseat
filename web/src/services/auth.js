import axios from 'axios';

const keyItemStorage = '@prof/auth'

export const Login = (token, type = 'session') => {
    if(type === 'local'){
        localStorage.setItem(keyItemStorage, token)
    }else{
        sessionStorage.setItem(keyItemStorage, token)
    }

    axios.defaults.headers.common['Authorization'] = token
}

export const Logout = () => {
    if(localStorage.getItem(keyItemStorage)) localStorage.removeItem(keyItemStorage)
    if(sessionStorage.getItem(keyItemStorage)) sessionStorage.removeItem(keyItemStorage)
}

export const IsLogin = () => {
    if(localStorage.getItem(keyItemStorage)) return true
    if(sessionStorage.getItem(keyItemStorage)) return true
    return false
}