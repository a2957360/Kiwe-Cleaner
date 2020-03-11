import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';

import Card from '../../components/card';

const comments = [
    { title: '评论1', rating: 5, body: 'lorem ipsum', key: '1' },
    { title: '评论2', rating: 4, body: 'lorem ipsum', key: '2' },
    { title: '评论3', rating: 3, body: 'lorem ipsum', key: '3' },
];

class UserComments extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card>
                            <Text>{item.title}</Text>
                        </Card>
                    )} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserComments);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
