import axios from 'axios';

const keyTokenStorage = '@prof/auth_token'

export const Login = (token, type = 'session') => {
    if (type === 'local') {
        localStorage.setItem(keyTokenStorage, token)
    } else {
        sessionStorage.setItem(keyTokenStorage, token)
    }

    axios.defaults.headers.common['Authorization'] = token
}

export const Logout = () => {
    if (localStorage.getItem(keyTokenStorage)) {
        localStorage.removeItem('user')
        localStorage.removeItem(keyTokenStorage)
    }

    if (sessionStorage.getItem(keyTokenStorage)) {
        localStorage.removeItem('user')
        sessionStorage.removeItem(keyTokenStorage)
    }
}

export const IsLogin = () => {
    if (localStorage.getItem(keyTokenStorage)) return true
    if (sessionStorage.getItem(keyTokenStorage)) return true
    return false
}