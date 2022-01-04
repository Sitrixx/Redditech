import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";

const Search = ({route, navigation}) => {

    const [search, setSearch] = useState('')

    const handleOnChangeText = (text) => {
        setSearch(text);
    };
    const findSubreddits = (search) => {
        navigation.replace('Subreddits', {paramKey: route.params.paramKey, subName: `r/${search}`})
    }

    return (
      <View style={styles.main_container}>
        <View style={styles.header}>
            <Image style={styles.mytems} source={require('../assets/mytems.png')}/>
            <Text style={styles.settings}>Search</Text>
            <SearchBar
                height={50}
                fontSize={19}
                placeholder="Search for subreddits"
                onChangeText={handleOnChangeText}
                onSearchPress={() => findSubreddits(search)}
                style={styles.searchBar}
            />
        </View>
        <TouchableOpacity onPress={() => navigation.replace('Home', {paramKey: route.params.paramKey})} style={styles.home__header__profile}>
                <Image style={styles.home__header__profile__picture} source={require('../assets/left-arrow-back-pngrepo-com.png')}/>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    mytems: {
        width: 270,
        height: 270,
    },
    main_container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        flex: 1,
    },
    header: {
        width: '100%',
        height: '60%',
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
        left: 30,
        top: 200
    },
    home__header__profile__picture: {
        width: 26,
        height: 26,
        top: '24%',
        left: '19%',
    },
    settings: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 40
    },
})

export default Search