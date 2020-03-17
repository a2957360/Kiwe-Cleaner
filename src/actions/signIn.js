import {
	FETCH_DATA_START,
	UPDATE_DATA_START,
	GET_VERIFICATION_CODE_SUCCESS,
	CHECK_VERIFICATION_CODE_SUCCESS,
	USER_SIGN_OUT_SUCCESS,
} from '../constants/actionTypes';
import { MainDomain } from '../variables/appVariables';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//发送验证码
export const getVerificationCodeData = data => {
    console.log(data)
	return dispatch => {
		axios
			.post(MainDomain + `getVerificationCode.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
                console.log(res)
				dispatch({ type: GET_VERIFICATION_CODE_SUCCESS });
			});
	};
};

//发送验证码
export const checkVerificationCodeData = data => {
	return dispatch => {
		dispatch({ type: FETCH_DATA_START });
		axios
			.post(MainDomain + `checkVerificationCode.php`, data, { headers: { 'Content-Type': 'application/json' } })
			.then(res => {
				dispatch({ type: CHECK_VERIFICATION_CODE_SUCCESS, payload: res.data });
			});
	};
};

//用户登出
export const userSignOutData = () => {
	return dispatch => {
		dispatch({ type: FETCH_DATA_START });
		dispatch({ type: USER_SIGN_OUT_SUCCESS });
	};
};
