import {
    FETCH_DATA_START,
    UPDATE_DATA_START,
    CHANGE_USER_PHONE_SUCCESS,
    GET_USER_INFO_SUCCESS,
    UPLOAD_USER_IMAGE_SUCCESS,
    GET_USER_ADDRESS_SUCCESS,
    POST_USER_ADDRESS_SUCCESS,
    SUBMIT_USER_INFO_SUCCESS
} from '../constants/actionTypes';

const INIT_STATE = {
    loading: false,
    updating: false,
    message: null,
    userUploadImageMessage: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA_START: {
            return {
                ...state,
                loading: true,
                updating: true,
                message: null,
                userUploadImageMessage: null
            };
        }

        case UPDATE_DATA_START: {
            return {
                ...state,
                updating: true,
            };
        }

        case GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                userInfoData: action.payload
            }
        }

        case UPLOAD_USER_IMAGE_SUCCESS: {
            return {
                ...state,
                loading: false,
                updating: false,
            }
        }

        case CHANGE_USER_PHONE_SUCCESS: {
            return {
                ...state,
                loading: false,
                updating: false,
                message: action.payload.message,
            };
        }

        case SUBMIT_USER_INFO_SUCCESS: {
            return {
                ...state,
                loading: false,
                updating: false,
                message: action.payload.message
            }
        }

        case GET_USER_ADDRESS_SUCCESS: {
            return {
                ...state,
                userAddressData: action.payload
            }
        }

        case POST_USER_ADDRESS_SUCCESS: {
            return {
                ...state,
                updating: false,
            }
        }

        default:
            return state;
    }
};
