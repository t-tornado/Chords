import React from 'react'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import CardMenu from './CardMenu'
import MyCollectionScreen from '../../Screens/HomeButtonTabs/MyCollectionScreen'
import {useCardOptionState} from '../../Context/openCardoptions'
import {OpenCardOptionsContext} from '../../Context/'
import Card from '../Cards/AlreadyDownloaded'

const {height, width} = Dimensions.get('window')
const {Value} = Animated

const SNAP_TOP = 0
const SNAP_BOTTOM = height *0.5

const SNAP_ANIMATION_CONFIG = {
    useNativeDriver: true, 
    bounciness: 5 
}

const STANDARD_CONFIG = {
    useNativeDriver:true,
    bounciness: 0
}

const MyCollectionComponent = () => {
const cardOptionState = useCardOptionState()

const menu_translateY = React.useRef(new Value(SNAP_BOTTOM)).current
const scale = React.useRef(new Value(1)).current
const opacity = React.useRef(new Value(1)).current

const open_menu_translation = Animated.spring(menu_translateY, {toValue: SNAP_TOP, ...SNAP_ANIMATION_CONFIG})
const open_menu_scale = Animated.spring(scale, {toValue: 0.97, ...STANDARD_CONFIG})
const open_menu_opacity = Animated.spring(opacity, {toValue: 0.12, ...STANDARD_CONFIG})
const close_menu_translation = Animated.spring(menu_translateY,{...SNAP_ANIMATION_CONFIG, toValue:SNAP_BOTTOM})
const close_menu_scale = Animated.spring(scale, {toValue: 1, ...STANDARD_CONFIG})
const close_menu_opacity = Animated.spring(opacity, {...STANDARD_CONFIG, toValue: 1})


const _openMenuAnimations = () => Animated.parallel([open_menu_scale,open_menu_translation,open_menu_opacity]).start()
const _closeMenuAnimations = () => Animated.parallel([close_menu_scale, close_menu_translation,close_menu_opacity]).start()

console.log(cardOptionState)

cardOptionState && _openMenuAnimations()
!cardOptionState && _closeMenuAnimations()
// React.useState(()=> {
//     let clean = true
//     if(clean && cardOptionState) _openMenuAnimations()
//     if(clean && !cardOptionState) _closeMencloseModaluAnimations()

//     return ()=> clean =false
// },[cardOptionState])

return(
        <View style={styles.container}>
            <Animated.View style={[styles.mainScreen, {opacity, transform:[{scale}]}]} >
                <MyCollectionScreen />
            </Animated.View>

            <Animated.View style={{
                transform: [{translateY: menu_translateY}]
            }} >
                <CardMenu />
            </Animated.View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems:'center',
        paddingBottom: 20
    }, 
    mainScreen: {
        position: 'absolute', 
        flex:1, 

    },
})

export default MyCollectionComponent