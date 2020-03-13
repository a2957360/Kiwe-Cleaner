import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

class StartScreen extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={globalStyles.blueBackgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image resizeMode="contain" style={styles.logoImage} source={require('../../../assets/logo.png')} />
                </View>

                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('PhoneNumberSignIn')}
                    >
                        <View style={globalStyles.whiteLargeButton}>
                            <Text style={globalStyles.blueButtonText}>手机登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.whiteTitleContainer}>
                    <Text style={styles.whiteTitleText}>第三方登录</Text>
                </View> */}
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
    },
    logoImage: {
        width: 200,
        height: 120,
    },
    bottomButtonContainer: {
        backgroundColor: '#65A3FF',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        marginBottom: 15,
        height: '10%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
});
