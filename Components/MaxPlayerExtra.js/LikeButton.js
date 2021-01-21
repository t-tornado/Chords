import React from "react";
import { TouchableOpacity, Text } from "react-native";
import {
  useLikeSong,
  useLikeSongState,
  useUnlikeSongState,
} from "../../Context/TarckContext";
import { five, twelve, twenty_five } from "../../Config/Dimensions";
import { Foundation } from "react-native-vector-icons";
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_READY,
  STATE_NONE,
} from "react-native-track-player";
import { Colors } from "../../assets/colors";

const LikeButton = () => {
  const [like, setLike] = React.useState(false);
  const [genre, setGenre] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [updated, setUpdated] = React.useState(false);
  const [pbChanged, setPbChanged] = React.useState();
  const likeAction = useLikeSong();
  const likeState = useLikeSongState();
  const unlikeState = useUnlikeSongState();

  useTrackPlayerEvents(
    [
      TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
      TrackPlayerEvents.PLAYBACK_STATE,
    ],
    async (event) => {
      if (event.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        setUpdated(true);
        setPbChanged(true);
      } else if (event.type == TrackPlayerEvents.PLAYBACK_STATE) {
        await TrackPlayer.getState()
          .then(async (state) => {
            if (state == STATE_READY) {
              setUpdated(true);
            }
            if (state == STATE_NONE) {
              setUpdated(false);
            }
          })
          .catch(() => null);
      }
    }
  );

  React.useEffect(() => {
    let cleanUp = true;
    try {
      if (cleanUp && updated) {
        TrackPlayer.getCurrentTrack()
          .then(async (id) => {
            const gen = (await TrackPlayer.getTrack(id)).genre;

            setId(id);
            setGenre(gen);
          })
          .catch(() => null);
      }
    } catch (error) {
      null;
    }

    if (likeState == "success" && cleanUp && updated) {
      setLike(true);
    }
    if (cleanUp && unlikeState == "success" && updated) {
      setLike(false);
    }
    if (cleanUp && unlikeState == "failed" && updated) {
      setLike(false);
    }
    if (cleanUp && pbChanged && updated) {
      setLike(false);
    }
    return () => {
      cleanUp = false;
      setPbChanged(false);
      // setUpdated(false)
    };
  }, [updated, like, likeState, unlikeState, pbChanged]);

  const toLikeSong = () => {
    likeAction(like, genre, id);
    // likeAction(like, 'torndo',19)
  };

  return (
    <>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={toLikeSong}>
        <Foundation
          name="heart"
          size={twenty_five}
          color={
            like
              ? Colors.max_player_options_icon_active
              : Colors.max_player_options_icon_non_active
          }
        />
      </TouchableOpacity>
      <Text
        style={{
          color: "#ffffff80",
          // backgroundColor: '#00000040',
          padding: five,
          borderRadius: five,
          fontSize: twelve,
        }}
      >
        Favourite
      </Text>
    </>
  );
};

export default LikeButton;
