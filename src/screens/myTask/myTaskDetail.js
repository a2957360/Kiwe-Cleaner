import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import { getTaskDetailData, changeTaskStateData } from '../../actions/task';

import { Overlay, CheckBox } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';

import PageLoading from '../../components/pageLoading';

class MyTaskDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskCancelOverlayVisible: false,
            taskTakenOverlayVisible: false,
            taskConfrimOverlayVisible: false
        };
    }

    componentDidMount() {
        this.props.getTaskDetail({ 'orderId': this.props.route.params.orderId });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.updating === true && this.props.updating === false) {
            this.props.getTaskDetail({ 'orderId': this.props.route.params.orderId });
        }
    };

    changeTaskStatus = (orderId, state, cleanerId) => {
        let changeTaskStateData = {};
        changeTaskStateData.orderId = orderId;
        changeTaskStateData.orderState = state;
        changeTaskStateData.cleanerId = cleanerId;

        this.setState({
            taskConfrimOverlayVisible: false,
            taskCancelOverlayVisible: false,
            taskTakenOverlayVisible: false
        }, () => {
            this.props.changeTaskStatus(changeTaskStateData);
        })
    }

    navigateToCustomerServiceForm = () => {
        this.setState({ taskConfrimOverlayVisible: false },
            () => this.props.navigation.navigate('CustomerServiceForm'))
    }

    navigateToServicePolicy = () => {
        this.setState({ taskTakenOverlayVisible: false },
            () => this.props.navigation.navigate('ServicePolicy'))
    }

    navigateToCheckInForm = () => {
        this.props.navigation.navigate('CleanerCheckInForm');
    }

    render() {
        let taskDetail;
        let backgroundImageSection;
        let taskDetailInfoSection;
        let taskCancelOverlay;

        let confirmOverlayContentText = ['打扫干净', '财务损失', '物品损害'];

        let { userId } = this.props.userSignInData;
        
        if (this.props.loading === true || this.props.taskDetailData === undefined) {
            return <PageLoading />
        } else {
            taskDetail = this.props.taskDetailData[0];

            this.props.navigation.setOptions({ title: taskDetail.orderStateText });

            backgroundImageSection =
                (
                    <Image style={{ width: '100%', height: 354 }} source={require('../../../assets/taskDetail/background1.png')} />
                );

            taskDetailInfoSection =
                (
                    <View>
                        <View style={styles.taskContentContainer}>
                            <View style={styles.taskDetailInfoContainer}>
                                <Text style={styles.taskDetailTitle}>{taskDetail.orderName}</Text>
                                <Text style={styles.taskUploadTime}>{taskDetail.uploadTime.slice(0, 10)}</Text>

                                <View style={styles.taskSubInfoContainer}>
                                    <SimpleLineIcons
                                        name='location-pin'
                                        color='#0080FF'
                                        size={16}
                                        style={{ marginTop: 2, marginRight: 5 }}
                                    />
                                    <Text style={styles.taskLocation}>{taskDetail.orderAddress}</Text>
                                    <View style={styles.greyVerticalDivider} />
                                    <Ionicons
                                        name='md-time'
                                        color='#0080FF'
                                        size={16}
                                        style={{ marginTop: 2, marginRight: 5 }}
                                    />
                                    <Text style={styles.taskDueDate}>{taskDetail.orderDate.slice(5, 10)}</Text>
                                </View>
                            </View>

                            <View style={styles.taskDetailCostContainer}>
                                <Text style={styles.taskDetailCost}>${taskDetail.orderPrice}</Text>

                                <View style={styles.taskStateBox}>
                                    <Text style={styles.taskStateText}>
                                        {taskDetail.typeName}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.taskSecondContentContainer}>

                            <FlatList
                                data={taskDetail.orderTypeService}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.serviceListContainer}>
                                        <Text style={styles.serviceListBullet}>{'\u2981'}</Text>
                                        <Text style={styles.serviceListText}>{item.typeName}</Text>
                                    </View>
                                )} />

                            <Text style={styles.orderExtraRequireText}>
                                {taskDetail.orderExtraRequire}
                            </Text>
                        </View>
                    </View>
                )

            taskCancelOverlay =
                (
                    <Overlay
                        width={300}
                        height={400}
                        overlayStyle={{
                            borderRadius: 25,
                        }}
                        isVisible={this.state.taskCancelOverlayVisible}
                        onBackdropPress={() => this.setState({ taskCancelOverlayVisible: false })}
                    >
                        <View style={styles.taskCancelOverlayContainer}>
                            <View>
                                <AntDesign
                                    name='exclamationcircleo'
                                    color='#FF2020'
                                    size={120}
                                    style={{ marginTop: 45, marginBottom: 35 }}
                                />
                            </View>

                            <Text style={styles.cancelOverlayTitleStyle}>确认取消接单?</Text>

                            <TouchableOpacity onPress={() => this.changeTaskStatus(taskDetail.orderId, '0', '')}>
                                <View style={globalStyles.redMediumButton}>
                                    <Text style={globalStyles.blackButtonText}>确认</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({ taskCancelOverlayVisible: false })}>
                                <View style={globalStyles.whiteMediumButton}>
                                    <Text style={globalStyles.blackButtonText}>取消</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                )

            taskConfirmOverlay =
                (
                    <Overlay
                        width={300}
                        height={470}
                        overlayStyle={{
                            borderRadius: 25,
                        }}
                        isVisible={this.state.taskConfrimOverlayVisible}
                        onBackdropPress={() => this.setState({ taskConfrimOverlayVisible: false })}
                    >
                        <View style={styles.taskConfirmOverlayContainer}>
                            <View>
                                <AntDesign
                                    name='checkcircleo'
                                    color='#FFCC34'
                                    size={120}
                                    style={{ marginTop: 45, marginBottom: 26 }}
                                />
                            </View>

                            <Text style={styles.confirmOverlayTitleStyle}>请确认，是否</Text>
                            <FlatList
                                style={styles.confirmOverlayFlatListStyle}
                                data={confirmOverlayContentText}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.checkListContainer}>
                                        <Text style={styles.checkListBullet}>{'\u2981'}</Text>
                                        <Text style={styles.checkListText}>{item}</Text>
                                    </View>
                                )} />
                            <TouchableOpacity onPress={() => this.changeTaskStatus(taskDetail.orderId, '6')}>
                                <View style={globalStyles.yellowMediumButton}>
                                    <Text style={globalStyles.blackButtonText}>确认结单</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.navigateToCustomerServiceForm()}>
                                <View style={globalStyles.whiteMediumButton}>
                                    <Text style={globalStyles.blackButtonText}>联系客服</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                )

            taskTakenConfirmOverlay =
                (
                    <Overlay
                        width={300}
                        height={450}
                        overlayStyle={{
                            borderRadius: 25,
                        }}
                        isVisible={this.state.taskTakenOverlayVisible}
                        onBackdropPress={() => this.setState({ taskTakenOverlayVisible: false })}
                    >
                        <View style={styles.taskConfirmOverlayContainer}>
                            <View>
                                <AntDesign
                                    name='checkcircleo'
                                    color='#FFCC34'
                                    size={120}
                                    style={{ marginTop: 45, marginBottom: 26 }}
                                />
                            </View>

                            <Text style={styles.confirmOverlayTitleStyle}>确认接单？</Text>

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
                                    checkedColor='#65A3FF'
                                />
                                <View>
                                    <Text style={styles.blackText}>已阅读并同意</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.navigateToServicePolicy()}>
                                    <View>
                                        <Text style={styles.blueText}>服务条款和隐私政策</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                disabled={!this.state.policyChecked}
                                onPress={() => this.changeTaskStatus(taskDetail.orderId, '1', userId)}
                            >
                                <View style={(this.state.policyChecked === true) ? globalStyles.yellowMediumButton : globalStyles.lightGreyMediumButton}>
                                    <Text style={(this.state.policyChecked === true) ? globalStyles.blackButtonText : globalStyles.whiteButtonText}>确认</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            disabled={!this.state.policyChecked}
                            onPress={() => this.setState({ taskTakenOverlayVisible: false })}
                            >
                                <View style={globalStyles.whiteMediumButton}>
                                    <Text style={globalStyles.blackButtonText}>回到订单</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                )

            switch (taskDetail.orderState) {
                //待接单
                case '0':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ taskTakenOverlayVisible: true })}
                                >
                                    <View style={globalStyles.yellowLargeButton}>
                                        <Text style={globalStyles.blackButtonText}>接单</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {taskTakenConfirmOverlay}
                        </View>
                    )
                //已接单
                case '1':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ taskCancelOverlayVisible: true })}
                                >
                                    <View style={globalStyles.darkGreyLargeButton}>
                                        <Text style={globalStyles.whiteButtonText}>取消接单</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {taskCancelOverlay}
                        </View >
                    )
                //已确认
                case '2':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}

                            <View style={globalStyles.bottomDoubleButtonContainer}>

                                <TouchableOpacity
                                    onPress={() => this.setState({ taskCancelOverlayVisible: true })}
                                >
                                    <View style={globalStyles.whiteMediumButton}>
                                        <Text style={globalStyles.blackButtonText}>取消此单</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.navigateToCheckInForm()}
                                >
                                    <View style={globalStyles.yellowLargeButton}>
                                        <Text style={globalStyles.blackButtonText}>开始任务</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {taskCancelOverlay}
                        </View>
                    )
                //已到达
                case '3':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}

                            <View style={styles.screenTitleContainer}>
                                <View style={styles.yellowIndicator} />
                                <Text style={styles.screenTitle}>请确认情况属实描述一致</Text>
                            </View>

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.changeTaskStatus(taskDetail.orderId, '4')}
                                >
                                    <View style={globalStyles.yellowLargeButton}>
                                        <Text style={globalStyles.blackButtonText}>确认</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                //服务中
                case '4':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}
                        </View>
                    )
                //服务完成/待确认
                case '5':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ taskConfrimOverlayVisible: true })}
                                >
                                    <View style={globalStyles.yellowLargeButton}>
                                        <Text style={globalStyles.blackButtonText}>确认</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {taskConfirmOverlay}
                        </View>
                    )
                //服务完成/已确认-评论结账
                case '6':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MyTaskComment', taskDetail)}
                                >
                                    <View style={globalStyles.yellowLargeButton}>
                                        <Text style={globalStyles.blackButtonText}>结账</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                //已评论
                case '7':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}

                            <View style={globalStyles.bottomSingleButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('CustomerServiceForm')}
                                >
                                    <View style={globalStyles.yellowLargeButton}>
                                        <Text style={globalStyles.blackButtonText}>联系客服</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                //已取消
                case '8':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}
                        </View>
                    )
                //仲裁中
                case '9':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}
                        </View>
                    )
                //仲裁完成
                case '10':
                    return (
                        <View style={globalStyles.whiteBackgroundContainer}>
                            {backgroundImageSection}
                            {taskDetailInfoSection}
                        </View>
                    )
                default:
                    break;
            }
        }
    }
}

