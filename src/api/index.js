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

export const filterMoviesAPI = (searchKey, searchBy, sortBy) => {
    let data = {
        searchText: searchKey,
        searchBy: searchBy,
        sortBy: sortBy
    }
    return axios.post(`${BASE_URL}/movies`, data)
}

export const getMoiveByIdAPI = (id) => {
    return axios.get(`${BASE_URL}/movies/${id}`)
}

export const getMovieActorsAPI = (id) => {
    return axios.get(`${BASE_URL}/movies/${id}/actors`)
}

export const getMovieCommentsAPI = (id) => {
    return axios.get(`${BASE_URL}/movies/${id}/comments`);
}

export const getWatchlistAPI = () => {
    return axios.get(`${BASE_URL}/watchlist`);
}

export const addToWatchlistAPI = (id) => {
    return axios.post(`${BASE_URL}/watchlist`, {movie_id: id})
}

export const addCommentAPI = (id, comment) => {
    return axios.post(`${BASE_URL}/movies/${id}/comments`, {comment: comment})
}

export const likeCommentAPI = (id) => {
    return axios.post(`${BASE_URL}/comments/${id}/like`)
}

export const dislikeCommentAPI = (id) => {
    return axios.post(`${BASE_URL}/comments/${id}/dislike`)
}

export const getActorAPI = (id) => {
    return axios.get(`${BASE_URL}/actors/${id}`)
}

export const getActorMoviesAPI = (id) => {
    return axios.get(`${BASE_URL}/actors/${id}/movies`)
}

export const getRecommendationsAPI = () => {
    return axios.get(`${BASE_URL}/recommendations`)
}

export const removeFromWatchlistAPI = (id) => {
    return axios.post(`${BASE_URL}/watchlist/remove`, {movie_id: id})
}