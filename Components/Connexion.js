import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import ButtonWithBackground from './Buttons/Button';
import Logo from '../assets/mytems.png';
import uuid from 'react-native-uuid';
import axios from 'axios';
import base64 from 'react-native-base64';

WebBrowser.maybeCompleteAuthSession();

const client_id = CLIENT_ID;
const client_secret = '';

const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
};

const Connexion = ({navigation}) => {
    const [token, setToken] = useState('')
    const [request, response, promptAsync] = useAuthRequest({
        responseType: ResponseType.Code,
        clientId: '8SebBj5hj7sB3FmKYd4gfQ',
        state: uuid.v4(),
        scopes: ['identity', 'account', 'mysubreddits', 'read', 'subscribe', 'history', 'edit'],
        redirectUri: makeRedirectUri({scheme: 'exp://10.41.176.182:19000'}), // exp://127.0.0.1:19000 for iOS Simulator and exp://192.168.1.29:19000 for iOS App
    }, discovery);

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            axios({
                method: 'POST',
                url: 'https://www.reddit.com/api/v1/access_token',
                data: `grant_type=authorization_code&code=${code}&redirect_uri=exp://127.0.0.1:19000`, // Be careful redirect uri 10.41.155.13:19000 / on reddit site too !!!
                headers: {
                    "Authorization": `Basic ${base64.encode(client_id+':'+client_secret)}`,
                    "content-type": "application/x-www-form-urlencoded"
                },
            }).then((res) => {
                const access_token = res.data['access_token']
                const new_access_token = String(access_token)
                console.log(new_access_token)
                navigation.replace('Home', {
                    paramKey: new_access_token,
                })
            })
        }
    }, [response]);

    return(
        <View style={styles.connexion__view}>
            <View style={styles.connexion__second__view}>
                <Image source={Logo} style={styles.connexion__image}></Image>
                <Text style={styles.connexion__text}>Vous devez vous connecter en OAuth pour accéder à l'application</Text>
                <ButtonWithBackground style={styles.connexion__button} text='Connexion avec OAuth' color='black' disabled={!request}    
                onPress={() => {promptAsync();}}>Connexion avec OAuth</ButtonWithBackground>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    connexion__view: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    connexion__second__view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blue',
    },
    connexion__text: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: '500'
    },
    connexion__image: {
        width: 200,
        height: 200,
    }
})

export default Connexion
