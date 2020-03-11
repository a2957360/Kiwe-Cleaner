import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image, RefreshControl } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import { getIncompletedTaskData } from '../../actions/task';

import { MainDomain } from '../../variables/appVariables';

import PageLoading from '../../components/pageLoading';

class MyTaskIncompleted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }

    componentDidMount() {
        console.log(this.props.userSignInData.userId)
        this.getIncompletedTask();
    }

    componentDidUpdate = (prevProps) => {
        if ((prevProps.loading !== this.props.loading) && (this.props.loading === false)) {
            this.setState({ isRefreshing: false });
        }
    };

    getIncompletedTask = () => {
        //Get Incompleted Task Data
        this.props.getIncompletedTask({
            'userId': this.props.userSignInData.userId,
            'orderState': '(0,1,2,3,4,5,6)'
        });
    }

    refreshTaskList = () => {
        this.setState({ isRefreshing: true }, () => {
            this.getIncompletedTask();
        });
    }

    taskImageContainerStyle = (value) => {
        let boxColor;
        if (value % 2 == 0) {
            boxColor = '#E0EDFF'
        } else {
            boxColor = '#FFF9CC'
        }
        return {
            width: 90,
            height: 80,
            marginHorizontal: '4%',
            backgroundColor: boxColor,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    taskStateBoxStyle = (value) => {
        let boxColor;
        switch (value) {
            case '0':
                boxColor = '#F5DDCC';
                break;
            case '1':
                boxColor = '#F7CCCE';
                break;
            case '2':
                boxColor = '#CCE9DB';
                break;
            default:
                boxColor = '#CCE5FA';
                break;
        }
        return {
            backgroundColor: boxColor,
            opacity: 0.5,
            width: 60,
            height: 25,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    taskStateStyle = (value) => {
        let boxTextColor;
        switch (value) {
            case '0':
                boxTextColor = '#CC5600';
                break;
            case '1':
                boxTextColor = '#D5000A';
                break;
            case '2':
                boxTextColor = '#00934A';
                break;
            default:
                boxTextColor = '#007DE4';
                break;
        }
        return {
            color: boxTextColor,
            fontWeight: 'bold',
            fontSize: 10
        }
    }

    render() {
        if (this.props.incompletedTaskData === undefined) {
            return <PageLoading />
        } else {
            return (
                <ScrollView
                    accessibilityRole='non'
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshTaskList}
                            tintColor="#F2F2F2"
                        />}
                >
                    <FlatList
                        style={styles.flatListContainer}
                        data={this.props.incompletedTaskData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyTaskDetail', item)}>
                                    <View style={styles.taskCardContainer}>
                                        <View style={this.taskImageContainerStyle(index)}>
                                            <Image style={{ width: 58, height: 63 }} source={{ uri: MainDomain + item.typePhoto }} />
                                        </View>

                                        <View style={styles.taskTextContainer}>
                                            <Text style={styles.taskTitle}>{item.orderName}</Text>
                                            <View style={styles.taskInfoContainer}>
                                                <SimpleLineIcons
                                                    name='location-pin'
                                                    color='#6C6C6C'
                                                    size={12}
                                                    style={{ paddingTop: 2, marginRight: 5 }}
                                                />
                                                <Text style={styles.taskLocation}>{item.orderAddress}</Text>
                                                <View style={styles.greyVerticalDivider} />
                                                <Ionicons
                                                    name='md-time'
                                                    color='#6C6C6C'
                                                    size={12}
                                                    style={{ paddingTop: 2, marginRight: 5 }}
                                                />
                                                <Text style={styles.taskDueDate}>{item.orderDate.slice(5, 10)}</Text>
                                            </View>
                                            <Text style={styles.taskCost}>${item.orderPrice}</Text>
                                        </View>

                                        <View style={styles.taskStateContainer}>
                                            <View style={this.taskStateBoxStyle(item.orderState)}>
                                                <Text style={this.taskStateStyle(item.orderState)}>{item.orderStateText.slice(0, 4)}</Text>
                                            </View>

                                            <Text style={styles.taskPostDate}>Post at: {item.uploadTime.slice(5, 10)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.greyHorizontalDivider} />
                            </View>
                        )} />
                </ScrollView>
            );
        }
    }
}

function mapStateToProps({ signInData, taskData }) {
    const { userSignInData } = signInData;
    const { loading, incompletedTaskData } = taskData;
    return { userSignInData, loading, incompletedTaskData };
}

function mapDispatchToProps(dispatch) {
    return {
        getIncompletedTask: (data) => {
            dispatch(getIncompletedTaskData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTaskIncompleted);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    flatListContainer: {
        paddingBottom: 20
    },
    taskCardContainer: {
        flexDirection: 'row',
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10
    },
    taskInfoContainer: {
        flexDirection: 'row',
    },
    taskLocation: {
        color: '#6C6C6C',
        fontSize: 10
    },
    greyVerticalDivider: {
        width: 1,
        height: 15,
        backgroundColor: '#F6F6F6',
        marginHorizontal: 7
    },
    taskDueDate: {
        color: '#6C6C6C',
        fontSize: 10
    },
    taskCost: {
        color: '#1C1D27',
        fontSize: 18,
        marginTop: 9
    },
    taskStateContainer: {
        flex: 1,
        right: 0,
        paddingRight: '4%',
        alignItems: 'flex-end'
    },
    taskPostDate: {
        color: '#000000',
        opacity: 0.5,
        fontSize: 9,
        marginTop: 41,
        marginRight: 0
    },
    greyHorizontalDivider: {
        width: 239,
        height: 1,
        backgroundColor: '#F6F6F6',
        marginLeft: 121,
        marginTop: 10,
        marginBottom: 25
    }
});
