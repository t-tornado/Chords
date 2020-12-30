import React from 'react'
import { StyleSheet, View,Text,TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native';
import { Colors } from '../assets/colors';
import { five, ninety_five, seven, ten, thirteen } from '../Config/Dimensions';
const {height, width} = Dimensions.get('window')
const SCREEN_MARIN_TOP = StatusBar.currentHeight * 2


const TopTabBar = (props) => {
    const scrollViewRef = React.useRef(null)
    const routes = props.navigation.state.routes
    const activeIndex = props.navigation.state.index
React.useEffect(()=> {
    scrollViewRef.current.scrollTo({ x: activeIndex * ninety_five, y: 0, animated: true })
},[activeIndex])
return (
    <View style={styles.container}>
        <ScrollView 
        ref={list => scrollViewRef.current = list} 
            horizontal>
            {routes.map((route, index) => {
                const label = route.params.title
                const isFocused = props.navigation.state.index === index;
                const onPress = () => {
                    props.navigation.navigate(route.routeName)
                };
                let focusStyle = { }; 
                let fontColor = { };
                isFocused ? focusStyle = { backgroundColor: Colors.active_top_tab } : focusStyle = { backgroundColor: Colors.non_active_top_tab};
                isFocused ? fontColor = { color: Colors.active_top_tab_text } : fontColor = { color: Colors.non_active_top_text };

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            style={[styles.tabItem,focusStyle]}
                            activeOpacity={1}
                        >
                               
                                <Text style={[styles.labelStyle, fontColor]}>
                                    {label}
                                </Text>
                        </TouchableOpacity>
                    );
            })} 
        </ScrollView>
</View>
)
}

const styles = StyleSheet.create({
    container: {
        // height: height * 0.045,
        paddingTop: SCREEN_MARIN_TOP,
        backgroundColor: 'transparent'
        // position: 'absolute'
    },
    tabItem: {
        marginHorizontal:seven,
        padding: seven,
        height: height * 0.045,
        borderRadius: (width *0.25) / 3,
        borderWidth:3,
        borderColor: Colors.top_tabbar_border,
        justifyContent: 'center',
         alignItems: 'center',
    },
    labelStyle: {
        color: 'black',
        fontSize: thirteen
    }
})

export default TopTabBar