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

    contactService = () => {
        console.log('提交客服')
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
                        this.contactService(values);
                    }}
                >
                    {props => (
                        <View style={globalStyles.container}>
                            <KeyboardAwareScrollView
                                keyboardDismissMode="on-drag"
                                extraScrollHeight={30}
                            >
                                <TextInput
                                    style={styles.problemType}
                                    placeholder='问题类型'
                                    onChangeText={props.handleChange('problemType')}
                                    onBlur={props.handleBlur('problemType')}
                                    value={props.values.problemType}
                                />

                                <TextInput
                                    style={styles.problemTitle}
                                    placeholder='题目'
                                    onChangeText={props.handleChange('problemTitle')}
                                    onBlur={props.handleBlur('problemTitle')}
                                    value={props.values.problemTitle}
                                />

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
    }
});
