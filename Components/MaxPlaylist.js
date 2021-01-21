import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Modal,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "react-native-vector-icons";
import { Colors } from "../assets/colors";
import {
  fifteen,
  thirty,
  five,
  twenty_eight,
  ten,
  eighteen,
  forty,
} from "../Config/Dimensions";
import {
  useCloseQueue,
  useDownloadedSongs,
  usePlayerLoadedState,
  useQueueState,
} from "../Context/TarckContext";
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from "react-native-track-player";
import Card from "./Cards/PlaylistCard";

const { height, width } = Dimensions.get("window");
const HEADER_H = height * 0.085;
const HEADER_W = width;

export const EmptyComponent = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height * 0.7,
        width: width,
      }}
    >
      <AntDesign name="clouddownload" size={50} color={Colors.active_top_tab} />
      <Text
        style={{
          color: "#ffffff90",
          fontSize: 20,
        }}
      >
        Your downloads is empty
      </Text>
    </View>
  );
};

const MaxPlaylist = () => {
  const [playId, setPlayId] = React.useState();
  const [cleanupId, setCleanupId] = React.useState();
  const closeView = useCloseQueue();
  const queueState = useQueueState();
  const [update, setUpdate] = React.useState(false);
  const playerLoadedState = usePlayerLoadedState();
  const downloadedSongs = useDownloadedSongs();
  const closeModal = () => {
    closeView();
  };

  useTrackPlayerEvents(
    [
      TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
      TrackPlayerEvents.PLAYBACK_STATE,
    ],
    async (ev) => {
      if (ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
        await TrackPlayer.getState()
          .then(async (state) => {
            if (state == 2) {
              setUpdate(true);

              if (playerLoadedState) {
                try {
                  await TrackPlayer.getCurrentTrack().then(async (id) => {
                    const compareID = (await TrackPlayer.getTrack(id)).id;
                    setPlayId(compareID);
                    setUpdate(true);
                  });
                } catch (error) {
                  null;
                }
              }
            }
          })
          .catch(() => null);
      } else if (ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        setUpdate(true);
        if (playerLoadedState) {
          try {
            await TrackPlayer.getCurrentTrack().then(async (id) => {
              const compareID = (await TrackPlayer.getTrack(id)).id;
              setPlayId(compareID);
              setUpdate(true);
            });
          } catch (error) {
            null;
          }
        }
      }
    }
  );

  React.useEffect(() => {
    let clean = true;
    if (clean && update) {
      setCleanupId(playId);
    }

    return () => (clean = false);
  }, [update, playId, cleanupId]);

  return (
    <Modal
      visible={queueState}
      transparent={false}
      style={{ flex: 1 }}
      animationType="slide"
    >
      <ImageBackground
        source={require("../assets/alternate_image.jpg")}
        blurRadius={forty}
        style={{
          flex: 1,
          width: width,
        }}
        imageStyle={{
          width: width,
          resizeMode: "cover",
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{
                height: thirty,
                width: thirty,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: five,
              }}
              onPress={closeModal}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={twenty_eight}
                color="#ffffff"
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingRight: twenty_eight,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: eighteen,
                }}
              >
                YOUR LIST
              </Text>
              <Text
                style={{
                  color: "#ffffff80",
                  fontSize: ten,
                }}
              >
                songs: {downloadedSongs.length}
              </Text>
            </View>
          </View>
          <View style={styles.details}>
            <FlatList
              data={downloadedSongs}
              ListEmptyComponent={EmptyComponent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Card
                  id={item.id}
                  key={item.id}
                  duration={item.duration}
                  title={item.title}
                  choir={item.artist}
                  index={index < 9 ? `0${index + 1}` : index + 1}
                  compareID={cleanupId}
                />
              )}
            />
          </View>
        </View>
      </ImageBackground>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: height,
    // width: width,
    flex: 1,
    backgroundColor: Colors.screens_Background,
  },
  details: {
    // height: height * 0.9,
    // width: width,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  header: {
    height: HEADER_H,
    width: HEADER_W,
    flexDirection: "row",
    alignItems: "center",
    padding: fifteen,
    borderBottomWidth: 1,
    borderBottomColor: "#353535",
  },
});

export default MaxPlaylist;
