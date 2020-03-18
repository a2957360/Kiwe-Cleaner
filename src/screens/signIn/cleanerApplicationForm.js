import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Overlay, CheckBox } from 'react-native-elements';

import { globalStyles } from '../../styles/globalStyles';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

import { Formik } from 'formik';
import * as yup from 'yup';

import { AntDesign } from '@expo/vector-icons';

import { uploadUserImageData, submitUserInfoData } from '../../actions/user';

import ActionSheet from 'react-native-actionsheet';

class CleanerApplicationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filesData: [],
			imageSide: null,
			frontSideImage: null,
			backSideImage: null,
			submitSuccessOverlayVisible: false,
			submitFailOverlayVisible: false,
		};
	}

	componentDidUpdate = prevProps => {
		if (prevProps.message !== this.props.message && this.props.message === 'success') {
			this.setState({ submitSuccessOverlayVisible: true });
		}
	};

	getCameraPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);

			if (status !== 'granted') {
				alert('抱歉！此功能需要权限！请在设置中修改！');
			}
		}
	};

	getImageLibraryPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

			if (status !== 'granted') {
				alert('抱歉！此功能需要权限！请在设置中修改！');
			}
		}
	};

	openCameraAsync = async () => {
		this.getCameraPermissionAsync();

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});

		if (!result.cancelled) {
			{
				this.state.imageSide === 'front'
					? this.setState({ frontSideImage: result.uri })
					: this.setState({ backSideImage: result.uri });
			}
		}
	};

	openImagePickerAsync = async () => {
		this.getImageLibraryPermissionAsync();

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});

		if (!result.cancelled) {
			{
				this.state.imageSide === 'front'
					? this.setState({ frontSideImage: result.uri })
					: this.setState({ backSideImage: result.uri });
			}
		}
	};

	showActionSheet = side => {
		this.setState({ imageSide: side }, () => {
			this.ActionSheet.show();
		});
	};

	handleActionSheet = index => {
		switch (index) {
			case 0:
				this.openCameraAsync();
				break;
			case 1:
				this.openImagePickerAsync();
				break;
			default:
				break;
		}
	};

	submitApplicationForm = async values => {
		let multipleImagesData = new FormData();

		multipleImagesData.append('userId', values.userId);

		multipleImagesData.append('userLicenseFont', {
			uri: this.state.frontSideImage,
			type: 'image/jpeg',
			name: 'userImage',
		});

		multipleImagesData.append('userLicenseBack', {
			uri: this.state.backSideImage,
			type: 'image/jpeg',
			name: 'userImage',
		});

		this.props.uploadUserImage(multipleImagesData);

		this.props.submitApplicationForm(values);
	};

	render() {
		let userId;

		let submitSuccessOverlay;
		let submitFailOverlay;

		submitSuccessOverlay = (
			<Overlay
				width={300}
				height={400}
				overlayStyle={{
					borderRadius: 25,
				}}
				isVisible={this.state.submitSuccessOverlayVisible}
			>
				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<AntDesign
							name="checkcircleo"
							color="#FFCC34"
							size={120}
							style={{ marginTop: 45, marginBottom: 25 }}
						/>
						<Text style={styles.overlayTitleStyle}>提交成功</Text>
					</View>

					<View style={{ marginBottom: 20 }}>
						<TouchableOpacity
							onPress={() =>
								this.setState({ submitSuccessOverlayVisible: false }, () => {
									this.props.navigation.goBack();
								})
							}
						>
							<View style={globalStyles.yellowMediumButton}>
								<Text style={globalStyles.blackButtonText}>返回登录</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Overlay>
		);

		submitFailOverlay = (
			<Overlay
				width={300}
				height={400}
				overlayStyle={{
					borderRadius: 25,
				}}
				isVisible={this.state.submitFailOverlayVisible}
			>
				<View style={styles.overlayContainer}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<AntDesign
							name="exclamationcircleo"
							color="#FF2020"
							size={120}
							style={{ marginTop: 45, marginBottom: 25 }}
						/>
						<Text style={styles.overlayTitleStyle}>提交失败，请检查内容</Text>
					</View>

					<View style={{ marginBottom: 20 }}>
						<TouchableOpacity onPress={() => this.setState({ submitFailOverlayVisible: false })}>
							<View style={globalStyles.redMediumButton}>
								<Text style={globalStyles.blackButtonText}>确认</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Overlay>
		);

		if (this.props.userSignInData !== undefined) {
			userId = this.props.userSignInData.userId;
		}

		return (
			<View style={globalStyles.whiteBackgroundContainer}>
				{submitSuccessOverlay}
				{submitFailOverlay}
				<Formik
					initialValues={{
						userId: userId,
						userName: '',
						userEmail: '',
						userPhone: '',
						userGender: '',
					}}
					onSubmit={values => {
						this.submitApplicationForm(values);
					}}
				>
					{props => (
						<View style={globalStyles.container}>
							<KeyboardAwareScrollView keyboardDismissMode="on-drag" extraScrollHeight={30}>
								<ScrollView
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									style={{
										backgroundColor: '#F2F2F2',
										height: 35,
										paddingLeft: 20,
									}}
								>
									<View style={{ justifyContent: 'center', marginRight: 40 }}>
										<Text style={{ color: '#6C6C6C', fontSize: 12 }}>
											请填写您的真实信息，提供的信息我们将作为发票凭证，请谨慎，不能修改
										</Text>
									</View>
								</ScrollView>

								<TextInput
									style={styles.titleInput}
									placeholder="姓名"
									onChangeText={props.handleChange('userName')}
									onBlur={props.handleBlur('userName')}
									value={props.values.userName}
								/>

								<TextInput
									style={styles.textInput}
									placeholder="邮箱"
									onChangeText={props.handleChange('userEmail')}
									onBlur={props.handleBlur('userEmail')}
									value={props.values.userEmail}
								/>

								<TextInput
									style={styles.textInput}
									placeholder="电话"
									onChangeText={props.handleChange('userPhone')}
									onBlur={props.handleBlur('userPhone')}
									value={props.values.userPhone}
								/>

								<TextInput
									style={[styles.textInput, { borderBottomWidth: 0 }]}
									placeholder="性别"
									onChangeText={props.handleChange('userGender')}
									onBlur={props.handleBlur('userGender')}
									value={props.values.userGender}
								/>

								<View
									style={{
										backgroundColor: '#F2F2F2',
										height: 35,
										justifyContent: 'center',
										paddingLeft: 20,
									}}
								>
									<Text style={{ color: '#6C6C6C', fontSize: 12 }}>
										请上传真实的证件照，格式、大小
									</Text>
								</View>

								<View
									style={{
										flexDirection: 'row',
										marginHorizontal: 7.5,
										marginTop: 15,
									}}
								>
									<View style={{ flex: 1, paddingHorizontal: 7.5 }}>
										<TouchableOpacity onPress={() => this.showActionSheet('front')}>
											<View style={styles.uploadImageContainer}>
												{this.state.frontSideImage === null ? (
													<AntDesign name="plus" color="#A0A0A0" size={25} />
												) : (
													<Image
														style={{ width: '100%', height: '100%', borderRadius: 5 }}
														source={{ uri: this.state.frontSideImage }}
													/>
												)}
											</View>
										</TouchableOpacity>

										<View style={styles.uploadImageTextContainer}>
											<Text style={styles.uploadImageText}>证件正面</Text>
										</View>
									</View>

									<View style={{ flex: 1, paddingHorizontal: 7.5 }}>
										<TouchableOpacity onPress={() => this.showActionSheet('back')}>
											<View style={styles.uploadImageContainer}>
												{this.state.backSideImage === null ? (
													<AntDesign name="plus" color="#A0A0A0" size={25} />
												) : (
													<Image
														style={{ width: '100%', height: '100%', borderRadius: 5 }}
														source={{ uri: this.state.backSideImage }}
													/>
												)}
											</View>
										</TouchableOpacity>

										<View style={styles.uploadImageTextContainer}>
											<Text style={styles.uploadImageText}>证件反面</Text>
										</View>
									</View>
								</View>
							</KeyboardAwareScrollView>

							<View style={styles.policyCheckContainer}>
								<CheckBox
									containerStyle={{
										borderWidth: 0,
										paddingTop: 2,
										paddingBottom: 0,
										paddingHorizontal: 0,
										marginHorizontal: 0,
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

							<View style={globalStyles.bottomSingleButtonContainer}>
								<TouchableOpacity disabled={!this.state.policyChecked} onPress={props.handleSubmit}>
									<View
										style={
											this.state.policyChecked === true
												? globalStyles.yellowLargeButton
												: globalStyles.lightGreyLargeButton
										}
									>
										<Text
											style={
												this.state.policyChecked === true
													? globalStyles.blackButtonText
													: globalStyles.whiteButtonText
											}
										>
											提交
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>

				<ActionSheet
					ref={o => (this.ActionSheet = o)}
					title={'请选择'}
					options={['拍摄', '图片', '取消']}
					cancelButtonIndex={2}
					onPress={index => {
						this.handleActionSheet(index);
					}}
				/>
			</View>
		);
	}
}

function mapStateToProps({ signInData, userData, taskData }) {
	const { userSignInData } = signInData;
	const { message } = userData;
	const { createTaskMessage, newTaskData } = taskData;
	return { message, userSignInData, createTaskMessage, newTaskData };
}

function mapDispatchToProps(dispatch) {
	return {
		submitApplicationForm: data => {
			dispatch(submitUserInfoData(data));
		},
		uploadUserImage: data => {
			dispatch(uploadUserImageData(data));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CleanerApplicationForm);

const styles = StyleSheet.create({
	titleInput: {
		borderBottomWidth: 1,
		borderColor: '#EAEAEA',
		fontSize: 16,
		paddingLeft: 5,
		paddingVertical: 15,
		marginTop: 12,
		marginHorizontal: 15,
	},
	textInput: {
		borderBottomWidth: 1,
		borderColor: '#EAEAEA',
		fontSize: 14,
		paddingLeft: 5,
		paddingVertical: 15,
		marginHorizontal: 15,
	},
	uploadImageContainer: {
		borderWidth: 1,
		borderColor: '#EAEAEA',
		height: 100,
		width: '100%',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	uploadImageBlock: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 7.5,
		marginHorizontal: 7.5,
	},
	uploadImageTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 7.5,
	},
	uploadImageText: {
		fontSize: 12,
		color: '#6C6C6C',
	},
	policyCheckContainer: {
		position: 'absolute',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: '14%',
		left: 0,
		right: 0,
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
	overlayTitleStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		lineHeight: 25,
	},
});
