import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

import { Entypo } from '@expo/vector-icons';

import { Rating, ListItem } from 'react-native-elements';

import { getUserInfoData, uploadUserImageData, submitUserInfoData } from '../../actions/user';

import { userSignOutData } from '../../actions/signIn';

import { MainDomain } from '../../variables/appVariables';

import PageLoading from '../../components/pageLoading';

class UserCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadImage: null
        };
    }

    componentDidMount() {
        this.props.getUserInfo(this.props.userSignInData.userId);
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.updating === true && this.props.updating === false) {
            this.props.getUserInfo(this.props.userSignInData.userId);
        }
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('抱歉！此功能需要权限！请在设置中修改！');
            }
        }
    }

    openImagePickerAsync = async (userId) => {
        this.getPermissionAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            let fileData = new FormData();
            fileData.append("uploadImage", {
                uri: result.uri,
                type: 'image/jpeg',
                name: 'userImage'
            });
            fileData.append("userId", userId);
            this.props.uploadUserImage(fileData);
        }
    }

    submitUserInfo = (userId, userName) => {
        this.props.submitUserInfo({
            "userId": userId,
            "userName": userName
        })
    }

    render() {
        let userInfo;

        if (this.props.userInfoData === undefined) {
            return <PageLoading />
        } else {
            userInfo = this.props.userInfoData;

            return (
                <View style={styles.container}>
                    <View style={styles.portraitContainer}>
                        <TouchableOpacity
                            onPress={() => this.openImagePickerAsync(userInfo.userId)}
                        >
                            <Image
                                style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 40 }}
                                source={(userInfo.userPhoto === null || userInfo.userPhoto === '') ? require('../../../assets/defaultUserImage.png') : { uri: MainDomain + userInfo.userPhoto }}
                            />
                        </TouchableOpacity>

                        <TextInput
                            style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}
                            onEndEditing={(event) => this.submitUserInfo(userInfo.userId, event.nativeEvent.text)}
                        >
                            {userInfo.userName}
                        </TextInput>

                        <Rating
                            readonly
                            startingValue={JSON.parse(userInfo.userRate)}
                            imageSize={20}
                            style={{ marginHorizontal: 10 }}
                        />

                        <Text style={{ color: '#252525', fontSize: 12, marginTop: 5 }}>{userInfo.userRate}</Text>
                    </View>

                    <View style={{ backgroundColor: '#F2F2F2' }}>
                        <View style={{ marginBottom: 20 }}>
                            <ListItem
                                containerStyle={{ paddingVertical: 10, paddingLeft: 20 }}
                                title='我的钱包'
                                titleStyle={{ color: '#1C1D27', fontSize: 16 }}
                                rightTitle={'$' + `${userInfo.userMoney}`}
                                rightTitleStyle={{ color: '#1C1D27', fontSize: 16, fontWeight: '400' }}
                                chevron={
                                    <Entypo
                                        name='chevron-small-right'
                                        color='#1C1D27'
                                        size={30}
                                        style={{ paddingTop: 4 }}
                                    />}
                                topDivider={true}
                                bottomDivider={true}
                                onPress={() => this.props.navigation.navigate('MyWallet')}
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <ListItem
                                containerStyle={{ paddingVertical: 10, paddingLeft: 20 }}
                                title='手机号'
                                titleStyle={{ color: '#1C1D27', fontSize: 16 }}
                                rightContentContainerStyle={{ flex: 1 }}
                                rightTitle={userInfo.userPhone}
                                rightTitleStyle={{ color: '#1C1D27', fontSize: 16 }}
                                chevron={
                                    <Entypo
                                        name='chevron-small-right'
                                        color='#1C1D27'
                                        size={30}
                                        style={{ paddingTop: 4 }}
                                    />}
                                topDivider={true}
                                bottomDivider={true}
                                onPress={() => this.props.navigation.navigate('UserPhoneNumberCheck')}
                            />
                        </View>
                    </View>

                    <View style={{ position: 'absolute', left: 0, bottom: 20, right: 0 }}>
                        <ListItem
                            containerStyle={{ paddingVertical: 20 }}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                            title='登出账户'
                            titleStyle={{ color: '#1C1D27', fontSize: 16 }}
                            topDivider={true}
                            bottomDivider={true}
                            onPress={this.props.userSignOut}
                        />
                    </View>
                </View>
            );
        }

    }
}

function mapStateToProps({ signInData, userData }) {
    const { userSignInData } = signInData;
    const { loading, updating, userUploadImageMessage, userInfoData } = userData;
    return { loading, userSignInData, userUploadImageMessage, updating, userInfoData };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: (data) => {
            dispatch(getUserInfoData(data));
        },
        uploadUserImage: (data) => {
            dispatch(uploadUserImageData(data));
        },
        submitUserInfo: data => {
            dispatch(submitUserInfoData(data));
        },
        userSignOut: () => {
            dispatch(userSignOutData());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    portraitContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#fff'
    },
    oddItem: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 20,
        paddingLeft: 30,
    },
    evenItem: {
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingLeft: 30,
    },
    title: {
        fontSize: 18,
    },
});
