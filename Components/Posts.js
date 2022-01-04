import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Posts = (name, desc) => {
    return (
        <View>
            <View style={styles.posts}>
                <Text style={styles.subreddit__name}>{name}</Text>
                <Text style={styles.subreddit__text}>{desc}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    posts: {
        width: '50%',
        height: '20%',
        backgroundColor: 'white',
        marginBottom: 30,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: '#5E5D5D',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.7,
    },
})

export default Posts