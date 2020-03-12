import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { globalStyles } from '../../styles/globalStyles';

import { Formik } from 'formik';
import * as yup from 'yup';

import { screenWidth, screenHeight } from '../../variables/appVariables';

import { postUserAddressData } from '../../actions/user';

class UserAddressForms extends Component {

    constructor(props) {
        super(props);
        let isDefault;
        if (this.props.route.params === undefined) {
            isDefault = false;
        } else {
            isDefault = JSON.parse(this.props.route.params.isDefault);
        }
        isDefault = (isDefault === 1 ? true : false);
        this.state = {
            isDefault: isDefault
        };
    }

    componentDidMount() {

    }

    submitAddress = (values) => {
        let addressData = {
            ...values,
            isDefault: this.state.isDefault
        }

        this.props.postUserAddress(addressData);

        //Call Back
        this.props.navigation.navigate('UserAddress');
    }

    setAddressDefault = (value) => {
        this.setState({ isDefault: value })
    }

    render() {
        let userId;

        if (this.props.userSignInData !== undefined) {
            userId = this.props.userSignInData.userId;
        }

        let addressFormValues;
        if (this.props.route.params === undefined) {
            addressFormValues = {
                userId: userId,
                addressId: '',
                userName: '',
                userPhone: '',
                streetName: '',
                cityName: '',
                unitName: '',
                provinceName: '',
                postCode: '',
                isDefault: ''
            }
        } else {
            addressFormValues = this.props.route.params;
        }

        return (
            <View style={globalStyles.whiteBackgroundContainer}>
                <Formik
                    initialValues={addressFormValues}
                    onSubmit={(values) => {
                        this.submitAddress(values);
                    }}
                >
                    {props => (
                        <View style={globalStyles.container}>
                            <KeyboardAwareScrollView
                                keyboardDismissMode="on-drag"
                                extraScrollHeight={30}
                            >
                                <TextInput
                                    style={styles.largePlaceholderInput}
                                    placeholder='姓名*'
                                    onChangeText={props.handleChange('userName')}
                                    onBlur={props.handleBlur('userName')}
                                    value={props.values.userName}
                                />

                                <TextInput
                                    style={styles.mediumPlaceholderInput}
                                    placeholder='电话*'
                                    onChangeText={props.handleChange('userPhone')}
                                    onBlur={props.handleBlur('userPhone')}
                                    value={props.values.userPhone}
                                />

                                <TextInput
                                    style={styles.mediumPlaceholderInput}
                                    placeholder='街道*'
                                    onChangeText={props.handleChange('streetName')}
                                    onBlur={props.handleBlur('streetName')}
                                    value={props.values.streetName}
                                />

                                <TextInput
                                    style={styles.mediumPlaceholderInput}
                                    placeholder='门牌 (选填)'
                                    onChangeText={props.handleChange('unitName')}
                                    onBlur={props.handleBlur('unitName')}
                                    value={props.values.unitName}
                                />

                                <TextInput
                                    style={styles.mediumPlaceholderInput}
                                    placeholder='邮编*'
                                    onChangeText={props.handleChange('postCode')}
                                    onBlur={props.handleBlur('postCode')}
                                    value={props.values.postCode}
                                />

                                <TextInput
                                    style={styles.mediumPlaceholderInput}
                                    placeholder='城市*'
                                    onChangeText={props.handleChange('cityName')}
                                    onBlur={props.handleBlur('cityName')}
                                    value={props.values.cityName}
                                />

                                <TextInput
                                    style={styles.mediumPlaceholderInput}
                                    placeholder='省份*'
                                    onChangeText={props.handleChange('provinceName')}
                                    onBlur={props.handleBlur('provinceName')}
                                    value={props.values.provinceName}
                                />

                                <View style={{ flexDirection: 'row', alignContent: 'space-between', marginLeft: 0.04 * screenWidth, width: 0.92 * screenWidth, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}>
                                    <TextInput
                                        editable={false}
                                        style={styles.mediumPlaceholderInput}
                                        value='设为默认'
                                        style={{ fontSize: 14, paddingVertical: 15, paddingLeft: 5, borderBottomWidth: 0 }}
                                    />
                                    <View style={{ flex: 1, right: 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Switch
                                            onValueChange={(value) => this.setAddressDefault(value)}
                                            value={this.state.isDefault}
                                        />
                                    </View>
                                </View>
                            </KeyboardAwareScrollView>

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={props.handleSubmit}
                                >
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

function mapStateToProps({ signInData }) {
    const { userSignInData } = signInData;
    return { userSignInData };
}

function mapDispatchToProps(dispatch) {
    return {
        postUserAddress: (data) => {
            dispatch(postUserAddressData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressForms);

const styles = StyleSheet.create({
    largePlaceholderInput: {
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        fontSize: 16,
        paddingLeft: 5,
        paddingVertical: 15,
        marginTop: 12,
        marginHorizontal: 15,
    },
    mediumPlaceholderInput: {
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        fontSize: 14,
        paddingLeft: 5,
        paddingVertical: 15,
        marginHorizontal: 15,
    }
});
