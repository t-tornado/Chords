import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { Colors } from '../../assets/colors'
import { ten } from '../../Config/Dimensions'
const {height,width} = Dimensions.get('window')
const FavoritePlaylist = () => {

    return (
        <View style={styles.container} >
            <View style={styles.fav} >
                <Text style={styles.fav_text}>Favorites`</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screens_Background,
        paddingTop: ten        
    },
    fav: {
        width: width * 0.45,
        height: height * 0.07,
        borderRadius: ten,
        backgroundColor: Colors.active_top_tab,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fav_text: {
        color: Colors.active_top_tab_text,
        fontSize: 15,
    }
})

export default FavoritePlaylist