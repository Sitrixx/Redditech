import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView, Image, Button, Alert} from 'react-native';
import * as constants from '../Constants/Constants';
import Logo from '../assets/mytems.png';

const SplashScreen = ({navigation}) => {

    setTimeout(() => {
        navigation.replace('Connexion')
    }, 3000);

    return(
        <View style={styles.splash__view}>
            <Animated.View style={styles.splash__animated__view}>
                <Image source={Logo} style={styles.splash__animated__image}></Image>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    splash__view: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: constants.BGCOLOR
    },
    splash__animated__view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    splash__animated__image: {
        width: 300,
        height: 300,
    },
})

export default SplashScreen