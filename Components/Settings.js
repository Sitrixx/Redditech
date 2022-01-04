import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from "axios"

const Settings = ({route, navigation}) => {

    const [no_profanity, setProfanity] = useState(null)
    const [karma, setTopKarma] = useState(null)
    const [over_18, setOver18] = useState(null)
    const [ads, setAds] = useState(null)
    const [rec, setRecommendations] = useState(null)
    const [feed, setFeed] = useState(null)

    const getData = async () => {
        const settings = await fetch("http://oauth.reddit.com/api/v1/me/prefs", {
            headers: {
                Authorization: `bearer ${route.params.paramKey}`,
                "User-Agent": "ChangeMeClient/0.1 by enzotech",
            }
        })
        const json = await settings.json();
        setProfanity(json.no_profanity);
        setTopKarma(json.top_karma_subreddits);
        setOver18(json.over_18);
        setAds(json.activity_relevant_ads);
        setRecommendations(json.show_location_based_recommendations);
        setFeed(json.feed_recommendations_enabled);
    }

    const changeSettings = (name, settings) => {
        if (name === "rec") {
            axios({
                method: 'patch',
                url: 'https://oauth.reddit.com/api/v1/me/prefs',
                headers: {
                    "Authorization": `Bearer ${route.params.paramKey}`,
                    "Content-type": "application/json",
                },
                data: {
                    show_location_based_recommendations: !settings
                }
            }).then((res) => {
                setRecommendations(!settings);
            })
        }
        else if (name === "ads") {
            axios({
                method: 'patch',
                url: 'https://oauth.reddit.com/api/v1/me/prefs',
                headers: {
                    "Authorization": `Bearer ${route.params.paramKey}`,
                    "Content-type": "application/json",
                },
                data: {
                    activity_relevant_ads: !settings
                }
            }).then((res) => {
                setAds(!settings);
            })
        }
        else if (name === "karma") {
            axios({
                method: 'patch',
                url: 'https://oauth.reddit.com/api/v1/me/prefs',
                headers: {
                    "Authorization": `Bearer ${route.params.paramKey}`,
                    "Content-type": "application/json",
                },
                data: {
                    top_karma_subreddits: !settings
                }
            }).then((res) => {
                setTopKarma(!settings);
            })
        }
        else if (name === "no_profanity") {
            if (over_18) {
                axios({
                    method: 'patch',
                    url: 'https://oauth.reddit.com/api/v1/me/prefs',
                    headers: {
                        "Authorization": `Bearer ${route.params.paramKey}`,
                        "Content-type": "application/json",
                    },
                    data: {
                        no_profanity: !settings
                    }
                }).then((res) => {
                    setProfanity(!settings);
                })
            }
            else
                console.log("PAS MAJEUR")
        }
        else if (name === "over_18") {
            axios({
                method: 'patch',
                url: 'https://oauth.reddit.com/api/v1/me/prefs',
                headers: {
                    "Authorization": `Bearer ${route.params.paramKey}`,
                    "Content-type": "application/json",
                },
                data: {
                    over_18: !settings
                }
            }).then((res) => {
                setOver18(!settings);
            })
        }
        else if (name === "feed") {
            axios({
                method: 'patch',
                url: 'https://oauth.reddit.com/api/v1/me/prefs',
                headers: {
                    "Authorization": `Bearer ${route.params.paramKey}`,
                    "Content-type": "application/json",
                },
                data: {
                    feed_recommendations_enabled: !settings
                }
            }).then((res) => {
                setFeed(!settings);
            })
        }
    }

    useEffect(() => {
        getData()
    })

    return (
      <View style={styles.main_container}>
        <View style={styles.display_column}>
        <Text style={styles.settings}>Settings</Text>
            <TouchableOpacity onPress={() => changeSettings("rec",rec)} style={styles.row_view}>
                <View style={styles.row_second}>
                    <Text style={styles.row_text}>Show recommendations : </Text>
                    <Text style={styles.row_text}>{rec ? "true" : "false"}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSettings("ads", ads)} style={styles.row_view}>
                <View style={styles.row_second}>
                    <Text style={styles.row_text}>Activity relevant ads : </Text>
                    <Text style={styles.row_text}>{ads ? "true" : "false"}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSettings("karma", karma)} style={styles.row_view}>
                <View style={styles.row_second}>
                    <Text style={styles.row_text}>Top karma subreddits : </Text>
                    <Text style={styles.row_text}>{karma ? "true" : "false"}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSettings("no_profanity", no_profanity)} style={styles.row_view}>
                <View style={styles.row_second}>
                    <Text style={styles.row_text}>No profanity : </Text>
                    <Text style={styles.row_text}>{no_profanity ? "true" : "false"}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSettings("over_18", over_18)} style={styles.row_view}>
                <View style={styles.row_second}>
                    <Text style={styles.row_text}>Over 18 : </Text>
                    <Text style={styles.row_text}>{over_18 ? "true" : "false"}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSettings("feed", feed)} style={styles.row_view}>
                <View style={styles.row_second}>
                    <Text style={styles.row_text}>Feed recommendations : </Text>
                    <Text style={styles.row_text}>{feed ? "true" : "false"}</Text>
                </View>
            </TouchableOpacity>
        </View>
            <TouchableOpacity onPress={() => navigation.replace('Home', {paramKey: route.params.paramKey})} style={styles.home__header__profile}>
                <Image style={styles.home__header__profile__picture} source={require('../assets/left-arrow-back-pngrepo-com.png')}/>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        height: '16%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    home__header__profile: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: 'white',
        shadowColor: '#1D1D1D',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.3,
        left: -144,
        top: -10
    },
    home__header__profile__picture: {
        width: 26,
        height: 26,
        top: '24%',
        left: '19%',
    },
    row_view: {
        flexDirection: 'row',
        width: '87%',
        height: '11%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    row_text: {
        color: '#3F3F3F',
        fontWeight: '600',
        fontSize: 17
    },
    row_second: {
        flexDirection: 'row',
        width: '86%',
    },
    settings: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop:40,
    },
    display_column: {
        marginTop: 30,
    }
})

export default Settings