import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

class ServicePolicy extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>ServicePolicy文字内容</Text>

                <View style={globalStyles.bottomSingleButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CustomerServiceForm')}>
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
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePolicy);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
