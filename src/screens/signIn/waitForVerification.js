import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { AntDesign } from '@expo/vector-icons';

class WaitForVerification extends Component {
    
	componentDidMount() {}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<AntDesign
						name="exclamationcircleo"
						color="#FF2020"
						size={120}
						style={{ marginTop: 45, marginBottom: 35 }}
					/>
				</View>

				<Text style={styles.cancelOverlayTitleStyle}>您好，您的账号正在等待审核，如有问题，请联系客服</Text>

				<View style={globalStyles.bottomSingleButtonContainer}>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerServiceForm')}>
						<View style={globalStyles.yellowLargeButton}>
							<Text style={globalStyles.blackButtonText}>联系客服</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(WaitForVerification);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	policyText: {
		color: '#6C6C6C',
		fontSize: 12,
		marginBottom: 20,
	},
});
