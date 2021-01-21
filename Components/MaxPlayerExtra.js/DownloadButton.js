import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_READY,
  STATE_NONE,
} from "react-native-track-player";
import { five, nine, ten, twelve, twenty_five } from "../../Config/Dimensions";
import { useDownloadedSongs } from "../../Context/TarckContext";
import { Colors } from "../../assets/colors";

const DownloadButton = () => {
  const [downloaded, setDownloaded] = React.useState(false);
  const [updator, setUpdater] = React.useState(false);
  const [pos, setPos] = React.useState(false);
  const downloads = useDownloadedSongs();

  useTrackPlayerEvents(
    [
      TrackPlayerEvents.PLAYBACK_STATE,
      TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    ],
    async (eve) => {
      if (eve.type == TrackPlayerEvents.PLAYBACK_STATE) {
        await TrackPlayer.getState()
          .then((state) => {
            if (state == 3) {
              setUpdater(true);
            }
          })
          .catch(() => null);
      } else if (eve.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        setPos((prev) => !prev);
      }
    }
  );

  React.useEffect(() => {
    let cleanUp = true;
    TrackPlayer.getCurrentTrack()
      .then(async (id) => {
        await TrackPlayer.getTrack(id)
          .then((res) => {
            const solution = downloads.findIndex(
              (song) =>
                (song.title == res.title &&
                  song.artist == res.artist &&
                  song.id == res.id) ||
                `10000000000${res.id}`
            );

            if (cleanUp && solution != -1) {
              setDownloaded(true);
            }
            if (cleanUp && solution == -1) {
              setDownloaded(false);
            }
          })
          .catch(() => null);
      })
      .catch(() => null);

    return () => {
      cleanUp = false;
      setUpdater(false);
    };
  }, [updator, pos, downloaded]);

  return (
    <>
      <TouchableOpacity style={{ alignItems: "center" }} activeOpacity={1}>
        <MaterialCommunityIcons
          name="check-underline"
          size={twenty_five}
          color={
            downloaded
              ? Colors.max_player_options_icon_active
              : Colors.max_player_options_icon_non_active
          }
        />
      </TouchableOpacity>
      <Text
        style={{
          color: "#ffffff80",
          padding: five,
          borderRadius: five,
          fontSize: twelve,
        }}
      >
        Downloaded
      </Text>
    </>
  );
};

export default DownloadButton;
