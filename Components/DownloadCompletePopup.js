import React from 'react'
import {Modal, StyleSheet,View,Text, Dimensions} from 'react-native'
import {useDownloadSuccessState,useAfterDownloadSuccess} from '../Context/TarckContext'
import {Colors} from '../assets/colors'
import { thirteen } from '../Config/Dimensions'

const {width, height} = Dimensions.get('window')
const POUPuP_WIDTH = width * 0.6
const POPUP_HEIGHT = height * 0.05


const SongDeletedPopUp = () => {
let {container,popup} = styles
const DownloadState = useDownloadSuccessState()
const afterDownload = useAfterDownloadSuccess()

return (
    <>
    <Modal
    visible={DownloadState}
    transparent={true}
    animationType='fade'
    onShow={()=> {
       var myTimer = setTimeout(()=> {
            afterDownload()
            clearTimeout(myTimer)
        },1000)
        
    }}
    >
        <View style={container}>
        <View style={popup} >
            <Text 
            style={{
                color:Colors.song_deleted_downloaded_popUp_text,
                fontSize: thirteen
            }}
            >Download Comleted </Text>
        </View>
        </View>
    </Modal>
      {/* <Modal
      visible={DownloadState}
      transparent={true}
      animationType='fade'
      onShow={()=> {
         var myTimer = setTimeout(()=> {
              afterDownload()
              clearTimeout(myTimer)
          },1000)
          
      }}
      >
          <View style={container}>
          <View style={popup} >
              <Text 
              style={{
                  color:Colors.song_deleted_downloaded_popUp_text,
                  fontSize: thirteen
              }}
              >Download Unsuccessful </Text>
          </View>
          </View>
      </Modal> */}
      </>
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
    },
})

export default SongDeletedPopUp