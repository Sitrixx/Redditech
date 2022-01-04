import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Dimensions, FlatList } from 'react-native'
import * as api from '../Constants/Constants'
import { CustomPicker } from 'react-native-custom-picker'
import axios from 'axios';

const Subreddits = ({route, navigation}) => {
    const [name, setUsername] = useState("")
    const [background, setBackground] = useState("")
    const [icon, setIconImage] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [subs, setSubs] = useState('')
    const [isSub, setSubUnsub] = useState('')
    const [subPosts, setSubredditsPosts] = useState(null)
    const subName = route.params.subName
    const options = ['🚀 TOP POSTS', '🔥 HOT POSTS', '✨ NEW POSTS']
    const res = api.SUB_URL(icon, 0, icon.indexOf('?'))

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech"
                }
            });
            const json = await response.json();
            setUsername(json.data.display_name_prefixed);
            setDescription(json.data.title);
            setIconImage(json.data.community_icon);
            setTitle(json.data.title);
            setSubs(json.data.subscribers);
            setBackground(json.data.banner_background_image);
            setSubUnsub(json.data.user_is_subscriber)
        } catch (err) {
            console.log("error", err);
        }
    }

    const filterSubredditPosts = async (value) => {
        if (value == null) {
            const random_subposts = await fetch(`https://oauth.reddit.com/${subName}/.json?limit=30`, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await random_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setSubredditsPosts(post);
        }
        if (value == "🚀 TOP POSTS") {
            const best_subposts = await fetch(`https://oauth.reddit.com/${subName}/top.json?limit=30`, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await best_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setSubredditsPosts(post);
        }
        if (value == "🔥 HOT POSTS") {
            const hot_subposts = await fetch(`https://oauth.reddit.com/${subName}/hot.json?limit=30`, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await hot_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setSubredditsPosts(post);
        }
        if (value == "✨ NEW POSTS") {
            const new_subposts = await fetch(`https://oauth.reddit.com/${subName}/new.json?limit=30`, {
                headers: {
                    Authorization: `bearer ${route.params.paramKey}`,
                    "User-Agent": "ChangeMeClient/0.1 by enzotech",
                }
            })
            const json = await new_subposts.json();
            const post = json.data.children.map(obj => obj.data)
            setSubredditsPosts(post);
        }
    }

    const subUnsub = () => {
        if (isSub == true) {
            axios({
                method: 'post',
                url: `https://oauth.reddit.com/api/subscribe?sr_name=${subName}&action=unsub`,
                headers: {
                    "Authorization": `Bearer ${route.params.paramKey}`,
                    "Content-type": "application/json",
                },
            }).then((res) => {
                setSubUnsub(!isSub)
            })
        }
        else if (isSub == false) {
            axios({
                method: 'post',
                url: `https://oauth.reddit.com/api/subscribe?sr_name=${subName}&action=sub`,
                headers: {
                    "Authorization": `Bearer ${route.params.paramKey}`,
                    "Content-type": "application/json",
                },
            }).then((res) => {
                setSubUnsub(!isSub)
            })
        }
    }

    const Posts = ({ subredditIcon, subredditName, subredditUser, subredditVote, subredditDesc, subredditImages, subredditComments, subredditSelf }) => (
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
                            <TouchableOpacity>
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
        <Posts subredditIcon={res.toString()} subredditName={item.subreddit_name_prefixed.toString()} subredditUser={item.author.toString()} subredditVote={item.ups.toString()} subredditDesc={item.title.toString()} subredditImages={item.thumbnail.toString()} subredditComments={item.num_comments.toString()} subredditSelf={item.is_self} />
    );

    useEffect(() => {
        fetchData(`https://oauth.reddit.com/${subName}/about.json`)
        filterSubredditPosts()
    }, [])

    return (
      <View style={styles.main_container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <Image style={styles.home__header__profile__background__image} source={{
                    uri: api.SUB_URL(background, 0, background.indexOf('?'))
                }}/>
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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.pseudo}>{name}</Text>
            <View style={styles.view_subs}>
                <Image style={styles.icon_sub} source={require('../assets/multiple-users-silhouette.png')}/>
                <Text style={styles.subs}>{subs}</Text>
            </View>
            <View style={styles.main_page}>
                <Image source={require('../assets/left-quote-2.png')} style={styles.quotes__left}/>
                <Text style={styles.description}>{description}</Text>
                <Image source={require('../assets/right-quote-sign.png')} style={styles.quotes__right}/>
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
                        filterSubredditPosts(value); console.log(value);
                    }}
                />
                <TouchableOpacity style={isSub ? styles.sub : styles.sub2} onPress={() => subUnsub()}>
                    {isSub ? <Text style={styles.joined}>Joined</Text> : <Text style={styles.join}>Join</Text>}
                </TouchableOpacity>
            </View>
            <View style={styles.home__posts__container}>
                <FlatList
                    data={subPosts}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderPosts}
                />
            </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    view_subs: {
        flexDirection: 'row',
        top: -105,
        left: 130,
    },
    title: {
        fontSize: 21,
        fontWeight: '600',
        marginTop: 23,
    },
    icon_sub: {
        width:23,
        height:23,
        marginRight: 7,
    },
    subs: {
        fontSize: 17,
    },
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
        alignSelf: 'center',
        fontSize: 19,
        letterSpacing: 1,
        fontWeight: '500',
        top: -83,
        left: -120,
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
    home__picker: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        justifyContent: 'space-between'
    },
    home__posts__container: {
        flex: 5,
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
        marginBottom: 5,
        marginRight: 8,
    },
    numComments: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
    posts__bottom__comments: {
        flexDirection: 'row',
    },
    sub: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#0D4872',
        width: 85,
        height: 36,
        marginRight: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sub2: {
        backgroundColor: '#0D4872',
        width: 85,
        height: 36,
        marginRight: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joined: {
        color: '#0D4872',
        fontSize: 16,
        fontWeight: 'bold',
    },
    join: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default Subreddits
