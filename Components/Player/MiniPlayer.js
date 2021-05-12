import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";
import {width_numbers} from '../../Config/Dimensions'
import { player_colors } from "../../Config/Colors";

/**
 * Icons 
 */
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'



const { height, width } = Dimensions.get("window");
const MIN_PLAYER_H = height * 0.085;
const IMAGE_HEIGHT = height * 0.05;
const IMAGE_WIDTH = width * 0.11;

const MiniPlayer = ({ animOpacity, animMiniPlayerHeight }) => {
  let {
    minPlayer,
    minPlayerCover,
    minCover,
    minPlayerDetails,
    minPlayerIcon,
  } = styles;
  /// HOOKS
  const [title, setTitle] = React.useState(null);
  const [artist, setArtist] = React.useState(null);
  const [artWork, setArtwork] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const [playState, setplayState] = React.useState(null);

//   const lpState = usePlayerLoadedState();
//   const storeActions = usePlayerStoreActions();

//   const openStoreMax = useSetStoreOpenMax();
//   const storeMaxState = useStoreMaxState();

//   useTrackPlayerEvents(
//     [
//       TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
//       TrackPlayerEvents.PLAYBACK_STATE,
//     ],
//     async (ev) => {
//       if (ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
//         await TrackPlayer.getState()
//           .then((state) => {
//             if (state == 2) {
//               setUpdate(true);
//             }
//             if (state == 3) {
//               setplayState(true);
//               storeActions.play().catch((e) => {
//                 null;
//               });
//             }
//             if (state != 3) {
//               setplayState(false);
//               storeActions.pause().catch((e) => {
//                 null;
//               });
//             }
//           })
//           .catch(() => null);
//       } else if (ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
//         setUpdate(true);
//       }
//     }
//   );

//   React.useEffect(() => {
//     let details = true;

//     try {
//       if (lpState && details) {
//         TrackPlayer.getCurrentTrack()
//           .then(async (index) => {
//             if (index == null) {
//               null;
//             }
//             if (index != null) {
//               const title = (await TrackPlayer.getTrack(index)).title;
//               const artist = (await TrackPlayer.getTrack(index)).artist;
//               const artwork = (await TrackPlayer.getTrack(index)).artwork;
//               setTitle(title);
//               setArtist(artist);
//               setArtwork(artwork);
//             }
//           })
//           .catch((E) => {
//             null;
//           });
//       }
//     } catch (e) {
//       null;
//     }

//     return () => {
//       details = false;
//       setUpdate(false);
//     };
//   }, [update, lpState, storeMaxState]);

//   const play = useTrackPlay();
//   const toPause = useTrackPause();

  const playFunc = () => {
    // play();
    console.log('INFO FROM MINI_PLAYER ==> Play pressed')
  };

  const pauseFunct = () => {
    // toPause();
    console.log('INFO FROM MINI_PLAYER ==> Play pressed')

  };

  return (
    <Animated.View style={[minPlayer, { height:animMiniPlayerHeight, opacity: animOpacity }]}>
      <View style={minCover}>
        <Image
          source={require('../../assets/images/default.jpg')}
          style={minPlayerCover}
        />
      </View>
      <View style={minPlayerDetails}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: '#ffffff80', fontSize: 14 }}
        >
          {artist == null ? "Choir" : artist}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: '#ffffff', fontSize: 15 }}
        >
          {title == null ? "Title" : title}
        </Text>
      </View>
      <View style={minPlayerIcon}>
        {playState ? (
          <TouchableOpacity
            style={{
              height: width_numbers[40] ,
              width: width_numbers[45],
              justifyContent: "center",
            }}
            onPress={pauseFunct}
            activeOpacity={0.5}
          >
            <AntDesign name="pause" size={width_numbers[45]} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              height: width_numbers[40],
              width: width_numbers[45],
              justifyContent: "center",
            }}
            onPress={playFunc}
            activeOpacity={0.75}
          >
            <Entypo name="controller-play" size={width_numbers[45]} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  minCover: {
    flex: 1,
    padding: width_numbers[10],
    justifyContent: "center",
  },
  minPlayer: {
    width: width,
    height: MIN_PLAYER_H,
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor:player_colors.mini_player_background,
  },
  minPlayerCover: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },
  minPlayerDetails: {
    flex: 5,
    padding: width_numbers[10],
    justifyContent: "flex-end",
  },
  minPlayerIcon: {
    justifyContent: "center",
    flex: 1,
  },
});

export default MiniPlayer;
