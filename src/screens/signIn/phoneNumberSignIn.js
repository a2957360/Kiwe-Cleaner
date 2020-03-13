import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';

import { Overlay, CheckBox } from 'react-native-elements';

import KeyboardListener from 'react-native-keyboard-listener';

import { globalStyles } from '../../styles/globalStyles';

import { Formik } from 'formik';
import * as yup from 'yup';

import { getVerificationCodeData, checkVerificationCodeData } from '../../actions/signIn';

import Spinner from 'react-native-loading-spinner-overlay';

import { AntDesign } from '@expo/vector-icons';

import { screenWidth } from '../../variables/appVariables';

class PhoneNumberSignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollEnabled: false,
			loadingSpinner: false,
			loginSuccessOverlayVisible: false,
			loginFailOverlayVisible: false,
			timerStart: false,
			seconds: 0,
		};
	}

	componentDidMount = () => {};

	componentDidUpdate = prevProps => {
		if (prevProps.loading !== this.props.loading && this.props.loading === false) {
			this.setState({ loadingSpinner: false });
		}

		if (
			prevProps.userSignInMessage !== this.props.userSignInMessage &&
			this.props.userSignInMessage === 'success'
		) {
			if (this.props.userSignInData.userState === '3') {
				this.setState({ loginSuccessOverlayVisible: true });
			}

			if (this.props.userSignInData.userState === '0') {
				this.props.navigation.navigate('WaitForVerification');
			}
		}

		if (
			prevProps.userSignInMessage !== this.props.userSignInMessage &&
			this.props.userSignInMessage === 'verificationCode wrong'
		) {
			this.setState({ loginFailOverlayVisible: true });
		}
	};

	getVerificationCode = userPhone => {
		this.countTime();
		this.setState({ timerStart: true }),
			() =>
				this.props.getVerificationCode({
					userPhone: userPhone,
					userRole: '1',
				});
	};

	onLogin = values => {
		this.setState({ loadingSpinner: true }, () => {
			this.props.checkVerificationCode(values);
		});
	};

	navigateToCleanerApplicationForm = () => {
		this.setState({ loginSuccessOverlayVisible: false }, () => {
			this.props.navigation.navigate('CleanerApplicationForm');
		});
	};

	countTime() {
		this.setState({ seconds: 60 });
		this.timer = setInterval(() => {
			let currentTime = this.state.seconds; //获取秒
			if (currentTime > 1) {
				//如果秒大于0，则执行减1
				currentTime--;
				this.setState({ seconds: currentTime }); //更改秒的状态
			} else if (currentTime === 1) {
				this.timer && clearInterval(this.timer);
				this.setState({ timerStart: false });
			}
		}, 1000);
	}

	render() {
		let loginSuccessOverlay;
		let loginFailOverlay;

		loginSuccessOverlay = (
			<Overlay
				width={300}
				height={400}
				overlayStyle={{
					borderRadius: 25,
				}}
				isVisible={this.state.loginSuccessOverlayVisible}
			>
				<View style={styles.overlayContainer}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<AntDesign
							name="checkcircleo"
							color="#FFCC34"
							size={120}
							style={{ marginTop: 45, marginBottom: 25 }}
						/>
						<Text style={styles.overlayTitleStyle}>登录成功</Text>
					</View>

					<View style={{ marginBottom: 20 }}>
						<TouchableOpacity onPress={() => this.navigateToCleanerApplicationForm()}>
							<View style={globalStyles.yellowMediumButton}>
								<Text style={globalStyles.blackButtonText}>完善信息</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Overlay>
		);

		loginFailOverlay = (
			<Overlay
				width={300}
				height={400}
				overlayStyle={{
					borderRadius: 25,
				}}
				isVisible={this.state.loginFailOverlayVisible}
			>
				<View style={styles.overlayContainer}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<AntDesign
							name="exclamationcircleo"
							color="#FF2020"
							size={120}
							style={{ marginTop: 45, marginBottom: 25 }}
						/>
						<Text style={styles.overlayTitleStyle}>登录失败，请重新输入</Text>
					</View>

					<View style={{ marginBottom: 20 }}>
						<TouchableOpacity onPress={() => this.setState({ loginFailOverlayVisible: false })}>
							<View style={globalStyles.redMediumButton}>
								<Text style={globalStyles.blackButtonText}>确认</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Overlay>
		);

		return (
			<ScrollView
				style={globalStyles.whiteBackgroundContainer}
				scrollEnabled={this.state.scrollEnabled}
				keyboardDismissMode="on-drag"
			>
				<Spinner visible={this.state.loadingSpinner} />

				{loginSuccessOverlay}

				{loginFailOverlay}

				<KeyboardListener
					onWillShow={() => {
						setTimeout(() => {
							this.setState({ scrollEnabled: true });
						}, 500);
					}}
					onWillHide={() => {
						setTimeout(() => {
							this.setState({ scrollEnabled: false });
						}, 500);
					}}
				/>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>手机验证</Text>
				</View>
				<Formik
					initialValues={{
						userRole: '1',
						userPhone: '',
						verificationCode: '',
					}}
					onSubmit={values => {
						this.onLogin(values);
					}}
				>
					{props => (
						<View>
							<TextInput
								style={styles.phoneInput}
								placeholder="输入手机号码"
								keyboardType="number-pad"
								onChangeText={props.handleChange('userPhone')}
								onBlur={props.handleBlur('userPhone')}
								value={props.values.userPhone}
							/>

							<View
								style={{
									flexDirection: 'row',
									alignContent: 'space-between',
									marginHorizontal: 0.1 * screenWidth,
									width: 0.8 * screenWidth,
									borderBottomWidth: 1,
									borderBottomColor: '#EAEAEA',
								}}
							>
								<TextInput
									style={styles.codeInput}
									placeholder="输入验证码"
									keyboardType="number-pad"
									onChangeText={props.handleChange('verificationCode')}
									onBlur={props.handleBlur('verificationCode')}
									value={props.values.verificationCode}
								/>

								<TouchableOpacity
									disabled={this.state.timerStart}
									style={{ right: 5, justifyContent: 'center', alignItems: 'flex-end' }}
									onPress={() => this.getVerificationCode(props.values.userPhone)}
								>
									<View style={styles.sendCodeButtonContainer}>
										<Text style={styles.sendCodeButtonText}>
											{this.state.timerStart ? this.state.seconds + `s` : '发送'}
										</Text>
									</View>
								</TouchableOpacity>
							</View>

							<View style={styles.policyCheckContainer}>
								<CheckBox
									containerStyle={{
										backgroundColor: '#ffffff',
										borderWidth: 0,
										paddingTop: 2,
										paddingBottom: 0,
										paddingHorizontal: 0,
										marginHorizontal: 0,
										justifyContent: 'center',
										alignItems: 'center',
									}}
									checked={this.state.policyChecked}
									onPress={() => this.setState({ policyChecked: !this.state.policyChecked })}
									checkedColor="#65A3FF"
								/>
								<View>
									<Text style={styles.blackText}>已阅读并同意</Text>
								</View>

								<TouchableOpacity onPress={() => this.props.navigation.navigate('ServicePolicy')}>
									<View>
										<Text style={styles.blueText}>服务条款和隐私政策</Text>
									</View>
								</TouchableOpacity>
							</View>

							<View style={styles.bottomButtonContainer}>
								<TouchableOpacity disabled={!this.state.policyChecked} onPress={props.handleSubmit}>
									<View
										style={
											this.state.policyChecked === true
												? globalStyles.blueLargeButton
												: globalStyles.lightGreyLargeButton
										}
									>
										<Text
											style={
												this.state.policyChecked === true
													? globalStyles.whiteButtonText
													: globalStyles.whiteButtonText
											}
										>
											登录
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
			</ScrollView>
		);
	}
}

function mapStateToProps({ signInData }) {
	const { loading, userSignInMessage, userSignInData } = signInData;
	return { loading, userSignInMessage, userSignInData };
}

function mapDispatchToProps(dispatch) {
	return {
		getVerificationCode: data => {
			dispatch(getVerificationCodeData(data));
		},
		checkVerificationCode: data => {
			dispatch(checkVerificationCodeData(data));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberSignIn);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		color: '#292929',
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 90,
		marginBottom: 50,
	},
	overlayContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	overlayTitleStyle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	phoneInput: {
		borderBottomWidth: 1,
		borderColor: '#EAEAEA',
		fontSize: 16,
		paddingVertical: 15,
		marginTop: 10,
		marginHorizontal: 0.1 * screenWidth,
	},
	codeInput: {
		flex: 1,
		borderBottomWidth: 0,
		borderColor: '#EAEAEA',
		fontSize: 16,
		paddingVertical: 15,
		marginTop: 10,
	},
	sendCodeButtonContainer: {
		backgroundColor: '#65A3FF',
		width: 65,
		height: 32,
		borderRadius: 16,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sendCodeButtonText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 12,
	},
	policyCheckContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 15,
		paddingBottom: 25,
	},
	blackText: {
		fontSize: 12,
		color: '#6C6C6C',
		fontWeight: '400',
	},
	blueText: {
		fontSize: 12,
		color: '#65A3FF',
		fontWeight: '400',
	},
	bottomButtonContainer: {
		backgroundColor: '#ffffff',
		height: '10%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