function mapStateToProps({ signInData, taskData }) {
    const { userSignInData } = signInData;
    const { loading, updating, taskDetailData } = taskData;
    return { loading, updating, userSignInData, taskDetailData };
}

function mapDispatchToProps(dispatch) {
    return {
        getTaskDetail: (data) => {
            dispatch(getTaskDetailData(data));
        },
        changeTaskStatus: (data) => {
            dispatch(changeTaskStateData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTaskDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    taskContentContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 30
    },
    taskDetailInfoContainer: {
        flex: 1
    },
    taskDetailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskUploadTime: {
        marginTop: 5,
        fontSize: 12,
        color: '#6C6C6C',
    },
    taskSubInfoContainer: {
        marginTop: 5,
        flexDirection: 'row',
    },
    taskLocation: {
        color: '#0080FF',
        fontSize: 14
    },
    greyVerticalDivider: {
        width: 1,
        height: 15,
        marginTop: 3,
        backgroundColor: '#0080FF',
        marginHorizontal: 9
    },
    taskDueDate: {
        color: '#0080FF',
        fontSize: 14
    },
    taskDetailCostContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: -2
    },
    taskDetailCost: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskStateBox: {
        backgroundColor: '#65A3FF',
        width: 78,
        height: 32,
        borderRadius: 16,
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskStateText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12
    },
    taskSecondContentContainer: {
        marginHorizontal: 15,
        marginTop: 15
    },
    serviceListContainer: {
        flexDirection: 'row'
    },
    serviceListBullet: {
        color: '#6C6C6C'
    },
    serviceListText: {
        marginLeft: 5,
        marginBottom: 5,
        fontSize: 14,
        color: '#6C6C6C'
    },
    orderExtraRequireText: {
        color: '#6C6C6C',
        fontSize: 12,
        lineHeight: 14,
    },
    secondBottomButtonBackground: {
        borderRadius: 10,
        backgroundColor: '#ffffff',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        marginBottom: 5
    },
    bottomButtonContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 30,
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
    taskCancelOverlayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskConfirmOverlayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmOverlayTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    checkListContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingRight: 45
    },
    checkListBullet: {
        color: '#6C6C6C',
        marginRight: 8
    },
    checkListText: {
        fontSize: 16,
        color: '#6C6C6C'
    },
    cancelOverlayTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 38
    },
    confirmOverlayFlatListStyle: {
        marginBottom: 20
    },
    policyCheckContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: -10,
    },
    blackText: {
        fontSize: 11,
        color: '#6C6C6C',
        fontWeight: '400'
    },
    blueText: {
        fontSize: 11,
        color: '#65A3FF',
        fontWeight: '400'
    },
});
