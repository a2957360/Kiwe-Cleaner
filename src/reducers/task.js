import {
	FETCH_DATA_START,
	UPDATE_DATA_START,
	GET_TASK_TYPE_LIST_SUCCESS,
	GET_TASK_POOL_SUCCESS,
	GET_USER_INCOMPLETED_TASK_SUCCESS,
	GET_USER_COMPLETED_TASK_SUCCESS,
	GET_TASK_DETAIL_SUCCESS,
	CHANGE_TASK_STATE_SUCCESS,
	CREATE_NEW_TASK_SUCCESS,
	UPLOAD_MULTIPLE_IMAGES_SUCCESS,
} from '../constants/actionTypes';

const INIT_STATE = {
	loading: false,
	updating: false,
	createTaskMessage: null,
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case UPDATE_DATA_START: {
			return {
				...state,
				updating: true,
			};
		}

		case FETCH_DATA_START: {
			return {
				...state,
				loading: true,
				createTaskMessage: null,
			};
		}

		case GET_TASK_TYPE_LIST_SUCCESS: {
			return {
				...state,
				loading: false,
				taskTypeList: action.payload,
			};
		}

		case GET_TASK_POOL_SUCCESS: {
			return {
				...state,
				loading: false,
				taskPoolList: action.payload,
			};
		}
		case GET_USER_INCOMPLETED_TASK_SUCCESS: {
			return {
				...state,
				loading: false,
				incompletedTaskData: action.payload,
			};
		}

		case GET_USER_COMPLETED_TASK_SUCCESS: {
			return {
				...state,
				loading: false,
				completedTaskData: action.payload,
			};
		}

		case GET_TASK_DETAIL_SUCCESS: {
			return {
				...state,
				loading: false,
				taskDetailData: action.payload,
			};
		}

		case CHANGE_TASK_STATE_SUCCESS: {
			return {
				...state,
				loading: false,
                updating: false,
                message: action.payload.message,
			};
		}

		case CREATE_NEW_TASK_SUCCESS: {
			return {
				...state,
				loading: false,
				createTaskMessage: action.payload.message,
				newTaskData: action.payload.data,
			};
		}

		case UPLOAD_MULTIPLE_IMAGES_SUCCESS: {
            return {
                ...state,
                loading: false,
                updating: false,
            }
        }

		default:
			return state;
	}
};
