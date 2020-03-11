import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import { AntDesign, Entypo } from '@expo/vector-icons';

import { ListItem } from 'react-native-elements';

import { getUserAddressData } from '../../actions/user';

import PageLoading from '../../components/pageLoading';

class UserAddress extends Component {

    componentDidMount() {
        this.props.getUserAddress(this.props.userSignInData.userId);
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.updating === true && this.props.updating === false) {
            this.props.getUserAddress(this.props.userSignInData.userId);
        }
    };

    render() {
        let userAddressData;

        if (this.props.userAddressData === undefined) {
            return <PageLoading />
        } else {
            userAddressData = this.props.userAddressData;
            return (
                <View style={styles.container}>
                    <View style={{ marginBottom: 20 }}>
                        {
                            userAddressData.map((item, index) => (
                                <ListItem
                                    key={index}
                                    containerStyle={{ paddingVertical: 10, paddingLeft: 20 }}
                                    title={`${item.streetName}` + `, ` + `${item.cityName}`}
                                    titleStyle={{ color: '#1C1D27', fontSize: 16 }}
                                    chevron={
                                        <Entypo
                                            name='chevron-small-right'
                                            color='#1C1D27'
                                            size={30}
                                            style={{ paddingTop: 4 }}
                                        />}
                                    topDivider={true}
                                    bottomDivider={true}
                                    onPress={() => this.props.navigation.navigate('UserAddressForm', item)}
                                />
                            ))
                        }
                        <ListItem
                            containerStyle={{ paddingVertical: 10, paddingLeft: 20 }}
                            leftIcon={
                                <AntDesign
                                    name='plus'
                                    color='#1C1D27'
                                    size={20}
                                    style={{ paddingTop: 2 }}
                                />}
                            title='添加新地址'
                            titleStyle={{ color: '#1C1D27', fontSize: 16 }}
                            chevron={
                                <Entypo
                                    name='chevron-small-right'
                                    color='#1C1D27'
                                    size={30}
                                    style={{ paddingTop: 4 }}
                                />}
                            topDivider={true}
                            bottomDivider={true}
                            onPress={() => this.props.navigation.navigate('UserAddressForm')}
                        />
                    </View>
                </View>
            );
        }
    }
}

function mapStateToProps({ signInData, userData }) {
    const { userSignInData } = signInData;
    const { updating, userAddressData } = userData;
    return { userSignInData, updating, userAddressData };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserAddress: (data) => {
            dispatch(getUserAddressData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

});
