import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DatePicker from 'react-native-datepicker'

import { globalStyles } from '../../styles/globalStyles';

import { Overlay } from 'react-native-elements';

import { Formik } from 'formik';
import * as yup from 'yup';

import { createNewTaskData } from '../../actions/task';

import { AntDesign } from '@expo/vector-icons';

class CreateTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createTaskSuccessOverlayVisible: false
        };
    }

    // componentDidUpdate = (prevProps) => {
    //     if ((prevProps.createTaskMessage !== this.props.createTaskMessage) && (this.props.createTaskMessage === 'success')) {
    //         this.setState({
    //             newTaskData: this.props.newTaskData,
    //             createTaskSuccessOverlayVisible: true
    //         });
    //     }
    // };

    // createNewTask = (value) => {
    //     this.props.createNewTask(value);
    // }

    // navigationToMyTask = () => {
    //     this.setState({ createTaskSuccessOverlayVisible: false }, () => {
    //         this.props.navigation.navigate('MyTask')
    //     })
    // }

    render() {
        let userId;

        if (this.props.userSignInData !== undefined) {
            userId = this.props.userSignInData.userId;
        }

        return (
            <View style={globalStyles.whiteBackgroundContainer}>
                {/* <Overlay
                    width={300}
                    height={400}
                    overlayStyle={{
                        borderRadius: 25,
                    }}
                    isVisible={this.state.createTaskSuccessOverlayVisible}
                >
                    <View style={globalStyles.aligncenterContainer}>
                        <View>
                            <AntDesign
                                name='checkcircleo'
                                color='#FFCC34'
                                size={120}
                                style={{ marginTop: 45, marginBottom: 35 }}
                            />
                        </View>

                        <Text style={globalStyles.overlayTitleText}>发布成功！</Text>

                        <View style={globalStyles.overlaybottomSingleButtonContainer}>
                            <TouchableOpacity onPress={() => this.navigationToMyTask()}>
                                <View style={globalStyles.yellowMediumButton}>
                                    <Text style={globalStyles.blackButtonText}>返回任务</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay> */}

                <Formik
                    initialValues={{
                        userId: userId,
                        orderName: '',
                        orderType: this.props.route.params.orderType.typeId,
                        orderTypeInfo: this.props.route.params.orderType,
                        orderTypeService: this.props.route.params.orderTypeService,
                        orderAddress: '',
                        orderDate: '',
                        orderPrice: '',
                        orderExtraPrice: '',
                        orderExtraRequire: ''
                    }}
                    onSubmit={(values) => {
                        this.props.navigation.navigate('NewTaskCart', values)
                    }}
                >
                    {props => (
                        <View style={globalStyles.container}>
                            <KeyboardAwareScrollView
                                keyboardDismissMode="on-drag"
                                extraScrollHeight={30}
                            >
                                <TextInput
                                    style={styles.titleInput}
                                    placeholder='填写题目'
                                    onChangeText={props.handleChange('orderName')}
                                    onBlur={props.handleBlur('orderName')}
                                    value={props.values.orderName}
                                />

                                <TextInput
                                    style={styles.textInput}
                                    placeholder='地点'
                                    onChangeText={props.handleChange('orderAddress')}
                                    onBlur={props.handleBlur('orderAddress')}
                                    value={props.values.orderAddress}
                                />

                                <DatePicker
                                    style={styles.dateInput}
                                    date={props.values.orderDate}
                                    mode="datetime"
                                    placeholder='时间'
                                    format="YYYY-MM-DD HH:mm"
                                    minDate="2020-01-01"
                                    maxDate="2022-01-01"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            borderColor: '#EAEAEA',
                                            fontSize: 14,
                                            paddingLeft: 5,
                                            alignItems: 'flex-start',
                                        }
                                    }}
                                    onDateChange={props.handleChange('orderDate')}
                                />

                                <TextInput
                                    style={styles.textInput}
                                    placeholder='金额'
                                    onChangeText={props.handleChange('orderPrice')}
                                    onBlur={props.handleBlur('orderPrice')}
                                    value={props.values.orderPrice}
                                    keyboardType='numeric'
                                />

                                <TextInput
                                    style={styles.textInput}
                                    placeholder='附加金额'
                                    onChangeText={props.handleChange('orderExtraPrice')}
                                    onBlur={props.handleBlur('orderExtraPrice')}
                                    value={props.values.orderExtraPrice}
                                    keyboardType='numeric'
                                />

                                <TextInput
                                    style={styles.textMultiInput}
                                    placeholder='附加要求'
                                    multiline minHeight={155}
                                    onChangeText={props.handleChange('orderExtraRequire')}
                                    onBlur={props.handleBlur('orderExtraRequire')}
                                    value={props.values.orderExtraRequire}
                                />
                            </KeyboardAwareScrollView>

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={props.handleSubmit}
                                >
                                    <View style={globalStyles.yellowLargeButton}>
                                        <Text style={globalStyles.blackButtonText}>发布</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View >
        );
    }
}

function mapStateToProps({ signInData, taskData }) {
    const { userSignInData } = signInData;
    const { createTaskMessage, newTaskData } = taskData;
    return { userSignInData, createTaskMessage, newTaskData };
}

function mapDispatchToProps(dispatch) {
    return {
        createNewTask: (data) => {
            dispatch(createNewTaskData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

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
    dateInput: {
        width: '92%',
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        paddingVertical: 5,
        marginHorizontal: 15,
    },
    textMultiInput: {
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        fontSize: 14,
        paddingLeft: 5,
        paddingVertical: 15,
        marginTop: 15,
        marginHorizontal: 15,
    },
});
