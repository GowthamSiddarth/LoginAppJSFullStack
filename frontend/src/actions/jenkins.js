import axios from 'axios';
import { GET_ERRORS, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './types';

export const getJenkinsJobs = () => dispatch => {
    axios.get('/api/jenkins/jobs')
        .then(res => {
            dispatch({
                type: res.data.success ? FETCH_DATA_SUCCESS : FETCH_DATA_FAILURE,
                payload: res.data.message,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}