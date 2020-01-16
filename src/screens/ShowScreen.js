import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(BlogContext);

    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

    return <View>
        <Text>{blogPost.title}</Text>
        <Text>{blogPost.content}</Text>
    </View>
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <TouchableOpacity {() => navigation.navigate('Edit')}>
            <FontAwesome style={styles.editIcon} name="pencil" size={30} />
        </TouchableOpacity>
    };
}

const styles = StyleSheet.create({
    editIcon: {
        marginRight: 15
    }
});

export default ShowScreen;