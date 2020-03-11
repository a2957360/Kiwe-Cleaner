import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { } from '../../actions/task';

import { MainDomain } from '../../variables/appVariables';

import { AirbnbRating, ButtonGroup, Overlay } from 'react-native-elements';

import { TextInputMask } from 'react-native-masked-text';

import { changeTaskStateData } from '../../actions/task';

import { AntDesign } from '@expo/vector-icons';

class MyTaskComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1,
            buttons: ['10%', '15%', '20%'],
            tipsOverlayVisible: false,
            finishCommentOverlayVisible: false,
            textTips: '',
            commentIndex: 0,

            orderTip: '15%',
            commentRating: 5
        };
    }

    componentDidMount = () => {

    }

    ratingCompleted = (rating) => {
        this.setState({ commentRating: rating })
    }

    updateIndex = (selectedIndex) => {
        this.setState({
            selectedIndex: selectedIndex,
            orderTip: this.state.buttons[selectedIndex]
        });
    }

    changeTaskStatus = (id, state) => {
        let data = {
            orderId: id,
            orderState: state,
            orderTip: this.state.orderTip,
            userReviewRate: this.state.commentRating,
        }
        this.setState({ finishCommentOverlayVisible: true }, () => {
            this.props.changeTaskStatus(data);
        })
    }

    navigationToTaskDetail = (taskDetail) => {
        this.setState({ finishCommentOverlayVisible: false }, () => {
            this.props.navigation.navigate('MyTaskDetail', taskDetail)
        })
    }

    navigationToMyTask = () => {
        this.setState({ finishCommentOverlayVisible: false }, () => {
            this.props.navigation.navigate('MyTask')
        })
    }

    render() {
        let taskDetail = this.props.route.params;

        let tipsSection;

        if (this.state.commentIndex === 1) {
            tipsSection =
                <View style={styles.textTipsInputContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: -5 }}>添加小费</Text>
                    <Text style={styles.textTipsInput}>
                        {this.state.orderTip}
                    </Text>
                </View>
        } else {
            tipsSection =
                <View>
                    <View style={styles.tipContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>添加小费</Text>

                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={this.state.buttons}
                            containerStyle={{
                                height: 60,
                                width: 285,
                                borderWidth: 0,
                            }}
                            buttonStyle={{
                                height: 60,
                                width: 60,
                                borderWidth: 1,
                                borderColor: '#EAEAEA',
                                borderRadius: 30,
                                marginHorizontal: 17.5
                            }}
                            selectedButtonStyle={{
                                backgroundColor: '#65A3FF',
                                borderWidth: 0,
                            }}
                            innerBorderStyle={{
                                width: 0,
                            }}
                            textStyle={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}
                        />
                    </View>

                    <Overlay
                        width={375}
                        height={170}
                        containerStyle={{
                            position: 'absolute',
                        }}
                        overlayStyle={{
                            marginTop: 60
                        }}
                        isVisible={this.state.tipsOverlayVisible}
                        onBackdropPress={() => this.setState({ tipsOverlayVisible: false })}
                    >
                        <View style={styles.textTipsInputContainer}>
                            <TextInputMask
                                style={styles.textTipsInput}
                                type={'money'}
                                options={{
                                    precision: 2,
                                    separator: '.',
                                    delimiter: ',',
                                    unit: '$'
                                }}
                                value={this.state.textTips}
                                onChangeText={text => {
                                    this.setState({
                                        textTips: text
                                    })
                                }}
                                autoFocus={true}
                            />
                        </View>

                        <View style={styles.overlayButtonsContainer}>
                            <TouchableOpacity onPress={() => this.setState({ tipsOverlayVisible: false })}>
                                <View style={styles.greySmallButton}>
                                    <Text style={styles.greyButtonText}>取消</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({ tipsOverlayVisible: false, orderTip: this.state.textTips, commentIndex: 1 })}>
                                <View style={styles.yellowSmallButton}>
                                    <Text style={styles.blackButtonText}>确认</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Overlay>

                    <TouchableOpacity onPress={() => this.setState({ tipsOverlayVisible: true })}>
                        <KeyboardAvoidingView style={styles.customizeTipButtonContainer}>
                            <TextInput
                                keyboardType="number-pad"
                                style={styles.customizeTipButtonText}
                            />
                            <Text style={styles.customizeTipButtonText}>自定义</Text>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </View>
        }

        return (
            <View style={styles.container}>
                <View style={styles.ratingContainer}>
                    <Image style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 40 }} source={{ uri: MainDomain + taskDetail.cleanerPhoto }} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>{taskDetail.cleanerName}</Text>

                    <AirbnbRating
                        count={5}
                        showRating={false}
                        defaultRating={this.state.commentRating}
                        size={40}
                        onFinishRating={this.ratingCompleted}
                    />
                </View>

                {tipsSection}

                <View style={globalStyles.bottomSingleButtonContainer}>
                    <TouchableOpacity onPress={() => this.changeTaskStatus(taskDetail.orderId, '7')}>
                        <View style={globalStyles.yellowLargeButton}>
                            <Text style={globalStyles.blackButtonText}>确认</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Overlay
                    width={300}
                    height={400}
                    overlayStyle={{
                        borderRadius: 25,
                    }}
                    isVisible={this.state.finishCommentOverlayVisible}
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

                        <Text style={globalStyles.overlayTitleText}>感谢您的评论</Text>

                        <TouchableOpacity onPress={() => this.navigationToTaskDetail(taskDetail.orderId)}>
                            <View style={globalStyles.yellowMediumButton}>
                                <Text style={globalStyles.blackButtonText}>返回任务</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.navigationToMyTask()}>
                            <View style={globalStyles.whiteMediumButton}>
                                <Text style={globalStyles.blackButtonText}>回到订单</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </Overlay>
            </View>
        );
    }
}

function mapStateToProps() {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeTaskStatus: (data) => {
            dispatch(changeTaskStateData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTaskComment);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 111,
        marginBottom: 89,
    },
    tipContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    customizeTipButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    customizeTipButtonText: {
        fontSize: 16,
        color: '#65A3FF',
        fontWeight: 'bold'
    },
    textTipsInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTipsInput: {
        fontSize: 36,
        marginTop: 25,
    },
    overlayButtonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greySmallButton: {
        borderRadius: 22,
        backgroundColor: '#434343',
        width: 150,
        height: 44,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    greyButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    yellowSmallButton: {
        borderRadius: 22,
        backgroundColor: '#FFCC34',
        width: 150,
        height: 44,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
})