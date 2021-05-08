import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BrowseScreen = () => {

    return(
        <View style={styles.container} >
            <Text style={styles.text} >
                HOME SCREEN
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#00000080'
    }, 
    text: {
        fontSize: 20, 
        color: '#ffffff'
    }
})

export default BrowseScreen