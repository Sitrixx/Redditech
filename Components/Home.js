import React, {useState, useEffect, PureComponent} from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, ScrollView, FlatList, Alert } from 'react-native';
import * as cs from '../Constants/Constants';
import { CustomPicker } from 'react-native-custom-picker'
import * as api from '../Constants/Constants';

const Home = ({route, navigation}) => {
    const [icon, setIconImage] = useState('')
    const [selectedId, setSelectedId] = useState(null);
    const [posts, setPosts] = useState(null);
    const options = ['🚀 TOP POSTS', '🔥 HOT POSTS', '✨ NEW POSTS']
    const res = api.SUB_URL(icon, 0, icon.indexOf('?'))
    
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#18469C" : "#E4E3E3";
        const color = item.id === selectedId ? 'white' : '#ababab';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const filterPosts = async (value) => {
        if (value == null) {
            const random_subposts = await fetch("https://oauth.reddit.com/.json?limit=30", {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await random_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setPosts(post);
        }
        if (value == "🚀 TOP POSTS") {
            const best_subposts = await fetch(`https://oauth.reddit.com/top.json?limit=30`, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await best_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setPosts(post);
        }
        if (value == "🔥 HOT POSTS") {
            const hot_subposts = await fetch(`https://oauth.reddit.com/hot.json?limit=30`, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await hot_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setPosts(post);
        }
        if (value == "✨ NEW POSTS") {
            const new_subposts = await fetch(`https://oauth.reddit.com/new.json?limit=30`, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await new_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setPosts(post);
        }
    }

    const Posts = ({ subredditIcon, subredditName, subredditUser, subredditVote, subredditDesc, subredditImages, subredditComments, subredditSelf, subredditMedia, subredditMediaHandle }) => (
        <View style={!subredditSelf ? styles.posts_wImage : styles.posts}>
            <View style={styles.posts__container}>
                <View style={styles.posts__top}>
                    <TouchableOpacity onPress={() => navigation.replace('Subreddits', {paramKey: route.params.paramKey, subName: subredditName})}>
                        <Image style={styles.posts__image} source={subredditIcon ? {
                                            uri: subredditIcon
                                        } : null}/>
                    </TouchableOpacity>
                    <View style={styles.posts__container__nameHour}>
                        <Text style={styles.posts_title}>
                            {subredditName}
                        </Text>
                        <Text style={styles.posts_hours}>
                            u/{subredditUser}
                        </Text>
                    </View>
                </View>
                <View style={!subredditSelf ? styles.posts__middle_wIcon : styles.posts__middle}>
                    <Text numberOfLines={4} ellipsizeMode='tail' style={!subredditSelf ? styles.posts__image__wIcon : styles.posts__description}>{subredditDesc}</Text>
                    <Image style={!subredditSelf ? styles.posts_image : styles.posts_image_nothing} source={!subredditSelf ? {
                                            uri: subredditImages
                                        } : null}/>
                </View>
                <View style={styles.posts__bottom}>
                    <View style={styles.posts__bottom__container}>
                        <TouchableOpacity style={styles.posts__bottom__comments}>
                            <Image source={require('../assets/comment.png')} style={styles.comments}/>
                            <Text style={styles.numComments}>{subredditComments}</Text>
                        </TouchableOpacity>
                        <View style={styles.posts__bottom__votes}>
                            <TouchableOpacity onPress={() => console.log(subredditMedia)}>
                                <Image source={require('../assets/up-arrow.png')} style={styles.posts_down_vote}/>
                            </TouchableOpacity>
                            <Text style={styles.posts__votes}>{subredditVote}</Text>
                            <TouchableOpacity> 
                                <Image source={require('../assets/down-arrow.png')} style={styles.posts_down_vote}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
    
    const renderPosts = ({ item }) => (
        <Posts subredditIcon={res.toString()} subredditName={item.subreddit_name_prefixed.toString()} subredditUser={item.author.toString()} subredditVote={item.ups.toString()} subredditDesc={item.title.toString()} subredditImages={item.thumbnail.toString()} subredditComments={item.num_comments.toString()} subredditSelf={item.is_self} subredditMedia={item.media} subredditMediaHandle={item.media = "null" ? null : item.media}/>
    );

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            });
            const json = await response.json();
            setIconImage(json.icon_img);
        } catch (err) {
            console.log("error", err);
        }
    }

    useEffect(() => {
        fetchData('https://oauth.reddit.com/api/v1/me');
        filterPosts();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.home__header}>
                <View style={styles.home__header__row}>
                    <View style={styles.home__header__row__spacing}>
                        <View style={styles.home__header__row__left}>
                            <TouchableOpacity onPress={() => navigation.push('Profile', {paramKey: route.params.paramKey})} style={styles.home__header__profile}>
                                <Image source={res ? {
                                        uri: res
                                    } : null} style={styles.home__header__profile__picture}></Image>
                            </TouchableOpacity>
                            <Text style={styles.home__text}>Home</Text>
                        </View>
                        <View style={styles.home__header__row__right}>
                            <TouchableOpacity onPress={() => navigation.navigate('Search', {paramKey: route.params.paramKey})}>
                                <Image style={styles.home__header__row__right__picture} source={require('../assets/loupe.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.home__header__filters}>
                    <FlatList
                        columnWrapperStyle={{justifyContent: 'space-around',}}
                        numColumns={3}
                        scrollEnabled={false}
                        data={cs.DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                </View>
            </View>
            <View style={styles.home__picker}>
                <CustomPicker
                    placeholder={'FILTER ▼'}
                    options={options}
                    optionTemplateProps={{textStyle: {
                        color: '#969595',
                        fontSize: 16,
                        fontWeight: '800',
                    }}}
                    fieldTemplateProps={{textStyle: {
                        color: '#A5A5A5',
                        fontSize: 16,
                        fontWeight: '800',
                    }}}
                    onValueChange={value => {
                        filterPosts(value); console.log(value);
                    }}
                />
            </View>
            <View style={styles.home__posts__container}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderPosts}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        flex: 1,
    },
    home__header: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '21%',
        backgroundColor: '#F0F0F0'
    },
    home__header__row: {
        width: '100%',
        height: '70%',
    },
    home__header__row__spacing: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    home__header__row__left: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '86%',
    },
    home__header__row__right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    home__text: {
        fontSize: 29,
        textAlign: 'center',
        fontWeight: '700',
    },
    home__header__profile__picture: {
        width: 40,
        height: 40,
        borderRadius: 7,
    },
    home__header__profile: {
        shadowColor: '#A0A0A0',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.7,
        margin: '5%',
    },
    home__header__filters: {
        flexDirection: 'row',
        backgroundColor: '#E4E3E3',
        alignItems: 'center',
        width: '90%',
        height: '26%',
        borderRadius: 13,
    },
    home__picker: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    home__picker__text: {
        marginLeft: 20,
        color: '#969595',
        fontSize: 16,
        fontWeight: 'bold'
    },
    home__posts__scroll: {
        width: '100%',
        height: '100%',
    },
    home__posts__container: {
        flex: 5,
    },
    item: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        alignSelf: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    home__header__row__right__picture: {
        width:27,
        height:27,
    },
    posts: {
        width: '88%',
        height: 220,
        marginBottom: 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#AFAFAF',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
    },
    posts_wImage: {
        width: '88%',
        height: 420,
        marginBottom: 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#AFAFAF',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
    },
    posts__container: {
        height: 190,
        width: '93%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    posts__image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: '5%',
        alignItems: 'center',
    },
    posts__top: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    posts_title: {
        color: 'black',
        fontSize: 13,
        fontWeight: '600',
    },
    posts__middle: {
        width: '100%',
        height: '55%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
    },
    posts__middle_wIcon: {
        width: '100%',
        height: '155%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
    },
    posts_image: {
        width: '100%',
        height: '65%',
        borderRadius: 18,
    },
    posts_image_nothing: {
    },
    posts__description: {
        fontSize: 20,
        width: '100%',
    },
    posts__image__wIcon: {
        fontSize: 18,
        width: '100%',
        marginBottom: 10,
    },
    posts__bottom: {
        flexDirection: 'row',
        width: '100%',
        height: '24%',
        justifyContent: 'flex-end',
    },
    posts__container__nameHour: {
        flexDirection: 'column',
    },
    posts_hours: {
        color: '#242424',
        fontSize: 11,
        fontWeight: '500',
    },
    posts__bottom__container: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    posts_down_vote: {
        width: 15,
        height: 14,
    },
    posts__bottom__votes: {
        width: '30%',
        flexDirection: 'row',
        height: 32,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#E6E6E6'
    },
    posts__votes: {
        color: '#868686',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 2,
    },
    comments: {
        width: 22,
        height: 22,
        marginLeft: 10,
        marginRight: 7
    },
    numComments: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
    posts__bottom__comments: {
        flexDirection: 'row',
    }
})

export default Home
