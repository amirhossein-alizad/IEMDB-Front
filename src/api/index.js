import axios from "axios";

const BASE_URL = "http://localhost:8080"

export const LoginAPI = ({username, password}) => {
    return axios.post(`${BASE_URL}/login`, {username: username, password: password});
}

export const SignupAPI = ({email, password, name, nickname, birthDate}) => {
    let data = {
        email: email,
        password: password,
        name: name, 
        nickname: nickname,
        birthDate: birthDate
    }
    return axios.post(`${BASE_URL}/signup`, data)
}

export const getMoviesAPI = () => {
    return axios.get(`${BASE_URL}/movies`)
}