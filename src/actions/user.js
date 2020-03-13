import {
	FETCH_DATA_START,
	UPDATE_DATA_START,
	GET_USER_INFO_SUCCESS,
    UPLOAD_USER_IMAGE_SUCCESS,
    SUBMIT_APPLICATION_FORM_SUCCESS,
	GET_USER_ADDRESS_SUCCESS,
	POST_USER_ADDRESS_SUCCESS,
} from '../constants/actionTypes';
import { MainDomain } from '../variables/appVariables';
import axios from 'axios';

//获取用户个人信息
export const getUserInfoData = userId => {
	return dispatch => {
		axios.get(MainDomain + `getUserInfo.php` + `?userId=${userId}`).then(res => {
			dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data });
		});
	};
};

//用户上传头像
export const uploadUserImageData = data => {
	return dispatch => {
		dispatch({ type: UPDATE_DATA_START });
		axios
			.post(MainDomain + `uploadUserImage.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: UPLOAD_USER_IMAGE_SUCCESS, payload: res.data });
			});
	};
};

export const submitApplicationFormData = data => {
	return dispatch => {
		dispatch({ type: UPDATE_DATA_START });
		axios
			.post(MainDomain + `fillUserInfo.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: SUBMIT_APPLICATION_FORM_SUCCESS, payload: res.data });
			});
	};
};

//获取用户地址信息
export const getUserAddressData = userId => {
	return dispatch => {
		axios.get(MainDomain + `addressModule.php` + `?userId=${userId}`).then(res => {
			dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: res.data });
		});
	};
};

//添加用户地址信息
export const postUserAddressData = data => {
	return dispatch => {
		dispatch({ type: UPDATE_DATA_START });
		axios
			.post(MainDomain + `addressModule.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: POST_USER_ADDRESS_SUCCESS, payload: res.data });
			});
	};
};
