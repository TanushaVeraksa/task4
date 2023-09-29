import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async(email, name, password) => {
    const {data} = await $host.post('api/user/registration', {email, name, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const login = async(email, password) => {
    const {data} = await $host.post('api/user/login', {email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const check = async() => {
    try {
        const {data} = await $authHost.get('api/user/autorization')
        console.log(data)
        console.log(jwt_decode(data.token))
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token);
    } catch(e) {
        console.log(e)
    }
}

export const isBlock = async(id) => {
    const {data} = await $host.post('api/user/block', {id})
    return data;
}