import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {firebase} from '../../Config/Firebase'
import { app_backgroung_color } from "../../Config/Colors";
import {BottomTabContainer} from './BottomTab'
import MainAppContext from '../../Context/MainAppContext'
import LikeSongPopUp from '../../Components/Pop-ups/LikeSongPopUp'

import MainPlayer from "../Player/MainPlayer";
/**
 * PopUps
 */
import SongDeletedPopUp from "../Pop-ups/SongDeletedPopUp";
import DownloadCompletePopUp from '../Pop-ups/DownloadCompletedPopUp'
import MyCollectonCardOptions from '../Pop-ups/MyCollectionCardoptions'

const {height} = Dimensions.get('screen')

const AppHome = () => {
  let { container } = styles;

  React.useEffect(() => {
    let cleanUp = true; 
    if (cleanUp) {
      firebase.auth().signInAnonymously().then(res => console.log('INFO FROM APP..HOME >>> Anonymous signin to firebase successful. ', res)).catch(e => {console.log('INFO FROM APP..HOME >>> Signin to firebase failed. ',e)})
    }

    return () => (cleanUp = false);
  }, []);

  return (
    <MainAppContext>
    <View style={container}> 
      <BottomTabContainer />
      <MyCollectonCardOptions />
      {/* <LikeSongPopUp /> */}
    </View>
    </MainAppContext>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: app_backgroung_color, 
  },
});

export default AppHome;
