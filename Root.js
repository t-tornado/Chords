import React from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import ExtraDimensions from 'react-native-extra-dimensions-android'
import {DetectNavbar} from 'react-native-detect-navbar-android';
import Player from "./Screens/Player";
import ConTrackProvider from './Context/TarckContext'
import DownloadPopup from './Components/DownloadCompletePopup'
import OnlineBottomTabs from './Components/Online/Home'
import QueuePlaylist from './Components/MaxPlaylist'
import LikePopup from './Components/LikeSongPopup'
/**
 * OFFLINE VIEWS
 */
import OfflineOption from './Components/Offline/Option'
import SongDeletePopUp from './Components/SongDeletedPopUP'
 
const WITHOUT_HARD_TAB_H= ExtraDimensions.getRealWindowHeight() - StatusBar.currentHeight
const WITH_HARD_TAB_H = ExtraDimensions.getRealWindowHeight() - StatusBar.currentHeight - ExtraDimensions.getSoftMenuBarHeight()
const WIDTH = ExtraDimensions.getRealWindowWidth()
const Content = () => {
  const[viewH, setViewH] = React.useState(0)


  React.useEffect(()=> {
  let clean = true
  DetectNavbar.hasSoftKeys().then(bool => {
    if(bool && clean){
      setViewH(WITHOUT_HARD_TAB_H)
    }
    if(!bool && clean){
      setViewH(WITH_HARD_TAB_H)
    }
  })
  
  return () => clean = false
  
  },[viewH])


  return (
    <View style={[styles.container,{height: viewH}]} >
    <OnlineBottomTabs /> 
    <Player />
    <QueuePlaylist />
    <OfflineOption />
    <DownloadPopup />
    <LikePopup />
    <SongDeletePopUp />
<StatusBar barStyle='light-content' backgroundColor='transparent' />
  </View>
  )
}



 function Root() {

  return (
    <> 
    <ConTrackProvider>
 <Content/>
 </ConTrackProvider>

      </>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: WIDTH
    flex:1
  },
});

export default Root