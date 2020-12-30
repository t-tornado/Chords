import React from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Animated, {Easing, Extrapolate} from 'react-native-reanimated'
import { five, ten, thirteen, twenty_eight } from '../../Config/Dimensions';
import Timer from './Timer'
import Duration from './Duration'
import {useTrackPlayerProgress} from 'react-native-track-player'


const {height, width} = Dimensions.get('window')
const PROGRESS_WIDTH = width * 0.85
const PROGRESS_HEIGHT = height * 0.025
const {Value, Clock, interpolate} = Animated

const Progress = () => {
let {container, progress_Style, progress_Fill, font} = styles
const progress = useTrackPlayerProgress()

const {position, duration} = progress

const animated_width = interpolate(position, {
    inputRange: [0,position, duration],
    outputRange: [0,position == 0 ? 0 : (position/duration) * PROGRESS_WIDTH,PROGRESS_WIDTH],
})

    return (
            <View style={progress_Style} >
            <Timer />
            <Duration />
                <Animated.View style={[progress_Fill, {width:animated_width}]} />
            </View>
    )
}

const styles = StyleSheet.create({ 
    progress_Style: { 
        width: PROGRESS_WIDTH,
        height: PROGRESS_HEIGHT,
        backgroundColor:'#ffffff',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderRadius: 6,
        backfaceVisibility: 'hidden',
        overflow: 'hidden',
        paddingHorizontal: 7
    }, 
    progress_Fill: {
        height: PROGRESS_HEIGHT,
        backgroundColor: '#00000040',
        position: 'absolute',       
        opacity: 0.85

    },
})

export default Progress