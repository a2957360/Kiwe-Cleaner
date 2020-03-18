import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import { Overlay } from 'react-native-elements';

import { Rating, ListItem, CheckBox } from 'react-native-elements';

import KeyboardListener from 'react-native-keyboard-listener';

import { globalStyles } from '../../styles/globalStyles';

import { Formik } from 'formik';
import * as yup from 'yup';

import { getVerificationCodeData } from '../../actions/signIn';

import { changeUserPhoneData } from '../../actions/user';

import Spinner from 'react-native-loading-spinner-overlay';

import { AntDesign } from '@expo/vector-icons';

import { screenWidth } from '../../variables/appVariables';

class userPhoneNumberChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollEnabled: false,
            loadingSpinner: false,
            loginSuccessOverlayVisible: false,
            loginFailOverlayVisible: false,
            timerStart: false,
            seconds: 0,
            errorMessage: null
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.loading !== this.props.loading && this.props.loading === false) {
            this.setState({ loadingSpinner: false });
        }

        if (prevProps.message !== this.props.message && this.props.message === 'success') {
            this.setState({ loginSuccessOverlayVisible: true });
        }

        if (prevProps.message !== this.props.message && this.props.message === 'verificationCode wrong') {
            this.setState({ 
                errorMessage: "验证码错误，请重新输入",
                loginFailOverlayVisible: true 
            });
        }

        if (prevProps.message !== this.props.message && this.props.message === 'duplicate phone') {
            this.setState({ 
                errorMessage: "该手机号已被占用",
                loginFailOverlayVisible: true 
            });
        }
    };

    getVerificationCode = userPhone => {
        this.countTime();

        this.setState({ timerStart: true }, () =>
            this.props.getVerificationCode({
                userPhone: userPhone,
                userRole: '1',
            })
        );
    };

    changeUserPhone = values => {
        this.setState({ loadingSpinner: true }, () => {
            this.props.changeUserPhone(values);
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
        let { userId } = this.props.userInfoData;

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
                        <Text style={styles.overlayTitleStyle}>更改成功</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => this.setState({ loginSuccessOverlayVisible: false }, () => {
                            this.props.navigation.navigate('UserCenter')
                        })}>
                            <View style={globalStyles.yellowMediumButton}>
                                <Text style={globalStyles.blackButtonText}>返回个人中心</Text>
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
                        <Text style={styles.overlayTitleStyle}>{this.state.errorMessage}</Text>
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
                contentContainerStyle={{
                    flex: 0.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
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
                    <Text style={styles.titleText}>新手机绑定</Text>
                </View>

                <Formik
                    initialValues={{
                        userId: userId,
                        userRole: '1',
                        userPhone: '',
                        verificationCode: '',
                    }}
                    onSubmit={values => {
                        this.changeUserPhone(values);
                    }}
                >
                    {props => (
                        <View>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="输入新手机号码"
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

                            <View style={styles.bottomButtonContainer}>
                                <TouchableOpacity onPress={props.handleSubmit}>
                                    <View style={globalStyles.blueLargeButton}>
                                        <Text style={globalStyles.whiteButtonText}>
                                            确认
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

function mapStateToProps({ signInData, userData }) {
    const { userSignInData } = signInData;
    const { loading, message, userInfoData } = userData;
    return { loading, message, userSignInData, userInfoData };
}

function mapDispatchToProps(dispatch) {
    return {
        getVerificationCode: data => {
            dispatch(getVerificationCodeData(data));
        },
        changeUserPhone: data => {
            dispatch(changeUserPhoneData(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(userPhoneNumberChange);

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
    bottomButtonContainer: {
        backgroundColor: '#ffffff',
        marginTop: 60,
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
