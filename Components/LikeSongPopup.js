import React from 'react'
import {Modal, StyleSheet,View,Text, Dimensions} from 'react-native'
import {
    useLikeSongState, 
    useUnlikeSongState,
    useResetLikeActions
} from '../Context/TarckContext'
import {Colors} from '../assets/colors'
import { fifteen, seventeen, thirteen } from '../Config/Dimensions'
import {
    AntDesign,
    Ionicons
} from 'react-native-vector-icons'

const {width, height} = Dimensions.get('window')
const POUPuP_WIDTH = width * 0.6
const POPUP_HEIGHT = height * 0.05


const SongDeletedPopUp = () => {
let {container,popup} = styles
const likeActions = useResetLikeActions()
const likeState = useLikeSongState()
const unlikeState = useUnlikeSongState()
const [likeSuccessState, setLikeSuccessState] = React.useState(false)
const [likeFailedState, setLikeFailedState] = React.useState(false)

const Failed = () => {

    return (
        <>
    <Ionicons name='md-heart-dislike' size={seventeen} color={Colors.like_popUp_text} />
    <Text style={{
                    color: Colors.like_popUp_icon,
                    fontSize: fifteen
                }} >Unable to like song</Text>
        </>
    )
}

const Success = () => {

    return (
        <>
 <AntDesign name='like1' size={seventeen} color={Colors.like_popUp_icon} /> 
                <Text style={{
                    color: Colors.like_popUp_text,
                    fontSize: fifteen
                }} >You have liked the song</Text>
        </>
    )
}

React.useEffect(()=> {
    let cleanUp = true
if(cleanUp && likeState == 'failed'){
    setLikeFailedState(true)
    setLikeSuccessState(false)
}
if(cleanUp && likeState == 'success'){
    setLikeFailedState(false)
    setLikeSuccessState(true)
}
    return () => {
        cleanUp = false

    }
},[likeState,unlikeState])

    return (
        <>
        <Modal
        visible={likeFailedState}
        transparent={true}
        animationType='fade'
        onShow={()=> {
           var myTimer = setTimeout(()=> {
                likeActions.reset()
                setLikeFailedState(false)
                clearTimeout(myTimer)
            },1000)
        }}    
        
        >
            <View style={container}>
            <View style={popup} >
               {
                   likeFailedState ?
                   <Failed /> :
                   <Success />
               }
            </View>
            </View>
        </Modal>

<Modal
visible={likeSuccessState}
transparent={true}
animationType='fade'
onShow={()=> {
   var myTimer = setTimeout(()=> {
        likeActions.reset()
        setLikeSuccessState(false)
        clearTimeout(myTimer)
    },1000)
}}    

>
    <View style={container}>
    <View style={popup} >
       {
           likeSuccessState ?
           <Success /> :
           <Failed /> 
       }
    </View>
    </View>
</Modal>
</>
        
    )



}

const styles = StyleSheet.create({
    container: {
      height: height * 0.07,
      width: width,
      justifyContent: 'flex-end',
      alignItems: 'center',
    //   backgroundColor: 'tomato',
      position: 'absolute'
    },
    popup: {
        width: POUPuP_WIDTH,
        height: POPUP_HEIGHT,
        borderRadius:POUPuP_WIDTH/3,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.like_popUp_background,
        flexDirection: 'row',

    },
})

export default SongDeletedPopUp