import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { useTrackPlayerProgress } from "react-native-track-player";
import { seven, three } from "../../Config/Dimensions";

const { height, width } = Dimensions.get("window");
const PROGRESS_WIDTH = width * 0.65;
const PROGRESS_HEIGHT = height * 0.005;
const { interpolate } = Animated;

const Progress = () => {
  let { container, progress_Style, progress_Fill, font } = styles;
  const progress = useTrackPlayerProgress();

  const { position, duration } = progress;

  React.useEffect(() => {
    null;
  }, [progress]);

  const animated_width = interpolate(position, {
    inputRange: [0, position > duration ? duration - 0.5 : position, duration],
    outputRange: [
      0,
      position == 0 ? 0 : (position / duration) * PROGRESS_WIDTH,
      PROGRESS_WIDTH,
    ],
  });

  return (
    <View style={progress_Style}>
      <Animated.View style={[progress_Fill, { width: animated_width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progress_Style: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: three,
    backfaceVisibility: "hidden",
    overflow: "hidden",
    paddingHorizontal: seven,
  },
  progress_Fill: {
    height: PROGRESS_HEIGHT,
    backgroundColor: "#5488d1",
    position: "absolute",
  },
});

export default Progress;
