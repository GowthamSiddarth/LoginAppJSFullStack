import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwtDecode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const loginUser = (user, history) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            const { token, name } = res.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('name', name);
            setAuthToken(token);
            const decoded = jwtDecode(token);
            dispatch(setCurrentUser(decoded));            
            history.push('/home');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('name');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}