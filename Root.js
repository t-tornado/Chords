import React from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
/**
 * CUSTOM COMPONENTS
 **/
import Player from "./Screens/Player";
import ConTrackProvider from "./Context/TarckContext";
import DownloadPopup from "./Components/Online/PopUps/DownloadCompletePopup";
import OnlineBottomTabs from "./Components/Online/Home";
import QueuePlaylist from "./Components/MaxPlaylist";
import LikePopup from "./Components/Online/PopUps/LikeSongPopup";
import { firebase } from "./Config//firebase";
/**
 * OFFLINE VIEWS
 */
import SongOption from "./Components/Option";
import SongDeletePopUp from "./Components/Online/PopUps/SongDeletedPopUP";

const { height, width } = Dimensions.get("window");
const Content = () => {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          height: height,
        }}
      >
        <OnlineBottomTabs />
        <Player />
      </View>
      <QueuePlaylist />
      <SongOption />
      <DownloadPopup />
      <LikePopup />
      <SongDeletePopUp />
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
    </View>
  );
};

function Root() {
  React.useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(() => null);
  }, []);

  return (
    <>
      <ConTrackProvider>
        <Content />
      </ConTrackProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Root;
