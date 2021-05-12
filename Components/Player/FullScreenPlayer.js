import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import {width_numbers} from '../../Config/Dimensions'

/**
 * Icons
 */
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Animated from "react-native-reanimated";


import {
  useResetLoadedStates,
  useTrackPlay,
  useTrackPause,
  useTrackNext,
  useTrackPrev,
  usePlayerStoreActions,
  usePlayerLoadedState,
  useOpenQueue,
  useRefreshPlayer,
} from "../Context/TarckContext";

// import TrackPlayer, {
//   useTrackPlayerEvents,
//   TrackPlayerEvents,
// } from "react-native-track-player";

// import Timer from "./MaxPlayerExtra.js/Timer";
// import Duration from "./MaxPlayerExtra.js/Duration";
// import LikeButton from "./MaxPlayerExtra.js/LikeButton";
// import RepeatButton from "./MaxPlayerExtra.js/RepeatButton";
// import DownloadButton from "./MaxPlayerExtra.js/DownloadButton";
// import Progress from "./MaxPlayerExtra.js/Progress";
import { Colors } from "../assets/colors";
// import Slider from "./MaxPlayerExtra.js/Slider";

const { height, width } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.32;
const IMAGE_WIDTH = width * 0.6;
const OPTIONS_H = height * 0.1;

