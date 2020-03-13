import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

class ServicePolicy extends Component {
	componentDidMount() {}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ marginHorizontal: 15, marginTop: 30 }}>
					<Text style={styles.policyText}>
						1.1为了以创建账户、识别用户、回应查询和邮件等方式来为您提供服务、改进软件性能和外观、推荐新功能/新产品等目的，本软件开发者会要求您提供个人信息（包括但不限于您的姓名、电话号码、电子邮件地址等），并且会收集其他与您相关的信息（包括但不限于设备信息、日志信息、位置信息以及其他类似的特征记录）。
					</Text>

					<Text style={styles.policyText}>
						1.2本软件开发者的用户体验改进计划是基于对使用数据的统计，来诊断系统问题，优化产品体验的计划。我们会使用
						Google Analytics
						等工具统计您在使用本软件开发者的产品（包括体重小本App）过程中产生的数据信息。我们在用户体验改进计划中仅会累计所有用户的总体使用数据，不会收录或上传任何涉及您个人身份信息的内容。前述统计内容包括但不限于：应用启动数，页面访问数，重点按钮点击数，设置项的配置属性等。随着本软件开发者产品的后续版本升级，我们统计的范围会有所改变，您下载/安装/使用后续版本本软件开发者产品的行为将被视为您对届时相关改变的同意。
					</Text>

					<Text style={styles.policyText}>
						1.3本软件开发者可能会将您通过自己的帐户提交的信息与开发者的其他服务或第三方的信息相结合，以便为您提供更好的体验并提高本软件开发者的服务质量。
					</Text>

					<Text style={styles.policyText}>
						1.4本软件开发者的产品和服务中可能含有第三方产品和/或服务的链接或信息。如果您将个人信息填写在其他平台上或通过第三方程序提交/发布，则该方可能会获知您的信息。该第三方应用程序可能有其相应的隐私政策规定，请仔细查看，并在提供个人信息前请仔细考虑清楚。本隐私政策不适用于第三方向您收集信息的行为，本软件开发者无法控制第三方的行为，因此也不会对第三方收集、使用您信息的行为承担责任。
					</Text>

					<Text style={styles.policyText}>
						1.5本软件开发者将严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息。除非持有本软件开发者官方出具的授权文件，否则本软件开放者的具体工作人员不会直接向您索要个人信息。如遇此类情况，您可以直接与本软件开发者联系。
					</Text>
				</View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ServicePolicy);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
    },
    policyText: {
        color: '#6C6C6C', 
        fontSize: 12,
        marginBottom: 20
    }
});
