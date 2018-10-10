import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                exists: action.payload.exists
            };
        default: return { ...state }
    }
}