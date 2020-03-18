import {
    FETCH_DATA_START,
    GET_TASK_TYPE_LIST_SUCCESS,
    GET_TASK_POOL_SUCCESS,
    GET_USER_INCOMPLETED_TASK_SUCCESS,
    GET_USER_COMPLETED_TASK_SUCCESS,
    GET_TASK_DETAIL_SUCCESS,
    CHANGE_TASK_STATE_SUCCESS,
    CREATE_NEW_TASK_SUCCESS,
    UPLOAD_MULTIPLE_IMAGES_SUCCESS
} from '../constants/actionTypes';
import { MainDomain } from '../variables/appVariables';
import axios from 'axios';

//获取任务类型列表
export const getTaskTypeListData = () => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .get(MainDomain + `getTypelist.php`)
            .then(res => {
                dispatch({ type: GET_TASK_TYPE_LIST_SUCCESS, payload: res.data });
            })
    };
};

//获取所有任务列表
export const getTaskPoolData = (data) => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .get(MainDomain + 'orderModule.php' + `?orderState=${data.orderState}`)
            .then(res => {
                dispatch({ type: GET_TASK_POOL_SUCCESS, payload: res.data });
            })
    };
};
//获取未完成任务列表
export const getIncompletedTaskData = (data) => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .get(MainDomain + 'orderModule.php' + `?cleanerId=${data.cleanerId}&orderState=${data.orderState}`)
            .then(res => {
                dispatch({ type: GET_USER_INCOMPLETED_TASK_SUCCESS, payload: res.data });
            })
    };
};

//获取已完成任务列表
export const getCompletedTaskData = (data) => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .get(MainDomain + 'orderModule.php' + `?cleanerId=${data.cleanerId}&orderState=${data.orderState}`)
            .then(res => {
                dispatch({ type: GET_USER_COMPLETED_TASK_SUCCESS, payload: res.data });
            })
    };
};

//获取任务详情
export const getTaskDetailData = (data) => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .get(MainDomain + 'orderModule.php' + `?orderId=${data.orderId}`)
            .then(res => {
                dispatch({ type: GET_TASK_DETAIL_SUCCESS, payload: res.data });
            })
    };
};

//修改任务状态
export const changeTaskStateData = (data) => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .post(MainDomain + 'changeOrderState.php', data, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                dispatch({ type: CHANGE_TASK_STATE_SUCCESS, payload: res.data });
            })
    };
};

//添加一个新的任务
export const createNewTaskData = (data) => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .post(MainDomain + 'orderModule.php', data, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                dispatch({ type: CREATE_NEW_TASK_SUCCESS, payload: res.data });
            })
    };
}

//上传多张照片
export const uploadMultipleImagesData = (data) => {
    return dispatch => {
        dispatch({ type: FETCH_DATA_START });
        axios
            .post(MainDomain + `uploadMutiPic.php`, data, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                dispatch({ type: UPLOAD_MULTIPLE_IMAGES_SUCCESS, payload: res.data });
            })
    };
};
