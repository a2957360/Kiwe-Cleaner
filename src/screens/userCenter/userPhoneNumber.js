import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

class UserPhoneNumber extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我的手机号</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPhoneNumber);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
