import {
    FETCH_DATA_START,
    GET_VERIFICATION_CODE_SUCCESS,
    CHECK_VERIFICATION_CODE_SUCCESS,
    USER_SIGN_OUT_SUCCESS
} from '../constants/actionTypes';

const INIT_STATE = {
    loading: false,
    updating: false,
    message: null,
    userSignInMessage: null,
    userSignOutMessage: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA_START: {
            return {
                ...state,
                loading: true,
                updating: true,
                message: null,
                userSignInMessage: null,
                userSignOutMessage: null,
            };
        }

        case GET_VERIFICATION_CODE_SUCCESS: {
            return {
                ...state,
            };
        }

        case CHECK_VERIFICATION_CODE_SUCCESS: {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                userSignInMessage: action.payload.message,
                userSignInData: action.payload.data
            };
        }

        case USER_SIGN_OUT_SUCCESS: {
            return {
                ...state,
                userSignOutMessage: 'success',
            }
        }

        default:
            return state;
    }
};
