import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

function Loading({ visible }) {
    return (<>
            <Spinner
                visible={visible}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
    </>);
}



const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default Loading;