const MaxPlayer = ({
  animHeight,
  animOpacity,
  aIcons,
  minimize,
  overlayOpacity,
}) => {
  let {
    countDown,
    details,
    maxIconsBottom,
    maxIconsBottomEach,
    maxPlayer,
    maxPlayerCover,
    maxPlayerDetails,
    maxPlayerIcons,
    maxPlayerImage,
    topOption,
    maxPlayerOptions,
    timer_duration,
  } = styles;

  /// HOOKS

  const [title, setTitle] = React.useState(null);
  const [artist, setArtist] = React.useState(null);
  const [artWork, setArtwork] = React.useState(null);
  const [comp, setComp] = React.useState(null);
//   const lpState = usePlayerLoadedState();
//   const [updated, setUpdated] = React.useState(false);
  const [playing, setPlaying] = React.useState(true);
  const [buffering, setBuffering] = React.useState(false);
//   const storeActions = usePlayerStoreActions();
//   const openQueue = useOpenQueue();
//   const play = useTrackPlay();
//   const pause = useTrackPause();
//   const previous = useTrackPrev();
//   const next = useTrackNext();

  /*
Registring Component to player events
*/
//   useTrackPlayerEvents(
//     [
//       TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
//       TrackPlayerEvents.PLAYBACK_STATE,
//     ],
//     async (ev) => {
//       if (ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
//         await TrackPlayer.getState()
//           .then((state) => {
//             if (state == TrackPlayer.STATE_READY) {
//               setUpdated(true);
//             }

//             if (state == 3) {
//               setPlaying(true);
//               setBuffering(false);
//               storeActions.play().catch((e) => null);
//             }

//             if (
//               state != 3 &&
//               state != 4 &&
//               state != 7 &&
//               state != 6
//               // state != 0
//             ) {
//               setPlaying(false);
//               storeActions.pause().catch((e) => null);
//             }

//             if (state == 6 || state == 7) {
//               setBuffering(true);
//             }
//           })
//           .catch(() => null);
//       } else if (ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
//         setUpdated(true);
//       }
//     }
//   );

//   React.useEffect(() => {
//     let cleanUp = true;
//     try {
//       if (lpState && cleanUp) {
//         TrackPlayer.getCurrentTrack()
//           .then(async (index) => {
//             if (index != null) {
//               const title = (await TrackPlayer.getTrack(index)).title;
//               const artist = (await TrackPlayer.getTrack(index)).artist;
//               const art = (await TrackPlayer.getTrack(index)).artwork;
//               const composer = (await TrackPlayer.getTrack(index)).description;
//               setTitle(title);
//               setArtist(artist);
//               setArtwork(art);
//               setComp(composer);
//             }
//             if (index == null) {
//               null;
//             }
//           })
//           .catch((E) => {
//             null;
//           });
//       }
//     } catch (error) {
//       null;
//     }
//     return () => {
//       cleanUp = false;
//       setUpdated(false);
//     };
//   }, [updated, lpState, playing, buffering]);

  const toPause = () => {
    // pause();
  };
  const toPlay = () => {
    // play();
  };
  const minFunc = () => {
    // minimize();
  };
  const openView = () => {
    // openQueue();
  };

  const toNext = () => {
    // next();
  };

  return (
    <Animated.View
      style={[maxPlayer, { height: animHeight, opacity: animOpacity }]}
    >
      <ImageBackground
        source={require('../../assets/images/default.jpg')}
        blurRadius={width_numbers[40]}
        style={{
          flex: 1,
          width: width,
        }}
        imageStyle={{
          flex: 1,
          width: width,
          resizeMode: "cover",
        }}
      >
        <Animated.View style={[topOption, { opacity: overlayOpacity }]}>
          <TouchableOpacity
            style={{
              height: width_numbers[28],
              width: width_numbers[28],
              justifyContent: "center",
              alignItems: "center",
              marginRight: width * 0.24,
            }}
            activeOpacity={0.87}
            onPress={minFunc}
          >
            <Entypo name="chevron-down" size={width_numbers[28]} color="#ffffff90" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: width_numbers[28],
              width: width_numbers[28],
              justifyContent: "center",
              alignItems: "center",
              marginLeft: width * 0.48,
              right: 0,
              marginRight: 0,
            }}
            onPressOut={openView}
            activeOpacity={0.88}
          >
            <MaterialIcons
              name="playlist-play"
              size={width_numbers[28]}
              color="#ffffff90"
            />
          </TouchableOpacity>
        </Animated.View>
        <View style={maxPlayerCover}>
          <Image
            source={require('../../assets/images/default.jpg') }
            style={maxPlayerImage}
          />
          {/* Player options */}
          <View style={maxPlayerOptions}>
            <View>
              {/* <LikeButton /> */}
            </View>

            <View>
              {/* <DownloadButton /> */}
            </View>

            {/* <View> 
<LoopButton />
</View> */}

            <View
              style={{
                alignItems: "center",
              }}
            >
              {/* <RepeatButton /> */}
            </View>
          </View>
        </View>
        <Animated.View style={[details, { opacity: aIcons }]}>
          <View style={maxPlayerDetails}>
            {/*  MAX PLAYER DETAILS*/}
            <View style={styles.titleView}>
              <MaterialCommunityIcons
                name="format-title"
                color={'#ffffff'}
                size={width_numbers[13]}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                style={{
                  paddingBottom: width_numbers[3],
                  color: '#ffffff',
                  fontSize: width_numbers[15],
                }}
              >
                {title == null ? "  Title" : `  ${title}`}
              </Text>
            </View>

            <View style={styles.titleView}>
              <FontAwesome5
                name="book-reader"
                color={'#ffffff'}
                size={width_numbers[10]}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                style={{
                  color: '#ffffff80',
                  fontSize: width_numbers[11],
                }}
              >
                {comp == null ? "   by Composer" : `   by ${comp}`}
              </Text>
            </View>
            <View style={styles.titleView}>
              <Entypo
                name="modern-mic"
                color={'#ffffff'}
                size={width_numbers[10]}
              />
              <Text
                numberOfLines={2}
                style={{
                  color: '#ffffff',
                  fontSize: width_numbers[13],
                  paddingBottom: width_numbers[5],
                }}
              >
                {artist == null ? "   Choir" : `  ${artist}`}
              </Text>
            </View>
          </View>

          <View style={[countDown, { alignSelf: "center" }]}>
            {/* <Timer /> */}
            {/* {Platform.OS == "ios" ? <Slider /> : <Progress />} */}
            {/* <View style={[timer_duration, { backgroundColor: "tomato" }]}> */}
            {/* <Duration /> */}
            {/* </View> */}
          </View>
          <View style={[maxPlayerIcons]}>
            <View style={maxIconsBottom}>
              <View style={maxIconsBottomEach}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: width_numbers[33],
                    height: width_numbers[33],
                    justifyContent: "center",
                  }}
                //   onPress={previous}
                >
                  <Feather name="skip-back" size={width_numbers[30]} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <View style={maxIconsBottomEach}>
                {/**PLAYER CONTROLS */}
                {playing ? (
                  buffering ? (
                    <View
                      style={{
                        width: width_numbers[80],
                        height: width_numbers[80],
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00000060",
                        borderRadius: width_numbers[40],
                      }}
                    >
                      <Text
                        style={{
                          fontSize: width_numbers[10],
                          color: "#ffffff",
                        }}
                      >
                        Loading...
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{
                        width: width_numbers[45],
                        height: width_numbers[45],
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      activeOpacity={0.6}
                      onPress={toPause}
                    >
                      <FontAwesome5
                        name="pause"
                        size={width_numbers[33]}
                        color="#ffffff"
                      />
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    style={{
                      width: width_numbers[45],
                      height: width_numbers[45],
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    activeOpacity={0.6}
                    onPress={toPlay}
                  >
                    {/* <AntDesign name="play" size={forty_five} color="#ffffff" /> */}
                    <FontAwesome5
                      name="play"
                      size={width_numbers[33]}
                      color="#ffffff"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={maxIconsBottomEach}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: width_numbers[33],
                    height: width_numbers[33],
                    justifyContent: "center",
                  }}
                  onPress={toNext}
                >
                  <Feather name="skip-forward" size={width_numbers[30]} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  countDown: {
    // width: width * 0.5,
    height: height * 0.05,
    // backgroundColor: '#00000040',
    borderRadius: width_numbers[10],
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: width_numbers[15],
    alignItems: "center",
    paddingHorizontal: width_numbers[10],
  },
  details: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  maxIconsBottom: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "center",
    width: width * 0.57,
    alignSelf: "center",
    alignItems: "center",
  },
  maxIconsBottomEach: {
    width: width * 0.19,
    justifyContent: "center",
    alignItems: "center",
  },
  maxIconsLast: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  maxIconsTop: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  maxPlayer: {
    width: width,
    right: 0,
    left: 0,
    // backgroundColor: "#9ab3f5",
  },
  maxPlayerCover: {
    height: height * 0.45,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  maxPlayerDetails: {
    height: height * 0.12,
    width: width * 0.8,
    // justifyContent: "space-evenly",
    alignSelf: "center",
    backgroundColor: "#00000040",
    padding: width * 0.02,
    borderRadius: width_numbers[10],
    // paddingVertical: height * 0.003
  },
  maxPlayerIcons: {
    height: height * 0.12,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  maxPlayerImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    resizeMode: "cover",
    borderRadius: IMAGE_WIDTH / 5,
    borderColor: "#ffffff90",
    borderWidth: width_numbers[10],
  },
  maxPlayerOptions: {
    width: width * 0.85,
    height: OPTIONS_H,
    // backgroundColor: '#00000040',
    borderRadius: (width * 0.2) / 8,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: width_numbers[15],
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width_numbers[10],
  },
  timer_duration: {
    width: width * 0.5,
    height: height * 0.012,
    // backgroundColor: '#00000040',
    borderRadius: width_numbers[10],
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: width_numbers[15],
    alignItems: "center",
    paddingHorizontal: width_numbers[10],
  },
  titleText: {
    paddingBottom: width_numbers[5],
    color: "#f9f7cf",
    fontSize: 20,
  },
  titleView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topOption: {
    height: height * 0.11,
    width: width,
    paddingHorizontal: width_numbers[20],
    flexDirection: "row",
    alignItems: "flex-end",
  },
  volumeSlider: {
    width: width * 0.7,
  },
});

export default MaxPlayer;
