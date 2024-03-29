import {
	FETCH_DATA_START,
	CHANGE_USER_PHONE_SUCCESS,
	GET_USER_INFO_SUCCESS,
	UPLOAD_USER_IMAGE_SUCCESS,
	GET_USER_ADDRESS_SUCCESS,
	POST_USER_ADDRESS_SUCCESS,
	SUBMIT_USER_INFO_SUCCESS
} from '../constants/actionTypes';
import { MainDomain } from '../variables/appVariables';
import axios from 'axios';

//获取用户个人信息
export const getUserInfoData = userId => {
	return dispatch => {
		dispatch({ type: FETCH_DATA_START });
		axios.get(MainDomain + `getUserInfo.php` + `?userId=${userId}`).then(res => {
			dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data });
		});
	};
};

//用户上传头像
export const uploadUserImageData = data => {
	return dispatch => {
		dispatch({ type: FETCH_DATA_START });
		axios
			.post(MainDomain + `uploadUserImage.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: UPLOAD_USER_IMAGE_SUCCESS, payload: res.data });
			});
	};
};

//用户更改个人信息（姓名）
export const submitUserInfoData = data => {
	return dispatch => {
		dispatch({ type: FETCH_DATA_START });
		axios
			.post(MainDomain + `fillUserInfo.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: SUBMIT_USER_INFO_SUCCESS, payload: res.data });
			});
	};
};

//修改手机
export const changeUserPhoneData = (data) => {
	return dispatch => {
		dispatch({ type: FETCH_DATA_START });
		axios
			.post(MainDomain + `changePhone.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: CHANGE_USER_PHONE_SUCCESS, payload: res.data });
			})
	};
};

//获取用户地址信息
export const getUserAddressData = userId => {
	return dispatch => {
		dispatch({ type: FETCH_DATA_START });
		axios.get(MainDomain + `addressModule.php` + `?userId=${userId}`).then(res => {
			dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: res.data });
		});
	};
};

//添加用户地址信息
export const postUserAddressData = data => {
	return dispatch => {
        dispatch({ type: FETCH_DATA_START });
		axios
			.post(MainDomain + `addressModule.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: POST_USER_ADDRESS_SUCCESS, payload: res.data });
			});
	};
};
