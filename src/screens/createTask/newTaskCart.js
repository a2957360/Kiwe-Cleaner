import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { MainDomain } from '../../variables/appVariables';

import { screenWidth, screenHeight } from '../../variables/appVariables';

class NewTaskCart extends Component {

    componentDidMount() {

    }

    render() {
        let orderInfo = this.props.route.params;

        let orderExtraPriceSection;

        let { orderPrice, orderExtraPrice, orderTypeInfo } = this.props.route.params;

        let hstPrice, totalPrice, priceInfo;

        orderPrice = JSON.parse(orderPrice);
        orderExtraPrice = JSON.parse(orderExtraPrice);

        if (orderExtraPrice !== '' && orderExtraPrice !== '0') {
            hstPrice = (0.13) * (orderPrice + orderExtraPrice);
            totalPrice = hstPrice + orderPrice + orderExtraPrice;
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
        } else {
            hstPrice = (0.13) * orderPrice;
            totalPrice = hstPrice + orderPrice;
        }

        hstPrice = JSON.parse(hstPrice.toFixed(2));
        totalPrice = JSON.parse(totalPrice.toFixed(2));

        priceInfo = {
            orderPrice, orderExtraPrice, hstPrice, totalPrice
        };

        return (
            <View style={globalStyles.whiteBackgroundContainer} >
                <View style={styles.taskCardContainer}>
                    <View style={styles.taskImageContainerStyle}>
                        <Image style={{ width: 58, height: 63 }} source={{ uri: MainDomain + orderTypeInfo.typePhoto }} />
                    </View>

                    <View style={styles.taskTextContainer}>
                        <Text style={styles.greyText}>1 X</Text>
                        <Text style={styles.blackText}>{orderTypeInfo.typeName}</Text>
                        <Text style={styles.greyText}>${orderPrice}</Text>
                    </View>
                </View>

                <View style={{ flex: 1, position: 'absolute', bottom: '14.67%', left: '8%', right: '8%' }}>
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

                <View style={globalStyles.bottomSingleButtonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewTaskCheckOut', { orderInfo, priceInfo })}>
                        <View style={globalStyles.yellowLargeButton}>
                            <Text style={globalStyles.blackButtonText}>结算</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskCart);

const styles = StyleSheet.create({
    taskCardContainer: {
        flexDirection: 'row',
        paddingTop: 44,
        paddingBottom: 13,
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        marginHorizontal: '6%',
    },
    taskImageContainerStyle: {
        width: 90,
        height: 80,
        backgroundColor: '#E0EDFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25
    },
    taskTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    greyText: {
        color: '#A0A0A0',
    },
    blackText: {
        color: '#1C1D27',
        paddingRight: 50,
        fontWeight: 'bold'
    }
});
