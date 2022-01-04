import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import * as api from '../Constants/Constants'

const Profile = ({route, navigation}) => {
    const [name, setUsername] = useState("")
    const [background, setBackground] = useState("")
    const [icon, setIconImage] = useState('')
    const [description, setDescription] = useState('')

    const res = api.SUB_URL(icon, 0, icon.indexOf('?'))
    const res2 = api.SUB_URL(background, 0, background.indexOf('?'))

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech"
                }
            });
            const json = await response.json();
            setUsername(json.name);
            setDescription(json.subreddit.public_description);
            setIconImage(json.icon_img);
            setBackground(json.subreddit.banner_img);
        } catch (err) {
            console.log("error", err);
        }
    }

    useEffect(() => {
        fetchData('https://oauth.reddit.com/api/v1/me/')
    })

    return (
      <View style={styles.main_container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <Image style={styles.home__header__profile__background__image} source={res ? {
                    uri: res2
                }: null }/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace('Home', {paramKey: route.params.paramKey})} style={styles.home__header__profile__left}>
                <Image style={styles.home__header__profile__back} source={require('../assets/left-arrow-back-pngrepo-com.png')}/>
            </TouchableOpacity>
        </View>
        <View style={styles.main_view}>
            <TouchableOpacity>
                <View style={styles.head_image}>
                    <Image style={styles.profileImage} source={res ? {
                                            uri: res
                                        } : null} />
                </View>
            </TouchableOpacity>
            <Text style={styles.pseudo}>u/{name}</Text>
            <View style={styles.main_page}>
                <Image source={require('../assets/left-quote-2.png')} style={styles.quotes__left}/>
                <Text style={styles.description}>{description}</Text>
                <Image source={require('../assets/right-quote-sign.png')} style={styles.quotes__right}/>
            </View>
            <TouchableOpacity style={styles.row_view}>
                <View style={styles.row_second}>
                    <Image source={require('../assets/history.png')} style={styles.icons}/>
                    <Text style={styles.row_text}>History</Text>
                </View>
                <View style={styles.row_third}>
                    <Image source={require('../assets/right-arrow-2.png')} style={styles.icons}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row_view}>
                <View style={styles.row_second}>
                    <Image source={require('../assets/sub.png')} style={styles.icons}/>
                    <Text style={styles.row_text}>Subscriptions</Text>
                </View>
                <View style={styles.row_third}>
                    <Image source={require('../assets/right-arrow-2.png')} style={styles.icons}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row_view} onPress={() => navigation.navigate('Settings', {paramKey: route.params.paramKey})}>
                <View style={styles.row_second}>
                    <Image source={require('../assets/cogwheel.png')} style={styles.icons}/>
                    <Text style={styles.row_text}>Settings</Text>
                </View>
                <View style={styles.row_third}>
                    <Image source={require('../assets/right-arrow-2.png')} style={styles.icons}/>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    profileImage: {
        borderRadius: 27,
        borderWidth: 4.4,
        borderColor: '#FFFFFF',
        width: 100,
        height: 100,
        top: -50,
    },
    header: {
        width: '100%',
        height: '20%',
        zIndex: 7,
    },
    pseudo: {
        marginTop: 25,
        alignSelf: 'center',
        fontSize: 23,
        marginBottom: 20,
        letterSpacing: 1,
        fontWeight: '500',
    },
    inscription: {
        alignSelf: 'center',
        marginTop: 5,
        fontStyle: 'italic',
        color: '#3d3d3d',
    },
    head_background: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: 210,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    home__header__profile__left: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'white',
        marginTop: 50,
        marginLeft: 20,
        shadowColor: '#1D1D1D',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.3,
        zIndex: 1000,
        top: -170,
    },
    home__header__profile__right: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'white',
        marginTop: 50,
        marginRight: 20,
        shadowColor: '#1D1D1D',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.3,
        top: -260,
        left: 360,
        zIndex: 1000
    },
    home__header__profile__back: {
        width: 21,
        height: 21,
        top: '24%',
        left: '19%',
    },
    home__header__profile__gear: {
        width: 26,
        height: 26,
        top: '17%',
        left: '17%',
    },
    home__header__profile__background__image: {
        width: '100%',
        height: '110%',
        zIndex: 11,
    },
    home__header__background: {
        width: '100%',
        height: 384,
    },
    main_view: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        zIndex: 10,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        flexDirection: 'column',
    },
    head_image: {
        height:50,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.40,
        shadowRadius: 16.00,
    },
    main_page: {
        flexDirection: 'row',
        width: '87%',
        height: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    description: {
        fontSize: 15,
        color: '#AAAAAA',
        fontWeight: '400',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center'
    },
    quotes__left: {
        width: 13,
        height: 13,
        alignSelf: 'flex-start'
    },
    quotes__right: {
        width: 13,
        height: 13,
        alignSelf: 'flex-end'
    },
    row_view: {
        flexDirection: 'row',
        width: '87%',
        height: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 10
    },
    row_text: {
        color: '#3F3F3F',
        fontWeight: '600',
        fontSize: 15
    },
    icons: {
        width: 21,
        height: 21,
        marginRight: 19,
        marginLeft: 23
    },
    row_second: {
        flexDirection: 'row',
        width: '86%',
    },
})

export default Profile