import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { screenWidth, screenHeight } from '../../variables/appVariables';

class LandingScreen extends Component {
	componentDidMount() {}

	render() {
		console.log(screenWidth, screenHeight);
		return (
			<View style={globalStyles.blueBackgroundContainer}>
				<View style={styles.logoContainer}>
					<Image resizeMode="contain" style={styles.logoImage} source={require('../../../assets/logo.png')} />
				</View>

				<View style={styles.landingTitleContainer}>
					<Text style={styles.landingTitle}>Clean Home Clean Life.</Text>
				</View>

				<View style={styles.landingSubtitleContainer}>
					<Text style={styles.landingSubtitle}>Book Cleaner at the Comfort of you home.</Text>
				</View>

				<View style={styles.landingSubtitleContainer}>
					<Text style={styles.landingSubtitle}>保洁端</Text>
				</View>

				<View style={styles.landingImageContainer}>
					<Image
						style={styles.landingImage}
						source={require('../../../assets/landingScreen/landingImage.png')}
					/>
				</View>

				<View style={styles.bottomButtonContainer}>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('StartScreen')}>
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
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);

const styles = StyleSheet.create({
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '3%',
		marginTop: 70,
		marginBottom: 20,
	},
	logoImage: {
		flex: 1,
	},
	landingTitleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
	},
	landingSubtitleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 0.05 * screenWidth,
	},
	landingTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		width: 0.6 * screenWidth,
	},
	landingSubtitle: {
		fontSize: 20,
		fontWeight: '400',
		color: 'white',
		textAlign: 'center',
		width: 0.7 * screenWidth,
	},
	landingImageContainer: {
		flex: 0.8,
		justifyContent: 'center',
	},
	landingImage: {
		width: '100%',
		height: '80%',
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
		alignItems: 'center',
	},
});
