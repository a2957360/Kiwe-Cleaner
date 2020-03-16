import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	StyleSheet,
	FlatList,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Spinner from 'react-native-loading-spinner-overlay';

import { globalStyles } from '../../styles/globalStyles';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

import { Formik } from 'formik';
import * as yup from 'yup';

import { AntDesign } from '@expo/vector-icons';

import { changeTaskStateData, uploadMultipleImagesData } from '../../actions/task';

class CleanerCheckinform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filesData: [],
			loadingSpinner: false,
		};
	}

	componentDidUpdate = prevProps => {
		//Loading结束spinner
		if (prevProps.loading !== this.props.loading && this.props.loading === false) {
			this.setState({ loadingSpinner: false });
		}

		if (prevProps.message !== this.props.message && this.props.message === 'success') {
			this.props.navigation.navigate('MyTaskDetail');
		}
	};

	changeTaskStatus = (orderId, state, content) => {
		let changeTaskStateData = {};
		changeTaskStateData.orderId = orderId;
		changeTaskStateData.orderState = state;
		changeTaskStateData.cleanerCheckinContent = content;

		let multipleImagesData = new FormData();
		this.state.filesData.map((item, index) => {
			multipleImagesData.append('cleanerCheckinPic' + (index + 1), {
				uri: item.uri,
				type: 'image/jpeg',
				name: 'userImage',
			});
		});

		multipleImagesData.append('orderId', orderId);
		multipleImagesData.append('uploadPicName', 'cleanerCheckinPic');

		this.props.uploadMultipleImages(multipleImagesData);

		this.setState({ loadingSpinner: true }, () => {
			this.props.changeTaskStatus(changeTaskStateData);
		});
	};

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('抱歉！此功能需要权限！请在设置中修改！');
			}
		}
	};

	openImagePickerAsync = async () => {
		let filesData = this.state.filesData;

		this.getPermissionAsync();

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			let fileData = {
				uri: result.uri,
			};

			filesData.push(fileData);

			this.setState({ filesData: filesData });
		}
	};

	render() {
		let orderId = this.props.route.params;

		return (
			<View style={globalStyles.whiteBackgroundContainer}>
				<Spinner visible={this.state.loadingSpinner} />

				<Formik
					initialValues={{
						cleanerCheckinContent: '',
					}}
					onSubmit={values => {
						this.changeTaskStatus(orderId, '3', values.cleanerCheckinContent);
					}}
				>
					{props => (
						<View style={globalStyles.container}>
							<KeyboardAwareScrollView keyboardDismissMode="on-drag" extraScrollHeight={30}>
								<View style={styles.screenTitleContainer}>
									<View style={styles.yellowIndicator} />
									<Text style={styles.screenTitle}>请填写内容及上传凭证</Text>
								</View>

								<View style={styles.TitleTextContainer}>
									<Text style={styles.TitleText}>请和客人一起巡视整体单位，</Text>
									<Text style={styles.TitleText}>记录单位原始情况，</Text>
									<Text style={styles.TitleText}>如有损坏，请详细记录</Text>
								</View>

								<TextInput
									style={styles.textMultiInput}
									placeholder="内容"
									multiline
									minHeight={300}
									onChangeText={props.handleChange('cleanerCheckinContent')}
									onBlur={props.handleBlur('cleanerCheckinContent')}
									value={props.values.cleanerCheckinContent}
								/>

								<ScrollView
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									contentContainerStyle={{
										marginHorizontal: 15,
										marginVertical: 25,
										flexDirection: 'row',
										paddingRight: 15,
									}}
								>
									<View>
										<FlatList
											horizontal={true}
											data={this.state.filesData}
											scrollEnabled={false}
											keyExtractor={(item, index) => index.toString()}
											renderItem={({ item }) => (
												<View style={{ marginRight: 15 }}>
													<Image
														style={{ width: 100, height: 100, borderRadius: 5 }}
														source={{ uri: item.uri }}
													/>
												</View>
											)}
										/>
									</View>

									<View style={{ marginRight: 15 }}>
										<TouchableOpacity onPress={() => this.openImagePickerAsync()}>
											<View style={globalStyles.uploadImageContainer}>
												<AntDesign name="plus" color="#A0A0A0" size={25} />
											</View>
										</TouchableOpacity>

										<View style={globalStyles.uploadImageTextContainer}>
											<Text style={globalStyles.uploadImageText}>上传凭证</Text>
										</View>
									</View>
								</ScrollView>
							</KeyboardAwareScrollView>

							<View style={globalStyles.bottomSingleButtonContainer}>
								<TouchableOpacity onPress={props.handleSubmit}>
									<View style={globalStyles.yellowLargeButton}>
										<Text style={globalStyles.blackButtonText}>提交</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
			</View>
		);
	}
}

function mapStateToProps({ taskData }) {
	const { loading, message } = taskData;
	return { loading, message };
}

function mapDispatchToProps(dispatch) {
	return {
		changeTaskStatus: data => {
			dispatch(changeTaskStateData(data));
		},
		uploadMultipleImages: data => {
			dispatch(uploadMultipleImagesData(data));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CleanerCheckinform);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	formContainer: {
		flex: 1,
	},
	problemType: {
		borderBottomWidth: 1,
		borderColor: '#EAEAEA',
		fontSize: 16,
		paddingLeft: 5,
		paddingVertical: 15,
		marginTop: 12,
		marginHorizontal: 15,
	},
	problemTitle: {
		borderBottomWidth: 1,
		borderColor: '#EAEAEA',
		fontSize: 14,
		paddingLeft: 5,
		paddingVertical: 15,
		marginHorizontal: 15,
	},
	textMultiInput: {
		borderBottomWidth: 1,
		borderColor: '#EAEAEA',
		fontSize: 14,
		paddingLeft: 5,
		paddingVertical: 15,
		marginTop: 10,
		marginHorizontal: 15,
	},
	screenTitleContainer: {
		flexDirection: 'row',
		paddingTop: 25,
	},
	yellowIndicator: {
		height: 20,
		width: 10,
		marginRight: 14,
		backgroundColor: '#FFCC34',
	},
	screenTitle: {
		fontSize: 18,
		fontWeight: '500',
		color: '#292929',
	},
	TitleTextContainer: {
		flexDirection: 'column',
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderColor: '#EAEAEA',
		marginHorizontal: 15,
	},
	TitleText: {
		fontSize: 14,
		color: '#6C6C6C',
		lineHeight: 16,
	},
	previewImageContainer: {
		width: '33%',
	},
});
