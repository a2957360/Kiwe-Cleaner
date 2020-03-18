import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

import LandingScreen from './screens/signIn/landingScreen';
import StartScreen from './screens/signIn/startScreen';
import PhoneNumberSignIn from './screens/signIn/phoneNumberSignIn';
import CleanerApplicationForm from './screens/signIn/cleanerApplicationForm';
import WaitForVerification from './screens/signIn/waitForVerification';

import TaskPool from './screens/taskPool/taskPool';

import MyTaskIncompleted from './screens/myTask/myTaskIncompleted';
import MyTaskCompleted from './screens/myTask/myTaskCompleted';
import MyTaskDetail from './screens/myTask/myTaskDetail';
import CleanerCheckinForm from './screens/myTask/cleanerCheckInForm';
import CustomerServiceForm from './screens/myTask/customerServiceForm';
import MyTaskComment from './screens/myTask/myTaskComment';

import UserCenter from './screens/userCenter/userCenter';
import UserPhoneNumberCheck from './screens/userCenter/userPhoneNumberCheck';
import UserPhoneNumberChange from './screens/userCenter/userPhoneNumberChange';
import UserAddress from './screens/userCenter/userAddress';
import UserAddressForm from './screens/userCenter/userAddressForm';
import MyWallet from './screens/userCenter/myWallet';

import ServicePolicy from './screens/servicePolicy/servicePolicy';

const Stack = createStackNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

class KiweApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
	}

	componentDidMount = () => {};

	componentDidUpdate = prevProps => {
		if (
			prevProps.userSignInMessage !== this.props.userSignInMessage &&
			this.props.userSignInMessage === 'success'
		) {
			if (this.props.userSignInData.userState === '1') {
				this.setState({ isLoggedIn: true });
			}
		}

		if (
			prevProps.userSignOutMessage !== this.props.userSignOutMessage &&
			this.props.userSignOutMessage === 'success'
		) {
			this.setState({ isLoggedIn: false });
		}
	};

	getBottomTitle = route => {
		const routeName = route.state ? route.state.routes[route.state.index].name : route.params?.screen || 'TaskPool';

		switch (routeName) {
			case 'TaskPool':
				return '任务池';
			case 'UserCenter':
				return '个人中心';
			case 'MyTask':
				return '我的任务';
		}
	};

	myTaskTopTabs = () => {
		return (
			<MaterialTopTabs.Navigator
				tabBarOptions={{
					labelStyle: { fontSize: 15, fontWeight: 'bold' },
					indicatorStyle: {
						color: '#65A3FF',
						width: 77,
						height: 3,
						marginHorizontal: 55,
					},
				}}
			>
				<MaterialTopTabs.Screen
					name="MyTaskIncompleted"
					component={MyTaskIncompleted}
					options={{
						title: '未完成的',
					}}
				/>
				<MaterialTopTabs.Screen
					name="MyTaskCompleted"
					component={MyTaskCompleted}
					options={{
						title: '已完成的',
					}}
				/>
			</MaterialTopTabs.Navigator>
		);
	};

	homeBottomTabs = ({ navigation, route }) => {
		navigation.setOptions({ headerTitle: this.getBottomTitle(route) });

		return (
			<MaterialBottomTabs.Navigator
				activeColor="#65A3FF"
				inactiveColor="#3e2465"
				barStyle={{
					backgroundColor: 'white',
					height: 85,
					paddingTop: 8,
				}}
			>
				<MaterialBottomTabs.Screen
					name="TaskPool"
					component={TaskPool}
					options={{
						headerStyle: {
							backgroundColor: '#FFFFFF',
							shadowColor: 'transparent',
							height: 1185,
						},
						tabBarLabel: <Text style={styles.bottomTabText}>任务池</Text>,
						tabBarIcon: ({ color }) => (
							<MaterialIcons name="list" color={color} size={20} style={styles.bottomTabIcon} />
						),
					}}
				/>
				<MaterialBottomTabs.Screen
					name="MyTask"
					component={this.myTaskTopTabs}
					options={{
						tabBarLabel: <Text style={styles.bottomTabText}>我的任务</Text>,
						tabBarIcon: ({ color }) => (
							<FontAwesome name="tasks" color={color} size={20} style={styles.bottomTabIcon} />
						),
					}}
				/>
				<MaterialBottomTabs.Screen
					name="UserCenter"
					component={UserCenter}
					options={{
						tabBarLabel: <Text style={styles.bottomTabText}>个人中心</Text>,
						tabBarIcon: ({ color }) => (
							<FontAwesome name="user" color={color} size={20} style={styles.bottomTabIcon} />
						),
					}}
				/>
			</MaterialBottomTabs.Navigator>
		);
	};

	homeStack = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={this.homeBottomTabs}
					options={{
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
					}}
				/>
				<Stack.Screen
					name="MyWallet"
					component={MyWallet}
					options={{
						title: '我的钱包',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="UserPhoneNumberCheck"
					component={UserPhoneNumberCheck}
					options={{
						title: '',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="UserPhoneNumberChange"
					component={UserPhoneNumberChange}
					options={{
						title: '',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="UserAddress"
					component={UserAddress}
					options={{
						title: '我的地址',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="UserAddressForm"
					component={UserAddressForm}
					options={{
						title: '添加地址',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="MyTaskDetail"
					component={MyTaskDetail}
					options={{
						title: '加载中...',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					name="CustomerServiceForm"
					component={CustomerServiceForm}
					options={{
						title: '联系客服',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="CleanerCheckinForm"
					component={CleanerCheckinForm}
					options={{
						title: '确认单位',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="MyTaskComment"
					component={MyTaskComment}
					options={{
						title: '评论',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="ServicePolicy"
					component={ServicePolicy}
					options={{
						title: '服务条款和隐私政策',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
			</Stack.Navigator>
		);
	};

	signInStack = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="LandingScreen"
					component={LandingScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="StartScreen"
					component={StartScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="PhoneNumberSignIn"
					component={PhoneNumberSignIn}
					options={{
						title: ' ',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="CleanerApplicationForm"
					component={CleanerApplicationForm}
					options={{
						title: '完善信息',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="WaitForVerification"
					component={WaitForVerification}
					options={{
						title: '等待验证',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
				<Stack.Screen
					name="ServicePolicy"
					component={ServicePolicy}
					options={{
						title: '服务条款和隐私政策',
						headerBackTitleVisible: false,
						headerStyle: styles.stackHeader,
						headerTitleStyle: styles.stackHeaderTitle,
						headerTintColor: 'black',
					}}
				/>
			</Stack.Navigator>
		);
	};

	render() {
		console.disableYellowBox = true;

		return (
			<NavigationContainer>
				{this.state.isLoggedIn ? <>{this.homeStack()}</> : <>{this.signInStack()}</>}
			</NavigationContainer>
		);
	}
}

function mapStateToProps({ signInData }) {
	const { userSignInMessage, userSignOutMessage, userSignInData } = signInData;
	return { userSignInMessage, userSignOutMessage, userSignInData };
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(KiweApp);

const styles = StyleSheet.create({
	stackHeader: {
		backgroundColor: '#FFFFFF',
		shadowColor: 'transparent',
		height: 85,
	},
	stackHeaderTitle: {
		color: '#1C1D27',
		fontSize: 18,
	},
	stackHeaderTint: {
		color: '#fff',
	},
	stackHeaderBackTitle: {
		color: '#fff',
	},
	bottomTabText: {
		fontSize: 10,
	},
});
