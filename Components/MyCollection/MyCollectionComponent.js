import React from 'react'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import CardMenu from './CardMenu'
import MyCollectionScreen from '../../Screens/HomeButtonTabs/MyCollectionScreen'
import {useCardOptionState} from '../../Context/openCardoptions'
import {OpenCardOptionsContext} from '../../Context/'

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
    // import {
    //   useCloseDelete,
    //   useFileToDelete,
    //   useOpenDeleteState,
    //   useLikeSong,
    //   useDeleteSong,
    // } from "../Context/TarckContext";_BOTTOM)).current
const scale = React.useRef(new Value(1)).current
const cardOptionState = useCardOptionState()

const opacity = React.useRef(new Value(1)).current

const menu_translateY = React.useRef(new Value(SNAP_BOTTOM)).current
const open_menu_translation = Animated.spring(menu_translateY, {toValue: SNAP_TOP, ...SNAP_ANIMATION_CONFIG})
const close_menu_translation = Animated.spring(menu_translateY,{...SNAP_ANIMATION_CONFIG, toValue:SNAP_BOTTOM})

!cardOptionState && close_menu_translation.start()
cardOptionState && open_menu_translation.start()
// React.useState(()=> {
//     let clean = true
//     if(clean && cardOptionState) _openMenuAnimations()
//     if(clean && !cardOptionState) _closeMencloseModaluAnimations()

//     return ()=> clean =false
// },[cardOptionState])

return(
        <View style={styles.container}>
                    <MyCollectionScreen />
                    <CardMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        paddingBottom: 20, 
        flex:1,
    }, 
    mainScreen: {
        // position: 'absolute', 
        flex: 1
    },
})

export default MyCollectionComponent