import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { globalStyles } from '../../styles/globalStyles';

import { Formik } from 'formik';
import * as yup from 'yup';

class CustomerServiceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    changeTaskStatus = (id, state) => {
        let changeTaskStateData = {};
        changeTaskStateData.orderId = id;
        changeTaskStateData.orderState = state;

        this.setState({
            taskConfrimOverlayVisible: false,
            taskCancelOverlayVisible: false,
            taskTakenOverlayVisible: false
        }, () => {
            this.props.changeTaskStatus(changeTaskStateData);
        })
    }

    render() {
        return (
            <View style={globalStyles.whiteBackgroundContainer}>
                <Formik
                    initialValues={{
                        orderId: '',
                        problemType: '',
                        problemTitle: '',
                        problemContent: ''
                    }}
                    onSubmit={(values) => {
                        this.changeTaskStatus(taskDetail.orderId, '3');
                    }}
                >
                    {props => (
                        <View style={globalStyles.container}>
                            <KeyboardAwareScrollView
                                keyboardDismissMode="on-drag"
                                extraScrollHeight={30}
                            >
                                <View style={styles.screenTitleContainer}>
                                    <View style={styles.yellowIndicator} />
                                    <Text style={styles.screenTitle}>请填写内容及上传凭证</Text>
                                </View>
                                <TextInput
                                    style={styles.textMultiInput}
                                    placeholder='内容'
                                    multiline minHeight={300}
                                    onChangeText={props.handleChange('problemContent')}
                                    onBlur={props.handleBlur('problemContent')}
                                    value={props.values.problemContent}
                                />
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
            </View >
        );
    }
}

function mapStateToProps() {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerServiceForm);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    formContainer: {
        flex: 1
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
        paddingVertical: 25
    },
    yellowIndicator: {
        height: 20,
        width: 10,
        marginRight: 14,
        backgroundColor: '#FFCC34'
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#292929'
    },
});
