import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { Rating, ListItem, CheckBox } from 'react-native-elements';

import { globalStyles } from '../../styles/globalStyles';

class NewTaskCheckOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            policyChecked: false
        };
    }

    componentDidMount() {

    }

    render() {
        let { orderPrice, orderExtraPrice, hstPrice, totalPrice } = this.props.route.params.priceInfo;

        let orderExtraPriceSection;

        if (orderExtraPrice !== '' && orderExtraPrice !== '0') {
            orderExtraPriceSection =
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 29
                }}>
                    <Text style={{
                        color: '#1C1D27',
                        fontSize: 18,
                        fontWeight: '400',
                    }}>
                        附加
                    </Text>

                    <Text style={{
                        color: '#1C1D27',
                        fontSize: 18,
                        fontWeight: '400'
                    }}>
                        $ {orderExtraPrice}
                    </Text>
                </View>
        }

        return (
            <View style={globalStyles.whiteBackgroundContainer}>
                <View style={{ flex: 1, marginBottom: 20 }}>
                    <ListItem
                        containerStyle={{ paddingVertical: 40, marginHorizontal: 20 }}
                        title='添加地址'
                        titleStyle={{ color: '#1C1D27', fontSize: 16 }}
                        rightContentContainerStyle={{ flex: 1 }}
                        //rightTitle={userInfo.userPhone}
                        rightTitleStyle={{ color: '#1C1D27', fontSize: 16 }}
                        chevron={
                            <Entypo
                                name='chevron-small-right'
                                color='#1C1D27'
                                size={30}
                                style={{ paddingTop: 4 }}
                            />}
                        bottomDivider={true}
                    //onPress={() => this.props.navigation.navigate('UserPhoneNumber')}
                    />
                    <ListItem
                        containerStyle={{ paddingVertical: 40, marginHorizontal: 20 }}
                        title='添加银行卡'
                        titleStyle={{ color: '#1C1D27', fontSize: 16 }}
                        //rightTitle={userInfo.cityName}
                        rightTitleStyle={{ color: '#1C1D27', fontSize: 16 }}
                        chevron={
                            <Entypo
                                name='chevron-small-right'
                                color='#1C1D27'
                                size={30}
                                style={{ paddingTop: 4 }}
                            />}
                        bottomDivider={true}
                    //onPress={() => this.props.navigation.navigate('UserAddress')}
                    />
                </View>

                <View style={{ flex: 1, position: 'absolute', bottom: '22.67%', left: '8%', right: '8%' }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            color: '#1C1D27',
                            fontSize: 18,
                            fontWeight: '500'
                        }}>
                            小结
                        </Text>
                        <Text style={{
                            color: '#1C1D27',
                            fontSize: 18,
                            fontWeight: '500'
                        }}>
                            $ {orderPrice}
                        </Text>
                    </View>

                    {orderExtraPriceSection}

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 12
                    }}>
                        <Text style={{
                            color: '#6C6C6C',
                            fontSize: 14,
                            fontWeight: '400',
                        }}>
                            HST
                        </Text>
                        <Text style={{
                            color: '#6C6C6C',
                            fontSize: 14,
                            fontWeight: '400'
                        }}>
                            $ {hstPrice}
                        </Text>
                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderColor: '#EAEAEA',
                        paddingTop: 10,
                    }}>
                        <Text style={{
                            color: '#1C1D27',
                            fontSize: 18,
                            fontWeight: '600',
                        }}>
                            总额
                        </Text>
                        <Text style={{
                            color: '#1C1D27',
                            fontSize: 18,
                            fontWeight: '600'
                        }}>
                            $ {totalPrice}
                        </Text>
                    </View>
                </View>

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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ServicePolicy')}>
                        <View>
                            <Text style={styles.blueText}>服务条款和隐私政策</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.bottomSingleButtonContainer}>
                    <TouchableOpacity
                        disabled={!this.state.policyChecked}
                        onPress={() => this.props.navigation.navigate('NewTaskOrderInfo', this.props.route.params)}>
                        <View style={(this.state.policyChecked === true) ? globalStyles.yellowLargeButton : globalStyles.lightGreyLargeButton}>
                            <Text style={(this.state.policyChecked === true) ? globalStyles.blackButtonText : globalStyles.whiteButtonText }>确认付款</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskCheckOut);

const styles = StyleSheet.create({
    policyCheckContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 200,
        paddingBottom: 0,
    },
    blackText: {
        fontSize: 12,
        color: '#6C6C6C',
        fontWeight: '400'
    },
    blueText: {
        fontSize: 12,
        color: '#65A3FF',
        fontWeight: '400'
    },
});
