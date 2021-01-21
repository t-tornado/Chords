import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import TrackPlayer, { useTrackPlayerProgress } from "react-native-track-player";
import { Colors } from "../../assets/colors";

const { height, width } = Dimensions.get("window");
const SLIDER_WIDTH = width * 0.65;
const SLIDER_H = height * 0.005;

const PlayerSlider = () => {
  const progress = useTrackPlayerProgress(1000);
  const [progressValue, setProgressValue] = React.useState(0);

  const toSeekSong = async (pos) => {
    TrackPlayer.seekTo(pos).catch(() => null);
  };

  React.useEffect(() => {
    let clean = true;
    if (clean) {
      setProgressValue(parseInt(progress.position));
    }
    return () => {
      clean = false;
      setProgressValue(0);
    };
  }, [progress]);

  return (
    <>
      <Slider
        minimumValue={0}
        maximumValue={progress.duration != undefined ? progress.duration : 0}
        onSlidingComplete={(val) => {
          toSeekSong(val);
        }}
        minimumTrackTintColor={Colors.active_top_tab}
        maximumTrackTintColor="#ffffff"
        step={1}
        style={styles.slider}
        disabled={false}
        value={progressValue}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: SLIDER_WIDTH,
    height: SLIDER_H,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerSlider;
