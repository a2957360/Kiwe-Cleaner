import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { getTaskTypeListData } from '../../actions/task';

import { MainDomain } from '../../variables/appVariables';

import PageLoading from '../../components/pageLoading';

class CreateTask extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.getTaskTypeList();
    }

    render() {
        if (this.props.taskTypeList === undefined) {
            return <PageLoading />
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.screenTitleContainer}>
                        <View style={styles.yellowIndicator} />
                        <Text style={styles.screenTitle}>请选择您的服务类型</Text>
                    </View>

                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={this.props.taskTypeList.orderType}
                            contentContainerStyle={{
                                flexDirection: 'column',
                            }}
                            scrollEnabled={false}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('CreateTaskService', item)}
                                    style={styles.boxContainer}
                                >
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 57,
                                        marginBottom: 49
                                    }}>
                                        <Image style={{ width: 80, height: 80 }} source={{ uri: MainDomain + item.typePhoto }} />
                                    </View>

                                    <View style={styles.boxTitleContainer}>
                                        <Text style={styles.boxTitle}>{item.typeName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )} />
                    </View>
                </View>
            );
        }
    }
}

function mapStateToProps({ taskData }) {
    const { taskTypeList } = taskData;
    return { taskTypeList };
}

function mapDispatchToProps(dispatch) {
    return {
        getTaskTypeList: () => {
            dispatch(getTaskTypeListData());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    flatListContainer: {
        flex: 1,
        marginHorizontal: 11,
        marginBottom: 25,
    },
    flatListItemContainer: {
        flexDirection: 'row',
        //内容超出屏幕
        flexWrap: 'wrap',
    },
    boxContainer: {
        marginHorizontal: 10,
        borderRadius: 20,
        marginBottom: 25,
        width: 0.42 * Dimensions.get('window').width,
        height: 220,
        backgroundColor: '#65A3FF'
    },
    boxImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxTitleContainer: {
        flex: 1,
        marginLeft: 18,
    },
    boxTitle: {
        fontSize: 14,
        color: '#F3F6F8'
    }
});
