import axios from "axios";
import { useStateValue } from "../StateManager/StateProvider";

const BASE_URL = "http://localhost:8080"

const getToken = () => {
    return localStorage.getItem("token")
}

export const LoginAPI = ({username, password}) => {
    return axios.post(
        `${BASE_URL}/login`, 
        {username: username, password: password},
    );
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
    return axios.get(
        `${BASE_URL}/movies`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const filterMoviesAPI = (searchKey, searchBy, sortBy) => {
    let data = {
        searchText: searchKey,
        searchBy: searchBy,
        sortBy: sortBy
    }
    return axios.post(
        `${BASE_URL}/movies`, 
        data,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const getMoiveByIdAPI = (id) => {
    return axios.get(
        `${BASE_URL}/movies/${id}`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const getMovieActorsAPI = (id) => {
    return axios.get(
        `${BASE_URL}/movies/${id}/actors`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const getMovieCommentsAPI = (id) => {
    return axios.get(
        `${BASE_URL}/movies/${id}/comments`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    );
}

export const getWatchlistAPI = () => {
    return axios.get(
        `${BASE_URL}/watchlist`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    );
}

export const addToWatchlistAPI = (id) => {
    return axios.post(
        `${BASE_URL}/watchlist`, 
        {movie_id: id},
        {headers: {Authorization: `Bearer ${getToken()}`}}
    );
}

export const addCommentAPI = (id, comment) => {
    return axios.post(
        `${BASE_URL}/movies/${id}/comments`, 
        {comment: comment},
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const likeCommentAPI = (id) => {
    return axios.post(
        `${BASE_URL}/comments/${id}/like`,
        {}, 
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const dislikeCommentAPI = (id) => {
    return axios.post(
        `${BASE_URL}/comments/${id}/dislike`,
        {}, 
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const getActorAPI = (id) => {
    return axios.get(
        `${BASE_URL}/actors/${id}`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const getActorMoviesAPI = (id) => {
    return axios.get(
        `${BASE_URL}/actors/${id}/movies`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const getRecommendationsAPI = () => {
    return axios.get(
        `${BASE_URL}/recommendations`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const removeFromWatchlistAPI = (id) => {
    return axios.post(
        `${BASE_URL}/watchlist/remove`, {movie_id: id},
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const rateMovieAPI = (id, rate) => {
    return axios.post(
        `${BASE_URL}/movies/${id}/rate`, {quantity: rate},
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}

export const callbackAPI = (code) => {
    const params = new URLSearchParams([['code', code]]);
    return axios.get(`${BASE_URL}/callback`, { params })
}

export const getUserAPI = () => {
    return axios.get(
        `${BASE_URL}/user`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}