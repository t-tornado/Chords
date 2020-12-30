import React from 'react'
import {Modal, StyleSheet,View,Text, Dimensions} from 'react-native'
import { Colors } from '../assets/colors'
import { thirteen } from '../Config/Dimensions'
import {useSongDeletedState, useAfterSongDelete} from '../Context/TarckContext'

const {width, height} = Dimensions.get('window')
const POUPuP_WIDTH = width * 0.7
const POPUP_HEIGHT = height * 0.05


const SongDeletedPopUp = () => {
let {container,popup} = styles
const songDeletedState = useSongDeletedState()
const afterSongDelete = useAfterSongDelete()
return (
    <Modal
    visible={songDeletedState}
    // visible={true}
    transparent={true}
    animationType='fade'
    onShow={()=> {
     var myTimer=  setTimeout(()=> {
            afterSongDelete()
            clearTimeout(myTimer)
        },1000)
    }}
    >
        <View style={container}>
        <View style={popup} >
            <Text style={{
                color:Colors.song_deleted_downloaded_popUp_text,
                fontSize:thirteen
            }} >Song deleted successfully</Text>
        </View>
        </View>
    </Modal>
)
}

const styles = StyleSheet.create({
    container: {
      height: height * 0.17,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.song_deleted_downloaded_popUp_background
    }
})

export default SongDeletedPopUp