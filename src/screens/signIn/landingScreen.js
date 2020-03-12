import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { screenWidth, screenHeight } from '../../variables/appVariables';

class LandingScreen extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={globalStyles.blueBackgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require('../../../assets/logo.png')} />
                </View>

                <View style={styles.landingTitleContainer}>
                    <Text style={styles.landingTitle}>Clean Home Clean Life.</Text>
                </View>

                <View style={styles.landingSubtitleContainer}>
                    <Text style={styles.landingSubtitle}>Book Cleaner at the Comfort of you home.</Text>
                </View>

                <Text style={styles.landingSubtitle}>保洁端</Text>

                <View style={styles.landingImageContainer}>
                    <Image style={styles.landingImage} source={require('../../../assets/landingScreen/landingImage.png')} />
                </View>

                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('StartScreen')}
                    >
                        <View style={globalStyles.whiteLargeButton}>
                            <Text style={globalStyles.blueButtonText}>开始</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '14.67%',
        paddingTop: 60,
    },
    logoImage: {
        width: 80
    },
    landingTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    landingSubtitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0.15 * screenWidth,
        paddingVertical: 0.05 * screenWidth,
    },
    landingTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    landingSubtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center'
    },
    landingImageContainer: {
    },
    landingImage: {
        width: screenWidth
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
