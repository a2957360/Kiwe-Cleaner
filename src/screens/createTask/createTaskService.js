import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

import { CheckBox } from 'native-base';

import { globalStyles } from '../../styles/globalStyles';

import { MainDomain, screenWidth, screenHeight} from '../../variables/appVariables';

class CreateTaskService extends Component {

    state = {
        serviceData: {}
    };


    componentDidMount() {

    }

    navigateToCreateNewTask = () => {
        let orderType = this.props.route.params;
        let orderTypeService = [];
        let serviceData = this.state.serviceData;
        let typeList = this.props.route.params.typeList;

        if (this.props.route.params.typeName === '自定义') {
            for (const property in serviceData) {
                if (serviceData[property] === true) {
                    orderTypeService.push(typeList[property]);
                }
            }
        } else {
            orderTypeService = typeList;
        }

        this.props.navigation.navigate('CreateNewTask', {
            orderType: orderType,
            orderTypeService: orderTypeService
        })
    }

    checkServiceBox = (value) => {
        this.setState({
            serviceData: {
                ...this.state.serviceData,
                [value]: !this.state.serviceData[value]
            }
        })
    }

    render() {
        let taskService = this.props.route.params;
        let serviceList;

        if (this.props.route.params.typeName === '自定义') {
            serviceList =
                <View style={styles.circlesContainer}>
                    <FlatList
                        data={taskService.typeList}
                        contentContainerStyle={styles.flatListItemContainer}
                        scrollEnabled={false}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                            <View style={styles.circleGroupContainer}>
                                <View style={styles.circleContainer}>
                                    <Image style={{ width: 37, height: 37 }} source={{ uri: MainDomain + item.typePhoto }} />
                                </View>

                                <View style={styles.circleTitleContainer}>
                                    <Text style={styles.circleTitle}>{item.typeName}</Text>
                                </View>

                                <View style={styles.checkBoxContainer}>
                                    <CheckBox
                                        onPress={() => this.checkServiceBox(index)}
                                        checked={this.state.serviceData[index]}
                                        color="#DC4F89"
                                    />
                                </View>
                            </View>
                        )} />
                </View>
        } else {
            serviceList =
                <View style={styles.circlesContainer}>
                    <FlatList
                        data={taskService.typeList}
                        contentContainerStyle={styles.flatListItemContainer}
                        scrollEnabled={false}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.circleGroupContainer}>
                                <View style={styles.circleContainer}>
                                    <Image style={{ width: 37, height: 37 }} source={{ uri: MainDomain + item.typePhoto }} />
                                </View>

                                <View style={styles.circleTitleContainer}>
                                    <Text style={styles.circleTitle}>{item.typeName}</Text>
                                </View>
                            </View>
                        )} />
                </View>
        }

        return (
            <View style={styles.container}>
                <View style={styles.screenTitleContainer}>
                    <View style={styles.yellowIndicator} />
                    <Text style={styles.screenTitle}>服务项目</Text>
                </View>

                {serviceList}

                <View style={globalStyles.bottomSingleButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.navigateToCreateNewTask()}
                    >
                        <View style={globalStyles.yellowLargeButton}>
                            <Text style={globalStyles.blackButtonText}>下一步</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskService);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    screenTitleContainer: {
        flexDirection: 'row',
        paddingTop: 25,
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
    circlesContainer: {
        flexDirection: 'row',
        marginHorizontal: 3.5,
    },
    circleContainer: {
        height: 70,
        width: 70,
        borderRadius: 35,
        marginHorizontal: 26.5,
        marginTop: 25,
        backgroundColor: '#65A3FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7,
    },
    checkBoxContainer: {
        marginTop: 7,
        //设计图marginbottom为30，显示过大
        paddingRight: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleTitle: {
        fontSize: 12,
        color: '#1C1D27'
    }
});
